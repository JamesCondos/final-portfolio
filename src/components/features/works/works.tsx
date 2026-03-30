import { forwardRef, useEffect, useRef, useState } from 'react';
import { useInView } from 'framer-motion';
import { works } from '../../../library';
import './style.css';
import { AnimatedSpan, Terminal, TypingAnimation } from '@/components/ui/terminal';

const Works = forwardRef<HTMLDivElement>((_props, ref) => {
  const terminalRef = useRef<HTMLDivElement>(null);
  const [terminalLoopKey, setTerminalLoopKey] = useState(0);
  const hasEnteredViewport = useInView(terminalRef, {
    once: true,
    amount: 0.45,
  });

  useEffect(() => {
    if (!hasEnteredViewport) return;

    const intervalId = window.setInterval(() => {
      setTerminalLoopKey((prev) => prev + 1);
    }, 12000);

    return () => window.clearInterval(intervalId);
  }, [hasEnteredViewport]);

  const highlights = Array.from(
    new Set(works.flatMap((work) => work.languages))
  ).slice(0, 8);

  return (
    <div ref={ref} className="works">
      <div className="terminal-single-wrap" ref={terminalRef}>
        {hasEnteredViewport ? (
          <Terminal
            key={terminalLoopKey}
            className="work-terminal work-terminal-single !rounded-[0.95rem] !border-zinc-700 !bg-[#3a3a3c] [&>div:first-child]:!bg-black [&>div:first-child]:!border-zinc-700 [&>pre]:!bg-[#3a3a3c] [&>pre]:!text-zinc-100 overflow-hidden"
          >
            <TypingAnimation className="text-zinc-100" duration={14} startOnView>
              {'$ uname -a'}
            </TypingAnimation>
            <AnimatedSpan className="pl-2 text-zinc-300">
              {'Linux ml-node 6.8.0-generic x86_64 GNU/Linux'}
            </AnimatedSpan>

            <TypingAnimation className="text-zinc-100" duration={12}>
              {'$ systemctl --failed --no-pager'}
            </TypingAnimation>
            <AnimatedSpan className="pl-2 text-red-300">
              {'[error] model-sync.service failed (code=1)'}
            </AnimatedSpan>
            <TypingAnimation className="text-zinc-100" duration={10}>
              {'$ sudo systemctl restart model-sync.service'}
            </TypingAnimation>
            <AnimatedSpan className="pl-2 text-emerald-300">
              {'[ok] model-sync.service active (running)'}
            </AnimatedSpan>

            <TypingAnimation className="text-zinc-100" duration={10}>
              {'$ python infer.py --device cuda --batch 64 --warmup'}
            </TypingAnimation>
            <AnimatedSpan className="pl-2 text-zinc-300">
              {'latency=11.8ms  throughput=3.4k samples/s  gpu_mem=4.2GB'}
            </AnimatedSpan>
            <AnimatedSpan className="pl-2 text-amber-300">
              {'[warn] one shard skipped checksum; auto-repair scheduled'}
            </AnimatedSpan>
            <AnimatedSpan className="pl-2 text-emerald-300">
              {'[ok] pipeline healthy | telemetry stable | checkpoints synced'}
            </AnimatedSpan>
            <AnimatedSpan className="pl-2 text-zinc-300">
              {`stack: ${highlights.join(' | ')}`}
            </AnimatedSpan>
          </Terminal>
        ) : (
          <div className="work-terminal-placeholder" aria-hidden="true" />
        )}
      </div>
    </div>
  );
});

Works.displayName = 'Works';

export { Works };
