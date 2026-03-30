import { forwardRef } from 'react';
import { useRef } from 'react';
import { useInView } from 'framer-motion';
import { works } from '../../../library';
import './style.css';
import { AnimatedSpan, Terminal, TypingAnimation } from '@/components/ui/terminal';

const Works = forwardRef<HTMLDivElement>((_props, ref) => {
  const terminalRef = useRef<HTMLDivElement>(null);
  const hasEnteredViewport = useInView(terminalRef, {
    once: true,
    amount: 0.45,
  });

  const highlights = Array.from(
    new Set(works.flatMap((work) => work.languages))
  ).slice(0, 8);

  return (
    <div ref={ref} className="works">
      <div className="terminal-single-wrap" ref={terminalRef}>
        {hasEnteredViewport ? (
          <Terminal className="work-terminal work-terminal-single !rounded-[0.95rem] !border-zinc-700 !bg-[#3a3a3c] [&>div:first-child]:!bg-black [&>div:first-child]:!border-zinc-700 [&>pre]:!bg-[#3a3a3c] [&>pre]:!text-zinc-100 overflow-hidden">
            <TypingAnimation className="text-emerald-300" duration={16} startOnView>
              {'$ sudo ./deploy_ml_stack.sh --env production'}
            </TypingAnimation>
            <AnimatedSpan className="pl-2 text-zinc-200">
              {'[ok] CUDA runtime online | [ok] Linux services healthy'}
            </AnimatedSpan>
            <AnimatedSpan className="pl-2 text-cyan-300">
              {'> Training robust models for real-world engineering systems'}
            </AnimatedSpan>
            <AnimatedSpan className="pl-2 text-violet-300">
              {'> Bash + Python + MLOps pipelines, built to ship not just demo'}
            </AnimatedSpan>
            <TypingAnimation className="pl-2 text-lime-300" duration={12}>
              {'$ python infer.py --model latest --device cuda --batch 64'}
            </TypingAnimation>
            <AnimatedSpan className="pl-2 text-sky-300">
              {'[result] latency: 12ms | throughput: 3.4k samples/s'}
            </AnimatedSpan>
            <AnimatedSpan className="pl-2 text-zinc-200">
              {`> Domains: ${highlights.join(' | ')}`}
            </AnimatedSpan>
            <AnimatedSpan className="pl-2 text-amber-300">
              {'> Telemetry stable | pipelines reproducible | systems green'}
            </AnimatedSpan>
            <AnimatedSpan className="pl-2 text-rose-300">
              {'> Kernel, models, and control loops tuned for production-grade reliability'}
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
