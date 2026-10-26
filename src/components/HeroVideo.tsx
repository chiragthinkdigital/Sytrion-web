"use client";

import { useEffect, useRef } from "react";
import {
  isPreloaderComplete,
  subscribePreloader,
} from "@/lib/preloaderState";

export default function HeroVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    let cancelled = false;

    const play = () => {
      if (cancelled) return;
      void video.play().catch(() => {
        /* The hero video is muted, so autoplay should be allowed. */
      });
    };

    const start = () => {
      if (video.readyState >= 2) {
        play();
      } else {
        video.addEventListener("canplay", play, { once: true });
      }
    };

    if (isPreloaderComplete() || !document.querySelector(".sy-preloader")) {
      start();
      return () => {
        cancelled = true;
        video.removeEventListener("canplay", play);
      };
    }

    const unsubscribe = subscribePreloader(() => {
      if (isPreloaderComplete()) start();
    });

    return () => {
      cancelled = true;
      video.removeEventListener("canplay", play);
      unsubscribe();
    };
  }, []);

  return (
    <video
      ref={videoRef}
      className="absolute inset-0 w-full h-full object-cover"
      src="/home/hero1.mp4"
      muted
      loop
      playsInline
      preload="auto"
    />
  );
}
