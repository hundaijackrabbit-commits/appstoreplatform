"use client";

import { DotLottieReact } from "@lottiefiles/dotlottie-react";

type LottiePlayerProps = {
  src: string;
  className?: string;
};

export default function LottiePlayer({ src, className = "h-64 w-full" }: LottiePlayerProps) {
  return (
    <div className={className} aria-hidden="true">
      <DotLottieReact
        src={src}
        loop
        autoplay
        style={{ width: "100%", height: "100%", background: "transparent" }}
      />
    </div>
  );
}
