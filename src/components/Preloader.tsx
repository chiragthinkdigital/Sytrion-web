"use client";

import { usePathname } from "next/navigation";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";

const FILM_SRC = "/Sytrion-brand-film.mp4";
const FADE_MS = 700;
const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";

function subscribeReducedMotion(callback: () => void) {
  const media = window.matchMedia(REDUCED_MOTION_QUERY);
  media.addEventListener("change", callback);
  return () => media.removeEventListener("change", callback);
}

const getReducedMotion = () => window.matchMedia(REDUCED_MOTION_QUERY).matches;
const getReducedMotionServer = () => false;

export default function Preloader() {
  const pathname = usePathname();

  if (pathname !== "/") return null;

  return <HomeFilm />;
}

function HomeFilm() {
  const reducedMotion = useSyncExternalStore(
    subscribeReducedMotion,
    getReducedMotion,
    getReducedMotionServer
  );
  const [active, setActive] = useState(true);
  const [closing, setClosing] = useState(false);
  const [ready, setReady] = useState(false);
  const [soundOn, setSoundOn] = useState(true);
  const [needsSound, setNeedsSound] = useState(false);

  const videoRef = useRef<HTMLVideoElement>(null);
  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const dismiss = useCallback(() => {
    if (closeTimerRef.current) return;
    setClosing(true);
    closeTimerRef.current = setTimeout(() => setActive(false), FADE_MS);
  }, []);

  useEffect(() => {
    return () => {
      if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
    };
  }, []);

  useEffect(() => {
    if (reducedMotion) return;

    const video = videoRef.current;
    if (!video) return;

    let cancelled = false;

    const start = async () => {
      video.muted = false;
      try {
        await video.play();
        if (cancelled) return;
        setSoundOn(true);
        setNeedsSound(false);
      } catch {
        if (cancelled) return;
        video.muted = true;
        setSoundOn(false);
        setNeedsSound(true);
        try {
          await video.play();
        } catch {
          /* Autoplay is fully blocked — the skip control handles it. */
        }
      }
    };

    start();

    return () => {
      cancelled = true;
    };
  }, [reducedMotion]);

  useEffect(() => {
    if (!active || reducedMotion) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [active, reducedMotion]);

  useEffect(() => {
    if (!active || reducedMotion) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") dismiss();
    };

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [active, reducedMotion, dismiss]);

  const enableSound = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;
    const restart = needsSound;
    video.muted = false;
    setSoundOn(true);
    setNeedsSound(false);
    if (restart) {
      try {
        video.currentTime = 0;
      } catch {
        /* Seeking can fail before metadata is ready. */
      }
    }
    void video.play().catch(() => {
      video.muted = true;
      setSoundOn(false);
      setNeedsSound(true);
    });
  }, [needsSound]);

  const toggleSound = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;
    const next = video.muted;
    video.muted = !next;
    setSoundOn(next);
    setNeedsSound(false);
  }, []);

  if (!active || reducedMotion) return null;

  return (
    <div
      className={`sy-preloader${closing ? " sy-preloader--closing" : ""}`}
      role="dialog"
      aria-modal="true"
      aria-label="Sytrion brand film"
      onClick={needsSound ? enableSound : undefined}
    >
      <style>{`
        .sy-preloader {
          position: fixed;
          inset: 0;
          z-index: 9999;
          background: #07090b;
          color: #ffffff;
          opacity: 1;
          transition: opacity ${FADE_MS}ms cubic-bezier(0.4, 0, 0.2, 1);
        }
        .sy-preloader--closing {
          opacity: 0;
          pointer-events: none;
        }
        .sy-preloader-video {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          background: #07090b;
          opacity: 0;
          transition: opacity 900ms ease;
        }
        .sy-preloader-video.is-ready {
          opacity: 1;
        }
        .sy-preloader-controls {
          position: absolute;
          top: clamp(16px, 3vw, 32px);
          right: clamp(16px, 3vw, 32px);
          z-index: 2;
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .sy-preloader-btn {
          display: inline-flex;
          align-items: center;
          gap: 9px;
          background: rgba(8, 10, 12, 0.78);
          border: 1px solid rgba(255, 255, 255, 0.22);
          color: #ffffff;
          padding: 10px 16px;
          border-radius: 999px;
          font-family: var(--font-geist-sans), Arial, sans-serif;
          font-size: 12px;
          font-weight: 600;
          letter-spacing: 0.04em;
          cursor: pointer;
          backdrop-filter: blur(12px);
          box-shadow: 0 6px 20px rgba(0, 0, 0, 0.28);
          transition: background 0.25s ease, border-color 0.25s ease;
        }
        .sy-preloader-btn:hover {
          background: rgba(8, 10, 12, 0.92);
          border-color: rgba(255, 255, 255, 0.38);
        }
        .sy-preloader-btn--sound {
          color: #c6e84a;
          border-color: rgba(198, 232, 74, 0.55);
          background: rgba(8, 10, 12, 0.78);
        }
        .sy-preloader-btn--sound:hover {
          background: rgba(8, 10, 12, 0.92);
          border-color: rgba(198, 232, 74, 0.75);
        }
        @media (max-width: 640px) {
          .sy-preloader-btn {
            padding: 9px 13px;
            font-size: 11px;
          }
        }
        @media (prefers-reduced-motion: reduce) {
          .sy-preloader {
            display: none !important;
          }
        }
      `}</style>

      <video
        ref={videoRef}
        className={`sy-preloader-video${ready ? " is-ready" : ""}`}
        src={FILM_SRC}
        preload="auto"
        playsInline
        tabIndex={-1}
        disablePictureInPicture
        onLoadedData={() => setReady(true)}
        onEnded={dismiss}
        onError={() => {
          setTimeout(dismiss, 1200);
        }}
      />

      <div className="sy-preloader-controls">
        {needsSound ? (
          <button
            type="button"
            className="sy-preloader-btn sy-preloader-btn--sound"
            onClick={(event) => {
              event.stopPropagation();
              enableSound();
            }}
          >
            <SpeakerIcon muted={false} />
            <span>Play with sound</span>
          </button>
        ) : (
          <button
            type="button"
            className="sy-preloader-btn"
            onClick={(event) => {
              event.stopPropagation();
              toggleSound();
            }}
            aria-label={soundOn ? "Mute brand film" : "Unmute brand film"}
          >
            <SpeakerIcon muted={!soundOn} />
            <span>{soundOn ? "Sound on" : "Sound off"}</span>
          </button>
        )}

        <button
          type="button"
          className="sy-preloader-btn"
          onClick={(event) => {
            event.stopPropagation();
            dismiss();
          }}
        >
          <span>Skip</span>
          <svg
            width="13"
            height="13"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M5 12h14" />
            <path d="m13 6 6 6-6 6" />
          </svg>
        </button>
      </div>
    </div>
  );
}

function SpeakerIcon({ muted }: { muted: boolean }) {
  return (
    <svg
      width="15"
      height="15"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M11 5 6 9H2v6h4l5 4V5Z" />
      {muted ? (
        <>
          <line x1="22" y1="9" x2="16" y2="15" />
          <line x1="16" y1="9" x2="22" y2="15" />
        </>
      ) : (
        <>
          <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
          <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
        </>
      )}
    </svg>
  );
}
