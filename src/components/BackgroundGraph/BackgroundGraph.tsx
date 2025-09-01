import { useEffect, useRef } from "react";
import type { BackgroundGraphProps } from "../../../Type/Type";

export default function BackgroundGraph({ className = "absolute inset-0 -z-10 w-full h-full", color = "#0000cc", lineWidth = 3, speed = 12, stepX = 6, jitterX = 8, jitterY = 3, amplitude = 80,}: BackgroundGraphProps) {

    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const ctxRef = useRef<CanvasRenderingContext2D | null>(null);
    const ptsRef = useRef<{ x: number; y: number }[]>([]);
    const rafRef = useRef<number | null>(null);
    const lastTsRef = useRef<number | null>(null);

    // helper
    const clamp = (v: number, min: number, max: number) => Math.max(min, Math.min(max, v));

    const resize = () => {
        const canvas = canvasRef.current!;
        const dpr = Math.max(1, window.devicePixelRatio || 1);
        const w = canvas.clientWidth;
        const h = canvas.clientHeight;
        canvas.width = Math.floor(w * dpr);
        canvas.height = Math.floor(h * dpr);

        const ctx = canvas.getContext("2d")!;
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        ctx.lineCap = "round";
        ctx.lineJoin = "round";
        ctx.shadowColor = color;
        ctx.shadowBlur = 6;
        ctxRef.current = ctx;

        // старт с пустого экрана (без «палок»)
        ptsRef.current = [];
        lastTsRef.current = null;
    };

    useEffect(() => {
        const canvas = canvasRef.current!;
        resize();
        const onResize = () => resize();
        window.addEventListener("resize", onResize);

        const animate = (ts: number) => {
            const ctx = ctxRef.current!;
            const w = canvas.clientWidth;
            const h = canvas.clientHeight;

            const last = lastTsRef.current ?? ts;
            const dt = Math.min(0.05, (ts - last) / 1000);
            lastTsRef.current = ts;

            // сколько точек добавить за прошедшее время
            const toAdd = Math.max(1, Math.floor((speed * dt) / stepX));
            const pts = ptsRef.current;
            const maxPoints = Math.ceil(w / stepX) + 2;

            // ФАЗА 1: grow → заполняем линию слева направо, не двигая существующие точки
            const lastX = pts.length ? pts[pts.length - 1].x : -stepX;
            const stillGrowing = lastX < w;

            for (let n = 0; n < toAdd; n++) {
                if (stillGrowing) {
                    // добавляем справа, не двигая массив
                    const prevY = pts.length ? pts[pts.length - 1].y : h / 2;
                    const targetY = prevY + (Math.random() - 0.5) * amplitude;
                    const y = prevY + (clamp(targetY, 0, h) - prevY) * 0.35;
                    const x = (pts.length ? pts[pts.length - 1].x : 0) + stepX;
                    pts.push({ x, y });
                } else {
                    // ФАЗА 2: scroll → двигаем всё влево и добавляем новую справа
                    for (let i = 0; i < pts.length; i++) pts[i].x -= stepX;
                    while (pts.length && pts[0].x < -stepX) pts.shift();
                    const prevY = pts.length ? pts[pts.length - 1].y : h / 2;
                    const targetY = prevY + (Math.random() - 0.5) * amplitude;
                    const y = prevY + (clamp(targetY, 0, h) - prevY) * 0.35;
                    const x = (pts.length ? pts[pts.length - 1].x : 0) + stepX;
                    pts.push({ x, y });
                }

                while (pts.length > maxPoints) pts.shift();
            }

            // Рендер
            ctx.clearRect(0, 0, w, h);
            if (pts.length < 2) {
                rafRef.current = requestAnimationFrame(animate);
                return;
            }
            ctx.beginPath();
            ctx.lineWidth = lineWidth;
            ctx.strokeStyle = color;

            for (let i = 0; i < pts.length; i++) {
                const p = pts[i];
                const x = p.x + (Math.random() - 0.5) * jitterX;
                const y = p.y + (Math.random() - 0.5) * jitterY;
                if (i === 0) ctx.moveTo(x, y);
                else ctx.lineTo(x, y);
            }
            ctx.stroke();

            rafRef.current = requestAnimationFrame(animate);
        };

        rafRef.current = requestAnimationFrame(animate);

        const onVis = () => {
            if (document.hidden) {
                if (rafRef.current) cancelAnimationFrame(rafRef.current);
                rafRef.current = null;
                lastTsRef.current = null;
            } else {
                rafRef.current = requestAnimationFrame(animate);
            }
        };
        document.addEventListener("visibilitychange", onVis);

        return () => {
            window.removeEventListener("resize", onResize);
            document.removeEventListener("visibilitychange", onVis);
            if (rafRef.current) cancelAnimationFrame(rafRef.current);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [color, lineWidth, speed, stepX, jitterX, jitterY, amplitude]);

    return <canvas ref={canvasRef} className={className} />;
}
