import { useEffect, useRef } from "react";

function NeuralBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    const host = canvas.parentElement;
    let animationFrame;
    let width = 0;
    let height = 0;
    let ratio = 1;
    let time = 0;
    let points = [];
    let last = performance.now();
    const pointer = { x: -1000, y: -1000, active: false };

    const random = (seed) => {
      const value = Math.sin(seed * 127.1 + 78.233) * 43758.5453;
      return value - Math.floor(value);
    };

    const createPoints = () => {
      const compact = width < 620;
      const total = compact ? 620 : 1200;
      const radiusX = Math.min(width * (compact ? 0.82 : 0.43), 520);
      const radiusY = Math.min(height * (compact ? 0.34 : 0.54), 420);

      points = Array.from({ length: total }, (_, index) => {
        const angle = index * 2.399963;
        const distance = Math.sqrt(random(index + 11));
        const hemisphere = index % 2 === 0 ? 1 : -1;
        const x = Math.cos(angle) * distance;
        const y = Math.sin(angle) * distance;
        const groove = Math.max(0, 1 - Math.abs(x) * 4.2) * 0.09;

        return {
          x: (x * 0.92 + hemisphere * groove) * radiusX,
          y: y * radiusY,
          depth: random(index + 47),
          glow: random(index + 89),
          phase: random(index + 131),
        };
      });
    };

    const resize = () => {
      const bounds = host.getBoundingClientRect();
      width = bounds.width;
      height = bounds.height;
      ratio = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = width * ratio;
      canvas.height = height * ratio;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
      createPoints();
    };

    const render = (now) => {
      animationFrame = requestAnimationFrame(render);
      time += Math.min(36, now - last) * 0.001;
      last = now;
      context.clearRect(0, 0, width, height);

      const centerX = width * 0.5;
      const centerY = height * 0.47;
      const pulse = 1 + Math.sin(time * 1.05) * 0.018;
      const projected = points.map((point) => {
        const depth = point.depth * 80;
        const scale = (0.94 + depth / 900) * pulse;
        let x = centerX + point.x * scale;
        let y = centerY + point.y * scale;
        const distance = Math.hypot(x - pointer.x, y - pointer.y);

        if (pointer.active && distance < 150) {
          const force = (1 - distance / 150) ** 2;
          x += ((x - pointer.x) / (distance || 1)) * force * 18;
          y += ((y - pointer.y) / (distance || 1)) * force * 18;
        }

        return { ...point, x, y, depth, scale };
      });

      context.globalCompositeOperation = "screen";
      const glow = context.createRadialGradient(centerX, centerY, 15, centerX, centerY, Math.min(width, height) * 0.55);
      glow.addColorStop(0, "rgba(188, 134, 66, 0.16)");
      glow.addColorStop(0.52, "rgba(82, 52, 33, 0.07)");
      glow.addColorStop(1, "rgba(8, 6, 5, 0)");
      context.fillStyle = glow;
      context.fillRect(0, 0, width, height);

      for (let index = 0; index < projected.length - 16; index += 16) {
        const first = projected[index];
        for (let next = index + 1; next < Math.min(index + 56, projected.length); next += 4) {
          const second = projected[next];
          const distance = (first.x - second.x) ** 2 + (first.y - second.y) ** 2;
          if (distance > 150 && distance < 1600 && Math.abs(first.depth - second.depth) < 40) {
            context.beginPath();
            context.strokeStyle = `rgba(232, 181, 106, ${0.1 * (1 - distance / 1600)})`;
            context.lineWidth = 0.55;
            context.moveTo(first.x, first.y);
            context.lineTo(second.x, second.y);
            context.stroke();
          }
        }
      }

      projected.forEach((point) => {
        const nearby = pointer.active ? Math.max(0, 1 - Math.hypot(point.x - pointer.x, point.y - pointer.y) / 155) : 0;
        const flicker = Math.max(0, Math.sin(time * 2.35 + point.phase * 30));
        const alpha = Math.min(0.72, 0.2 + point.depth * 0.4 + nearby * 0.45 + flicker * 0.07);
        const size = (point.glow > 0.9 ? 1.35 : 0.72) + nearby * 1.05;
        context.fillStyle = point.glow > 0.86
          ? `rgba(255, 220, 155, ${alpha})`
          : `rgba(194, 143, 82, ${alpha})`;
        context.beginPath();
        context.arc(point.x, point.y, size, 0, Math.PI * 2);
        context.fill();
      });

      context.globalCompositeOperation = "source-over";
    };

    const handlePointerMove = (event) => {
      const bounds = host.getBoundingClientRect();
      pointer.x = event.clientX - bounds.left;
      pointer.y = event.clientY - bounds.top;
      pointer.active = true;
    };

    const handlePointerLeave = () => {
      pointer.active = false;
    };

    resize();
    window.addEventListener("resize", resize, { passive: true });
    host.addEventListener("pointermove", handlePointerMove);
    host.addEventListener("pointerleave", handlePointerLeave);
    animationFrame = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrame);
      window.removeEventListener("resize", resize);
      host.removeEventListener("pointermove", handlePointerMove);
      host.removeEventListener("pointerleave", handlePointerLeave);
    };
  }, []);

  return <canvas ref={canvasRef} className="neural-background" aria-hidden="true" />;
}

export default NeuralBackground;
