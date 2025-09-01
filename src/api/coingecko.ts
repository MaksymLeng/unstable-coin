import axios from "axios";
import type {
    GeckoTerminalRow,
    GTRow,
    PoolAttributes,
    Timeframe,
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

function normalizeRows(rows: GeckoTerminalRow[] = []): GTRow[] {
    return rows
        .filter(r => typeof r?.t === "number")
        .map((r) => ({
            time: r.t,
            price: (r.c ?? r.o ?? r.h ?? r.l ?? 0) || 0,
            volume: r.v ?? 0,
        }));
}

// --- API ---
export async function gtFetchOHLCV(params: {
    network?: string;
    poolAddress: string;
    timeframe?: Timeframe;
}): Promise<GTRow[]> {
    try {
        const { network = "solana", poolAddress, timeframe = "day" } = params;
        const url = `/networks/${network}/pools/${poolAddress}/ohlcv/${timeframe}`;
        const { data } = await geckoTerminalClient.get(url);
        const raw: GeckoTerminalRow[] = data?.data?.attributes?.ohlcv_list ?? [];
        return normalizeRows(raw);
    } catch (error) {
        unwrapAxiosError(error);
    }
}

export async function gtFetchPool(params: {
    network?: string;
    poolAddress: string;
}): Promise<PoolAttributes> {
    try {
        const { network = "solana", poolAddress } = params;
        const url = `/networks/${network}/pools/${poolAddress}`;
        const { data } = await geckoTerminalClient.get(url);
        const attributes: PoolAttributes = data?.data?.attributes ?? {};
        return attributes;
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
        const attributes: TokenAttributes = data?.data?.attributes ?? {};
        return attributes;
    } catch (error) {
        unwrapAxiosError(error);
    }
}


