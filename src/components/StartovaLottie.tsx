'use client';

import { DotLottieReact } from '@lottiefiles/dotlottie-react';

type StartovaLottieProps = {
  src: string;
  className?: string;
  loop?: boolean;
  autoplay?: boolean;
  speed?: number;
};

export default function StartovaLottie({
  src,
  className = '',
  loop = true,
  autoplay = true,
  speed = 1,
}: StartovaLottieProps) {
  return (
    <div className={`pointer-events-none select-none ${className}`} aria-hidden="true">
      <DotLottieReact src={src} loop={loop} autoplay={autoplay} speed={speed} />
    </div>
  );
}
