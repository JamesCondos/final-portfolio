'use client';

import * as React from 'react';
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  type Transition,
} from 'framer-motion';

import { cn } from '@/lib/utils';

type StarLayerProps = React.ComponentProps<'div'> & {
  count: number;
  size: number;
  seed?: number;
  transition: Transition;
  starColor: string;
  reduceMotion?: boolean;
};

function createSeededRandom(seed: number) {
  let state = seed >>> 0;

  return () => {
    state += 0x6d2b79f5;
    let value = state;
    value = Math.imul(value ^ (value >>> 15), value | 1);
    value ^= value + Math.imul(value ^ (value >>> 7), value | 61);

    return ((value ^ (value >>> 14)) >>> 0) / 4294967296;
  };
}

function generateStars(count: number, starColor: string, seed: number) {
  const random = createSeededRandom(seed);
  const shadows: string[] = [];

  for (let i = 0; i < count; i++) {
    const x = Math.floor(random() * 4000) - 2000;
    const y = Math.floor(random() * 4000) - 2000;
    shadows.push(`${x}px ${y}px ${starColor}`);
  }

  return shadows.join(', ');
}

function StarLayer({
  count = 1000,
  size = 1,
  seed,
  transition = { repeat: Infinity, duration: 50, ease: 'linear' },
  starColor = '#fff',
  reduceMotion = false,
  className,
  style,
  ...props
}: StarLayerProps) {
  const layerSeed = seed ?? size * 1009;
  const transitionDuration = (transition as { duration?: unknown }).duration;
  const duration =
    typeof transitionDuration === 'number' ? transitionDuration : 50;
  const boxShadow = React.useMemo(
    () => generateStars(count, starColor, layerSeed),
    [count, starColor, layerSeed],
  );

  return (
    <div
      data-slot="star-layer"
      className={cn(
        'star-layer-drift absolute top-0 left-0 w-full h-[2000px]',
        className,
      )}
      style={{
        animationDuration: `${duration}s`,
        animationPlayState: reduceMotion ? 'paused' : 'running',
        ...style,
      }}
      {...props}
    >
      <div
        className="absolute left-1/2 bg-transparent rounded-full"
        style={{
          width: `${size}px`,
          height: `${size}px`,
          boxShadow: boxShadow,
        }}
      />
      <div
        className="absolute left-1/2 bg-transparent rounded-full top-[2000px]"
        style={{
          width: `${size}px`,
          height: `${size}px`,
          boxShadow: boxShadow,
        }}
      />
    </div>
  );
}

type StarsBackgroundProps = React.ComponentProps<'div'> & {
  factor?: number;
  density?: number;
  mobileDensity?: number;
  speed?: number;
  transition?: Parameters<typeof useSpring>[1];
  starColor?: string;
  pointerEvents?: boolean;
};

function StarsBackground({
  children,
  className,
  factor = 0.05,
  density = 1,
  mobileDensity,
  speed = 50,
  transition = { stiffness: 50, damping: 20 },
  starColor = '#fff',
  pointerEvents = true,
  ...props
}: StarsBackgroundProps) {
  const reduceMotion = Boolean(useReducedMotion());
  const initialDevicePixelRatio = React.useRef(
    typeof window === 'undefined' ? 1 : window.devicePixelRatio || 1,
  );
  const [isMobileViewport, setIsMobileViewport] = React.useState(() => {
    if (typeof window === 'undefined') return false;

    const frameWidth =
      window.outerWidth || window.screen.width || window.innerWidth;
    return frameWidth <= 768;
  });
  const [zoomCompensation, setZoomCompensation] = React.useState(1);
  const offsetX = useMotionValue(0);
  const offsetY = useMotionValue(0);

  const springX = useSpring(offsetX, transition);
  const springY = useSpring(offsetY, transition);
  const resolvedDensity =
    isMobileViewport && mobileDensity !== undefined ? mobileDensity : density;
  const starDensity = Math.max(0, resolvedDensity);

  React.useEffect(() => {
    const syncViewport = () => {
      const frameWidth =
        window.outerWidth || window.screen.width || window.innerWidth;
      const currentDevicePixelRatio = window.devicePixelRatio || 1;
      const nextZoomCompensation = Math.min(
        4,
        Math.max(
          0.25,
          initialDevicePixelRatio.current / currentDevicePixelRatio,
        ),
      );

      setIsMobileViewport(frameWidth <= 768);
      setZoomCompensation(nextZoomCompensation);
    };

    syncViewport();
    window.addEventListener('resize', syncViewport);
    window.visualViewport?.addEventListener('resize', syncViewport);

    return () => {
      window.removeEventListener('resize', syncViewport);
      window.visualViewport?.removeEventListener('resize', syncViewport);
    };
  }, []);

  const handleMouseMove = React.useCallback(
    (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;
      const newOffsetX = -(e.clientX - centerX) * factor;
      const newOffsetY = -(e.clientY - centerY) * factor;
      offsetX.set(newOffsetX);
      offsetY.set(newOffsetY);
    },
    [offsetX, offsetY, factor],
  );

  const starField = (
    <div
      data-slot="star-field"
      className="absolute inset-0"
      style={{
        transform: `scale(${zoomCompensation})`,
        transformOrigin: 'top center',
      }}
    >
      <StarLayer
        count={Math.round(260 * starDensity)}
        size={1}
        transition={{ repeat: Infinity, duration: speed, ease: 'linear' }}
        starColor={starColor}
        reduceMotion={reduceMotion}
      />
      <StarLayer
        count={Math.round(90 * starDensity)}
        size={2}
        transition={{
          repeat: Infinity,
          duration: speed * 2,
          ease: 'linear',
        }}
        starColor={starColor}
        reduceMotion={reduceMotion}
      />
      <StarLayer
        count={Math.round(35 * starDensity)}
        size={3}
        transition={{
          repeat: Infinity,
          duration: speed * 3,
          ease: 'linear',
        }}
        starColor={starColor}
        reduceMotion={reduceMotion}
      />
    </div>
  );

  return (
    <div
      data-slot="stars-background"
      className={cn(
        'relative size-full overflow-hidden bg-[radial-gradient(ellipse_at_bottom,_#262626_0%,_#000_100%)]',
        { 'pointer-events-none': !pointerEvents },
        className,
      )}
      onMouseMove={pointerEvents ? handleMouseMove : undefined}
      {...props}
    >
      {pointerEvents ? (
        <motion.div
          style={{ x: springX, y: springY }}
          className="absolute inset-0"
        >
          {starField}
        </motion.div>
      ) : (
        <div className="pointer-events-none absolute inset-0">{starField}</div>
      )}
      {children}
    </div>
  );
}

export {
  StarLayer,
  StarsBackground,
  type StarLayerProps,
  type StarsBackgroundProps,
};
