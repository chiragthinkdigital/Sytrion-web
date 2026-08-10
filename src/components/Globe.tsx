"use client";

import createGlobe, { COBEOptions } from "cobe";
import { useEffect, useRef } from "react";

const GLOBE_CONFIG: COBEOptions = {
  width: 500,
  height: 500,
  devicePixelRatio: 2,
  phi: 0,
  theta: 0.3,
  dark: 0,
  diffuse: 0.6,
  mapSamples: 16000,
  mapBrightness: 1.2,
  mapBaseBrightness: 0.05,
  baseColor: [0.95, 0.95, 0.93],
  markerColor: [198 / 255, 232 / 255, 74 / 255],
  glowColor: [0.95, 0.95, 0.93],
  markers: [
    { location: [14.5995, 120.9842], size: 0.03 },
    { location: [19.076, 72.8777], size: 0.1 },
    { location: [23.8103, 90.4125], size: 0.05 },
    { location: [30.0444, 31.2357], size: 0.07 },
    { location: [39.9042, 116.4074], size: 0.08 },
    { location: [-23.5505, -46.6333], size: 0.1 },
    { location: [19.4326, -99.1332], size: 0.1 },
    { location: [40.7128, -74.006], size: 0.1 },
    { location: [34.6937, 135.5022], size: 0.05 },
    { location: [41.0082, 28.9784], size: 0.06 },
  ],
};

interface GlobeProps {
  focusTarget?: { lat: number; lng: number } | null;
  markers?: Array<{ location: [number, number]; size: number }>;
  baseColor?: [number, number, number];
  markerColor?: [number, number, number];
  maxSize?: number;
}

export function Globe({ focusTarget, markers, baseColor, markerColor, maxSize = 480 }: GlobeProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const phiRef = useRef(0);
  const thetaRef = useRef(GLOBE_CONFIG.theta);
  const targetPhiRef = useRef<number | null>(null);
  const targetThetaRef = useRef<number | null>(null);
  const globeRef = useRef<ReturnType<typeof createGlobe> | null>(null);

  useEffect(() => {
    if (focusTarget) {
      targetPhiRef.current = Math.PI - ((focusTarget.lng * Math.PI) / 180 - Math.PI / 2);
      targetThetaRef.current = (focusTarget.lat * Math.PI) / 180;
    } else {
      targetPhiRef.current = null;
      targetThetaRef.current = null;
    }
  }, [focusTarget]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const container = canvas.parentElement;
    if (!container) return;

    const s = Math.min(container.clientWidth, maxSize) || maxSize;
    const dpr = window.devicePixelRatio || 2;
    const px = Math.round(s * dpr);

    canvas.width = px;
    canvas.height = px;
    canvas.style.width = s + "px";
    canvas.style.height = s + "px";

    phiRef.current = 0;
    thetaRef.current = GLOBE_CONFIG.theta;

    const globe = createGlobe(canvas, {
      ...GLOBE_CONFIG,
      width: px,
      height: px,
      devicePixelRatio: dpr,
      baseColor: baseColor || GLOBE_CONFIG.baseColor,
      markerColor: markerColor || GLOBE_CONFIG.markerColor,
      markers: markers || GLOBE_CONFIG.markers,
    });

    globeRef.current = globe;

    let running = true;

    const animate = () => {
      if (!running) return;

      let phi = phiRef.current;
      let theta = thetaRef.current;

      if (targetPhiRef.current !== null) {
        let diff = targetPhiRef.current - phi;
        diff = ((diff % (2 * Math.PI)) + 3 * Math.PI) % (2 * Math.PI) - Math.PI;
        phi += diff * 0.04;
      } else {
        phi += 0.005;
      }

      if (targetThetaRef.current !== null) {
        const diff = targetThetaRef.current - theta;
        theta += diff * 0.04;
      } else {
        const diff = GLOBE_CONFIG.theta - theta;
        theta += diff * 0.04;
      }

      phiRef.current = phi;
      thetaRef.current = theta;

      globe.update({
        phi,
        theta,
        width: px,
        height: px,
      });

      requestAnimationFrame(animate);
    };

    requestAnimationFrame(animate);

    canvas.style.opacity = "1";

    return () => {
      running = false;
      globe.destroy();
      globeRef.current = null;
    };
  }, [markers, baseColor, markerColor, maxSize]);

  return (
    <div
      style={{
        lineHeight: 0,
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <canvas
        ref={canvasRef}
        style={{
          opacity: 0,
          transition: "opacity 0.5s",
        }}
      />
    </div>
  );
}
