import type { Candle } from "./types";

function hashString(str: string): number {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        hash = (hash << 5) - hash + str.charCodeAt(i);
        hash |= 0;
    }
    return Math.abs(hash);
}

function mulberry32(seed: number) {
    let a = seed;
    return function () {
        a |= 0;
        a = (a + 0x6d2b79f5) | 0;
        let t = Math.imul(a ^ (a >>> 15), 1 | a);
        t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
        return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
}

const TRADING_DAYS_PER_YEAR = 252;

export function generateCandles(symbol: string, days: number, seedOffset = 0): Candle[] {
    const seed = hashString(symbol.toUpperCase()) + seedOffset * 997;
    const rand = mulberry32(seed);

    const startPrice = 40 + rand() * 400;
    const drift = (rand() - 0.26) * 0.0012;
    const baseVol = 0.008 + rand() * 0.012;

    const candles: Candle[] = [];
    let price = startPrice;

    const today = new Date();
    today.setHours(12, 0, 0, 0);

    for (let i = 0; i < days; i++) {
        const regime = rand();
        const regimeVol =
            regime < 0.12 ? baseVol * 2.0 : regime > 0.88 ? baseVol * 0.55 : baseVol;
        const shock = regime < 0.05 ? (rand() - 0.5) * 0.04 : 0;

        const dailyReturn = drift + (rand() - 0.5) * 2 * regimeVol + shock;
        const open = price * (1 + (rand() - 0.5) * regimeVol * 0.4);
        const close = open * (1 + dailyReturn);
        const wick = regimeVol * 0.6 * (0.5 + rand());
        const high = Math.max(open, close) * (1 + wick);
        const low = Math.min(open, close) * (1 - wick);
        const volume = 500000 + rand() * 3500000 * (regime < 0.15 ? 2 : 1);

        const ts = today.getTime() - (days - 1 - i) * 86400000;

        candles.push({ timestamp: ts, open, high, low, close, volume });
        price = close;
    }

    return candles;
}

export { TRADING_DAYS_PER_YEAR };
