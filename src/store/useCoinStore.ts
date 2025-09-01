// store/useCoinStore.ts
import { create } from "zustand";
import {devtools} from 'zustand/middleware';
import { gtFetchOHLCV, gtFetchPool, gtFetchToken } from "@/api/coingecko";
import type { CoinState } from "../../Type/Type";

export const useCoinStore = create<CoinState>()(devtools((set) => ({
    loading: false,
    error: null,
    name: null,
    symbol: null,
    price: null,
    marketCap: null,
    volume24h: null,
    fdv: null,
    chart: [],

    async loadFromGecko({   network = "solana", pool, token, timeframe = "day",}){
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

            // 2) Пул — FDV/капитализация/объём
            const poolAttr = await gtFetchPool({
                network,
                poolAddress: pool,
            });

            const fdv = poolAttr?.fdv_usd ?? null;
            const marketCap = poolAttr?.market_cap_usd ?? null;
            const volume24h = poolAttr?.volume_usd?.h24 ?? null;

            // 3) OHLCV
            const ohlcv = await gtFetchOHLCV({
                network,
                poolAddress: pool,
                timeframe,
            });

            set({
                loading: false,
                error: null,
                name,
                symbol,
                price,
                fdv,
                marketCap,
                volume24h,
                chart: ohlcv,
            });
        } catch (e: any) {
            set({ loading: false, error: e?.message ?? "Failed to load" });
        }
    }
}),{ name : 'CoinStore',}));
