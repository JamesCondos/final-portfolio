import { useEffect, useState } from "react"
import { AnimatePresence, motion, useReducedMotion } from "framer-motion"

import { cn } from "@/lib/utils"

const cycleTime = 2600

interface MorphingTextProps {
  className?: string
  texts: string[]
}

const Texts: React.FC<Pick<MorphingTextProps, "texts">> = ({ texts }) => {
  const [textIndex, setTextIndex] = useState(0)
  const reduceMotion = Boolean(useReducedMotion())
  const activeText = texts[textIndex % texts.length] ?? ""

  useEffect(() => {
    if (texts.length <= 1 || reduceMotion) return

    const intervalId = window.setInterval(() => {
      setTextIndex((currentIndex) => (currentIndex + 1) % texts.length)
    }, cycleTime)

    return () => window.clearInterval(intervalId)
  }, [reduceMotion, texts.length])

  if (reduceMotion) {
    return (
      <span className="absolute inset-x-0 top-0 m-auto inline-block w-full">
        {activeText}
      </span>
    )
  }

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.span
        key={`${activeText}-${textIndex}`}
        className="absolute inset-x-0 top-0 m-auto inline-block w-full"
        initial={{ opacity: 0, y: "0.18em" }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: "-0.18em" }}
        transition={{ duration: 0.42, ease: "easeOut" }}
      >
        {activeText}
      </motion.span>
    </AnimatePresence>
  )
}

export const MorphingText: React.FC<MorphingTextProps> = ({
  texts,
  className,
}) => (
  <div
    className={cn(
      "relative mx-auto h-16 w-full max-w-3xl text-center font-sans text-[40pt] leading-none font-bold md:h-24 lg:text-[6rem]",
      className
    )}
  >
    <Texts texts={texts} />
  </div>
)
