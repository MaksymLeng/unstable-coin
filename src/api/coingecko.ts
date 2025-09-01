import axios from "axios";
import type {
    Candle,
    TokenAttributes,
} from "../../Type/Type";

const geckoTerminalClient = axios.create({
    baseURL: "https://api.geckoterminal.com/api/v2",
    timeout: 15000,
})

// --- helpers ---
function unwrapAxiosError(error: unknown): never {
    if (axios.isAxiosError(error)) {
        const code = error.code ?? "AXIOS_ERROR";
        const msg =
            error.response?.data?.message ??
            error.message ??
            "Request failed";
        throw new Error(`[${code}] ${msg}`);
    }
    throw new Error("Unknown error");
}

export async function fetchOHLCV(
    network: string,
    poolAddress: string,
    opts: { timeframe?: "minute" | "hour" | "day"; aggregate?: 1 | 4 | 12 | 5 | 15; limit?: number } = {}
): Promise<Candle[]> {
    try {
        const timeframe = opts.timeframe ?? "hour"      // почасовые свечи
        const aggregate = opts.aggregate ?? 1           // по 1 часу
        const limit = opts.limit ?? 12                  // последние 12 часов

        const url = `/networks/${network}/pools/${poolAddress}/ohlcv/${timeframe}`
        const res = await geckoTerminalClient.get(url, { params: { aggregate, limit } })

        // ответ — массив [timestamp, open, high, low, close, volume]
        const list: [number, string, string, string, string, string][] = res.data?.data?.attributes?.ohlcv_list ?? []
        return list.map(([t, o, h, l, c, v]) => {
            const ts = t * 1000
            return {
                time: new Date(ts).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
                ts,
                open: Number(o),
                high: Number(h),
                low: Number(l),
                close: Number(c),
                volume: Number(v),
            }
        })
    } catch (error) {
        unwrapAxiosError(error);
    }
}

export async function gtFetchToken(params: {
    network?: string;
    tokenAddress: string;
}): Promise<TokenAttributes> {
    try {
        const { network = "solana", tokenAddress } = params;
        const url = `/networks/${network}/tokens/${tokenAddress}`;
        const { data } = await geckoTerminalClient.get(url);
        return data?.data?.attributes ?? {};
    } catch (error) {
        unwrapAxiosError(error);
    }
}


