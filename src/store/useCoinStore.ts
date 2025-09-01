// store/useCoinStore.ts
import { create } from "zustand";
import {devtools} from 'zustand/middleware';
import {fetchOHLCV, gtFetchToken} from "@/api/coingecko";
import type { CoinState } from "../../Type/Type";

export const useCoinStore = create<CoinState>()(devtools((set,get) => ({
    loading: false,
    error: null,
    name: null,
    symbol: null,
    price: null,
    marketCap: null,
    volume24h: null,
    fdv: null,
    chart: [],
    loadingChart: false,
    errorChart: null,

    async loadFromGecko({   network = "solana", token}){
        try {
            set({ loading: true, error: null });

            // 1) Токен — имя/символ/цена
            const tokenAttr = await gtFetchToken({
                network,
                tokenAddress: token,
            });

            const name = tokenAttr?.name ?? null;
            const symbol = tokenAttr?.symbol ?? null;
            const price = tokenAttr?.price_usd ?? null;

            const fdv = tokenAttr?.fdv_usd ?? null;
            const marketCap = tokenAttr?.market_cap_usd ?? null;
            const volume24h = tokenAttr?.volume_usd?.h24 ?? null;

            set({
                loading: false,
                error: null,
                name,
                symbol,
                price,
                fdv,
                marketCap,
                volume24h,
            });
        } catch (e: any) {
            set({ loading: false, error: e?.message ?? "Failed to load" });
        }
    },
    async getCandles({ network, pool, timeframe = "hour", aggregate = 1, limit = 12 }) {
        const last = get().lastParams
        if (last && last.network === network && last.pool === pool && last.timeframe === timeframe &&
            last.aggregate === aggregate && last.limit === limit && get().chart.length > 0) return

        set({ loading: true, error: null })
        try {
            const data = await fetchOHLCV(network, pool, { timeframe, aggregate: aggregate as 1 | 4 | 12 | 5 | 15, limit })
            set({ chart: data, lastParams: { network, pool, timeframe, aggregate, limit } })
        } catch (e: any) {
            console.error("getCandles error:", e)
            set({ error: e?.message ?? "Failed to load candles" })
        } finally {
            set({ loading: false })
        }
    },
}),{ name : 'CoinStore',}));
