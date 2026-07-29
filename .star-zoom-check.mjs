import { createHash } from 'node:crypto'
import { writeFile } from 'node:fs/promises'
import path from 'node:path'

const outputDirectory = process.argv[2]
const targets = await fetch('http://127.0.0.1:9230/json').then((response) =>
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
  const resolve = pending.get(payload.id)

  if (resolve) {
    pending.delete(payload.id)
    resolve(payload)
  }
}

const send = (method, params = {}) =>
  new Promise((resolve) => {
    const id = ++nextId
    pending.set(id, resolve)
    socket.send(JSON.stringify({ id, method, params }))
  })

const setMetrics = (width, height, deviceScaleFactor) =>
  send('Emulation.setDeviceMetricsOverride', {
    width,
    height,
    deviceScaleFactor,
    screenWidth: 1920,
    screenHeight: 1080,
    mobile: false,
  })

const pauseAndHideContent = () =>
  send('Runtime.evaluate', {
    expression: `
      document.getAnimations().forEach((animation) => animation.pause());
      document.querySelector('[data-slot="stars-background"]')
        ?.nextElementSibling?.style.setProperty('visibility', 'hidden');
    `,
  })

const readMetrics = async () => {
  const response = await send('Runtime.evaluate', {
    expression: `
      JSON.stringify({
        innerWidth,
        innerHeight,
        outerWidth,
        devicePixelRatio,
        starFieldTransform: getComputedStyle(
          document.querySelector('[data-slot="star-field"]')
        ).transform,
        firstShadows: document.querySelector('[data-slot="star-layer"]')
          ?.firstElementChild?.style.boxShadow.split(', ').slice(0, 3)
      })
    `,
    returnByValue: true,
  })

  return JSON.parse(response.result.result.value)
}

const capture = async (name) => {
  const response = await send('Page.captureScreenshot', {
    format: 'png',
    fromSurface: true,
  })
  const image = Buffer.from(response.result.data, 'base64')
  await writeFile(path.join(outputDirectory, name), image)

  return {
    bytes: image.length,
    sha256: createHash('sha256').update(image).digest('hex'),
  }
}

await setMetrics(1920, 1080, 1)
await send('Page.reload', { ignoreCache: true })
await new Promise((resolve) => setTimeout(resolve, 2500))
await pauseAndHideContent()

const normalMetrics = await readMetrics()
const normalCapture = await capture('stars-100.png')

await setMetrics(3840, 2160, 0.5)
await new Promise((resolve) => setTimeout(resolve, 750))
await pauseAndHideContent()

const zoomedMetrics = await readMetrics()
const zoomedCapture = await capture('stars-50.png')

console.log(
  JSON.stringify(
    {
      normal: { metrics: normalMetrics, capture: normalCapture },
      zoomed: { metrics: zoomedMetrics, capture: zoomedCapture },
      sameSeededStars:
        JSON.stringify(normalMetrics.firstShadows) ===
        JSON.stringify(zoomedMetrics.firstShadows),
      identicalScreenshots: normalCapture.sha256 === zoomedCapture.sha256,
    },
    null,
    2,
  ),
)

socket.close()
