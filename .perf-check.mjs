import { writeFile } from 'node:fs/promises'

const targets = await fetch('http://127.0.0.1:9231/json').then((response) =>
  response.json(),
)
const target = targets.find((candidate) => candidate.type === 'page')
const socket = new WebSocket(target.webSocketDebuggerUrl)

await new Promise((resolve, reject) => {
  socket.onopen = resolve
  socket.onerror = reject
})

let nextId = 0
const pending = new Map()

socket.onmessage = (event) => {
  const payload = JSON.parse(event.data)
  const callback = pending.get(payload.id)

  if (callback) {
    pending.delete(payload.id)
    callback(payload)
  }
}

const send = (method, params = {}) =>
  new Promise((resolve) => {
    const id = ++nextId
    pending.set(id, resolve)
    socket.send(JSON.stringify({ id, method, params }))
  })

const evaluate = async (expression) => {
  const response = await send('Runtime.evaluate', {
    expression,
    returnByValue: true,
  })

  return response.result.result.value
}

await Promise.all([
  send('Page.enable'),
  send('Runtime.enable'),
  send('Performance.enable'),
])
await send('Emulation.setDeviceMetricsOverride', {
  width: 1440,
  height: 1000,
  deviceScaleFactor: 1,
  screenWidth: 1440,
  screenHeight: 1000,
  mobile: false,
})
await send('Page.addScriptToEvaluateOnNewDocument', {
  source: `
    window.__openingLongTasks = [];
    new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        window.__openingLongTasks.push({
          start: Math.round(entry.startTime),
          duration: Math.round(entry.duration)
        });
      }
    }).observe({ type: 'longtask', buffered: true });
  `,
})
await send('Page.navigate', {
  url: 'http://127.0.0.1:4173/final-portfolio/',
})
await new Promise((resolve) => setTimeout(resolve, 2600))

const openingState = JSON.parse(
  await evaluate(`
    JSON.stringify({
      fluidCanvasMounted: Boolean(document.querySelector('#fluid')),
      activeAnimations: document.getAnimations()
        .filter((animation) => animation.playState === 'running').length,
      heroRows: [...document.querySelectorAll('.bundle > *')].map((element) => ({
        opacity: getComputedStyle(element).opacity,
        transform: getComputedStyle(element).transform
      })),
      longTasks: window.__openingLongTasks ?? [],
      resources: performance.getEntriesByType('resource')
        .map((entry) => entry.name)
        .filter((name) => name.includes('/assets/Fluid-'))
    })
  `),
)

const screenshot = await send('Page.captureScreenshot', {
  format: 'png',
  fromSurface: true,
})
await writeFile(
  '.perf-home-cdp.png',
  Buffer.from(screenshot.result.data, 'base64'),
)

await send('Input.dispatchMouseEvent', {
  type: 'mouseMoved',
  x: 720,
  y: 500,
})
await new Promise((resolve) => setTimeout(resolve, 1200))

const interactiveState = JSON.parse(
  await evaluate(`
    JSON.stringify({
      fluidCanvasMounted: Boolean(document.querySelector('#fluid')),
      canvasSize: (() => {
        const canvas = document.querySelector('#fluid');
        return canvas ? [canvas.width, canvas.height] : null;
      })(),
      contextType: (() => {
        const canvas = document.querySelector('#fluid');
        if (!canvas) return null;
        return canvas.getContext('webgl2') ? 'webgl2' : 'webgl';
      })()
    })
  `),
)

const performanceMetrics = await send('Performance.getMetrics')
const selectedMetrics = Object.fromEntries(
  performanceMetrics.result.metrics
    .filter(({ name }) =>
      ['TaskDuration', 'ScriptDuration', 'LayoutCount', 'RecalcStyleCount'].includes(
        name,
      ),
    )
    .map(({ name, value }) => [name, value]),
)

console.log(
  JSON.stringify(
    { openingState, interactiveState, performanceMetrics: selectedMetrics },
    null,
    2,
  ),
)

socket.close()
