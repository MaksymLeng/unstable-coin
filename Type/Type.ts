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

export type LinkButtonProps = {
    label: string
    href: string
}

export type CABoxProps = {
    chain: "SOL" | "ETH" | string;
    address: string;
    className?: string;
};

type Interval = "minute" | "hour" | "day"

export type HSeries = {
    h24?: number | null;
};

export type Candle = {
    time: string
    ts: number
    open: number
    high: number
    low: number
    close: number
    volume: number
}

export type TokenAttributes = {
    name?: string | null;
    symbol?: string | null;
    price_usd?: number | null;
    fdv_usd?: number | null;
    market_cap_usd?: number | null;
    volume_usd?: HSeries | null;
};

export type CoinState = {
    // флаги
    loading: boolean;
    error: string | null;

    // токен
    name: string | null;
    symbol: string | null;

    // метрики
    price: number | null;
    marketCap: number | null;
    volume24h: number | null;
    fdv: number | null;

    // график
    chart: Candle[];
    loadingChart: boolean;
    errorChart: string | null;
    lastParams?: { network: string; pool: string; timeframe: Interval; aggregate: number; limit: number }

    // загрузчик
    loadFromGecko: (params: {
        network?: "solana";
        token: string;
    }) => Promise<void>;

    getCandles: (p: { network: string; pool: string; timeframe?: Interval; aggregate?: number; limit?: number }) => Promise<void>
};