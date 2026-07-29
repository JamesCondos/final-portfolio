import { MorphingText } from '@/components/ui/morphing-text'
import { forwardRef } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import './style.css'

interface MotionBlockProps {
  className: string
  delay: number
  reduceMotion: boolean
  children?: React.ReactNode
}

const entranceEase = [0.16, 1, 0.3, 1] as const

const variants = {
  hidden: { x: 48, opacity: 0 },
  visible: ({
    delay,
    reduceMotion,
  }: Pick<MotionBlockProps, 'delay' | 'reduceMotion'>) => ({
    x: 0,
    opacity: 1,
    transition: reduceMotion
      ? { duration: 0 }
      : { delay, duration: 0.52, ease: entranceEase },
  }),
}

const MotionBlock = ({
  className,
  delay,
  reduceMotion,
  children,
}: MotionBlockProps) => (
  <motion.div
    initial={reduceMotion ? 'visible' : 'hidden'}
    animate="visible"
    variants={variants}
    className={className}
    custom={{ delay, reduceMotion }}
  >
    {children}
  </motion.div>
)

const Home = forwardRef<HTMLDivElement>((_props, ref) => {
  const reduceMotion = Boolean(useReducedMotion())

  return (
    <>
      <div ref={ref} className="wrapper">
        <motion.img
          className="home-portrait"
          src="/final-portfolio/me.jpg"
          alt="James Condos"
          width={1536}
          height={2048}
          decoding="async"
          fetchPriority="high"
          initial={reduceMotion ? { x: 0, opacity: 1 } : { x: 48, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={
            reduceMotion
              ? { duration: 0 }
              : { duration: 0.7, ease: entranceEase }
          }
        />

        <MotionBlock className="arrow" delay={0.12} reduceMotion={reduceMotion} />

        <div className="bundle">
          <MotionBlock className="chunck" delay={0.15} reduceMotion={reduceMotion}>
            <div className="three-line-primary-V1" />
            <div className="three-line-secondary-V1" />
            <div className="three-line-tertiary-V1" />
          </MotionBlock>

          <MotionBlock className="one-line-primary" delay={0.2} reduceMotion={reduceMotion} />
          <MotionBlock className="chunck" delay={0.25} reduceMotion={reduceMotion}>
            <div className="four-line-primary-V1" />
            <div className="four-line-secondary-V1" />
            <div className="four-line-tertiary-V1" />
            <div className="four-line-prevention-V1" />
          </MotionBlock>

          <MotionBlock className="chunck" delay={0.3} reduceMotion={reduceMotion}>
            <div className="four-line-primary-V2" />
            <div className="four-line-secondary-V2" />
            <div className="four-line-tertiary-V2" />
            <div className="four-line-prevention-V2" />
          </MotionBlock>
          <MotionBlock className="distance-left-chunck" delay={0.35} reduceMotion={reduceMotion}>
            <div className="four-line-primary-V3" />
            <div className="four-line-secondary-V3" />
            <div className="four-line-tertiary-V3" />
            <div className="four-line-prevention-V3" />
          </MotionBlock>
          <MotionBlock className="name" delay={0.42} reduceMotion={reduceMotion}>
            <h1 className="title">James Condos</h1>
            <div className="subtitle">
              <MorphingText
                texts={[
                  'Electrical Engineer',
                  'Physicist',
                  'Machine Learning Enthusiast',
                  'Lego Enjoyer',
                  'Hardware Engineering'
                ]}
                className="hero-morphing-text !mx-0 !h-[1.15em] !w-full !max-w-full !text-left !font-[inherit] !leading-[1.1] !text-[clamp(0.9rem,2.5vw,3rem)]"
              />
            </div>
          </MotionBlock>
          <MotionBlock className="chunck" delay={0.46} reduceMotion={reduceMotion}>
            <div className="two-line-primary-V1" />
            <div className="two-line-secondary-V1" />
          </MotionBlock>
          <MotionBlock className="chunck" delay={0.5} reduceMotion={reduceMotion}>
            <div className="three-line-primary-V2" />
            <div className="three-line-secondary-V2" />
            <div className="three-line-tertiary-V2" />
          </MotionBlock>
          <MotionBlock className="chunck" delay={0.54} reduceMotion={reduceMotion}>
            <div className="two-line-primary-V2" />
            <div className="two-line-secondary-V2" />
          </MotionBlock>
          <MotionBlock className="one-line-secondary" delay={0.56} reduceMotion={reduceMotion} />
          <MotionBlock className="chunck" delay={0.58} reduceMotion={reduceMotion}>
            <div className="four-line-primary-V4" />
            <div className="four-line-secondary-V4" />
            <div className="four-line-tertiary-V4" />
            <div className="four-line-prevention-V4" />
          </MotionBlock>
        </div>
      </div>
    </>
  )
})

Home.displayName = 'Home'

export { Home }
