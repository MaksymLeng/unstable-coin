export type BackgroundGraphProps = {
    className?: string;
    color?: string;         // цвет линии
    lineWidth?: number;     // толщина линии (в CSS-пикселях)
    speed?: number;         // скорость анимации (точек/сек)
    stepX?: number;         // расстояние между точками по X (px)
    jitterX?: number;       // шум по X
    jitterY?: number;       // шум по Y
    amplitude?: number;     // «сила» шага случайного блуждания по Y
};