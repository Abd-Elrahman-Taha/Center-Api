/**
 * InteractiveHeroVisual
 * High-performance 3D canvas graphic for the dashboard hero banner.
 * Renders a rotating champagne-gold & ivory geometric crystal at 60 FPS.
 */

import { useEffect, useRef } from "react";

export default function InteractiveHeroVisual() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    const width = (canvas.width = 180);
    const height = (canvas.height = 180);

    // 3D Nodes for a rotating geometric crystal
    const nodes: [number, number, number][] = [
      [0, -52, 0],
      [44, 0, 0],
      [0, 0, 44],
      [-44, 0, 0],
      [0, 0, -44],
      [0, 52, 0],
    ];

    const edges: [number, number][] = [
      [0, 1],
      [0, 2],
      [0, 3],
      [0, 4],
      [5, 1],
      [5, 2],
      [5, 3],
      [5, 4],
      [1, 2],
      [2, 3],
      [3, 4],
      [4, 1],
    ];

    let angleX = 0.2;
    let angleY = 0;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      angleX += 0.006;
      angleY += 0.01;

      const projected = nodes.map(([x, y, z]) => {
        const cosY = Math.cos(angleY);
        const sinY = Math.sin(angleY);
        const x1 = x * cosY + z * sinY;
        const z1 = -x * sinY + z * cosY;

        const cosX = Math.cos(angleX);
        const sinX = Math.sin(angleX);
        const y2 = y * cosX - z1 * sinX;
        const z2 = y * sinX + z1 * cosX;

        const fov = 160;
        const scale = fov / (fov + z2 + 100);
        return {
          x: width / 2 + x1 * scale,
          y: height / 2 + y2 * scale,
          scale,
        };
      });

      // Subtle ambient golden aura
      const aura = ctx.createRadialGradient(
        width / 2,
        height / 2,
        6,
        width / 2,
        height / 2,
        68
      );
      aura.addColorStop(0, "rgba(212, 175, 55, 0.22)");
      aura.addColorStop(1, "rgba(212, 175, 55, 0)");
      ctx.fillStyle = aura;
      ctx.fillRect(0, 0, width, height);

      // Draw gilded edges
      ctx.lineWidth = 1.6;
      edges.forEach(([i, j]) => {
        const p1 = projected[i];
        const p2 = projected[j];
        const grad = ctx.createLinearGradient(p1.x, p1.y, p2.x, p2.y);
        grad.addColorStop(0, "rgba(243, 220, 146, 0.92)");
        grad.addColorStop(1, "rgba(212, 175, 55, 0.35)");
        ctx.strokeStyle = grad;
        ctx.beginPath();
        ctx.moveTo(p1.x, p1.y);
        ctx.lineTo(p2.x, p2.y);
        ctx.stroke();
      });

      // Draw luminous vertices
      projected.forEach((p) => {
        ctx.fillStyle = "#fff8e1";
        ctx.beginPath();
        ctx.arc(p.x, p.y, 2.8 * p.scale, 0, Math.PI * 2);
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="flex items-center justify-center w-28 h-28 rounded-2xl bg-[#0b0d15]/80 border border-[#d4af37]/30 shadow-[0_12px_36px_rgba(0,0,0,0.45),inset_0_1px_0_rgba(255,255,255,0.08)]">
      <canvas ref={canvasRef} width={180} height={180} className="w-24 h-24" />
    </div>
  );
}
