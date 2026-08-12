import type { StrategyDefinition, StrategyInstance } from "./types";
import { sma, ema, rsi, macd, bollinger, crossUp, crossDown, highest, lowest, atr } from "./indicators";

export const STRATEGY_CATALOG: StrategyDefinition[] = [
    {
        id: "sma-crossover",
        name: "SMA Crossover",
        description: "Buys when the fast moving average crosses above the slow moving average (golden cross), sells on the death cross. A classic trend-following strategy.",
        category: "Trend Following",
        tags: ["Moving Average", "Classic"],
        params: {
            fast: { label: "Fast Period", min: 5, max: 100, step: 1, def: 20 },
            slow: { label: "Slow Period", min: 20, max: 250, step: 5, def: 50 },
        },
        run: ({ candles, params }) => {
            const closes = candles.map((c) => c.close);
            const fastArr = sma(closes, params.fast || 20);
            const slowArr = sma(closes, params.slow || 50);
            const signalsOut: (1 | -1 | 0)[] = new Array(candles.length).fill(0);
            const up = crossUp(fastArr, slowArr);
            const down = crossDown(fastArr, slowArr);
            for (let i = 0; i < candles.length; i++) {
                if (up[i]) signalsOut[i] = 1;
                else if (down[i]) signalsOut[i] = -1;
            }
            return signalsOut;
        },
    },
    {
        id: "ema-crossover",
        name: "EMA Crossover",
        description: "Uses exponential moving averages for faster reaction to price changes. Reacts quicker than SMA to recent moves.",
        category: "Trend Following",
        tags: ["Exponential", "MA"],
        params: {
            fast: { label: "Fast Period", min: 2, max: 50, step: 1, def: 12 },
            slow: { label: "Slow Period", min: 10, max: 200, step: 1, def: 26 },
        },
        run: ({ candles, params }) => {
            const closes = candles.map((c) => c.close);
            const fast = ema(closes, params.fast || 12);
            const slow = ema(closes, params.slow || 26);
            const signals: (1 | -1 | 0)[] = new Array(candles.length).fill(0);
            const up = crossUp(fast, slow);
            const down = crossDown(fast, slow);
            for (let i = 0; i < candles.length; i++) {
                if (up[i]) signals[i] = 1;
                else if (down[i]) signals[i] = -1;
            }
            return signals;
        },
    },
    {
        id: "rsi-reversal",
        name: "RSI Mean Reversion",
        description: "Enters long when the Relative Strength Index drops oversold (below threshold), exits when it reaches overbought.",
        category: "Mean Reversion",
        tags: ["RSI", "Oscillator"],
        params: {
            period: { label: "RSI Period", min: 2, max: 50, step: 1, def: 14 },
            oversold: { label: "Oversold Level", min: 0, max: 50, step: 1, def: 30 },
            overbought: { label: "Overbought Level", min: 50, max: 100, step: 1, def: 70 },
        },
        run: ({ candles, params }) => {
            const rsiArr = rsi(candles.map((c) => c.close), params.period || 14);
            const overbought = params.overbought || 70;
            const oversold = params.oversold || 30;
            const signals: (1 | -1 | 0)[] = new Array(candles.length).fill(0);
            for (let i = 1; i < candles.length; i++) {
                if (rsiArr[i - 1] < oversold && rsiArr[i] > oversold) signals[i] = 1;
                else if (rsiArr[i - 1] > overbought && rsiArr[i] < overbought) signals[i] = -1;
            }
            return signals;
        },
    },
    {
        id: "rsi-trend",
        name: "RSI Trend Ride",
        description: "Stays long while RSI remains healthy in the bullish zone (40-80), exiting when RSI drops below 40.",
        category: "Trend Following",
        tags: ["RSI", "Momentum"],
        params: {
            period: { label: "RSI Period", min: 2, max: 50, step: 1, def: 14 },
            exitLevel: { label: "Exit Level", min: 20, max: 60, step: 1, def: 40 },
        },
        run: ({ candles, params }) => {
            const rsiArr = rsi(candles.map((c) => c.close), params.period || 14);
            const exitLevel = params.exitLevel || 40;
            const signals: (1 | -1 | 0)[] = new Array(candles.length).fill(0);
            let position = false;
            for (let i = 0; i < candles.length; i++) {
                const value = rsiArr[i];
                if (!position && !isNaN(value) && value > 50 && value < 80) {
                    signals[i] = 1;
                    position = true;
                } else if (position && !isNaN(value) && value < exitLevel) {
                    signals[i] = -1;
                    position = false;
                }
            }
            return signals;
        },
    },
    {
        id: "macd",
        name: "MACD Momentum",
        description: "Uses the MACD line crossing above the signal line to buy, and crossing below to sell. Classic momentum strategy.",
        category: "Momentum",
        tags: ["MACD", "Oscillator"],
        params: {
            fast: { label: "Fast EMA", min: 2, max: 30, step: 1, def: 12 },
            slow: { label: "Slow EMA", min: 10, max: 60, step: 1, def: 26 },
            signal: { label: "Signal Period", min: 2, max: 30, step: 1, def: 9 },
        },
        run: ({ candles, params }) => {
            const macdOut = macd(candles.map((c) => c.close), params.fast || 12, params.slow || 26, params.signal || 9);
            const signals: (1 | -1 | 0)[] = new Array(candles.length).fill(0);
            const up = crossUp(macdOut.macd, macdOut.signal);
            const down = crossDown(macdOut.macd, macdOut.signal);
            for (let i = 0; i < candles.length; i++) {
                if (up[i]) signals[i] = 1;
                else if (down[i]) signals[i] = -1;
            }
            return signals;
        },
    },
    {
        id: "bollinger-breakout",
        name: "Bollinger Breakout",
        description: "Buys when price closes above the upper band (momentum continuation), sells when it reverts below the middle band.",
        category: "Breakout",
        tags: ["Volatility", "Bollinger"],
        params: {
            period: { label: "Lookback Period", min: 10, max: 100, step: 1, def: 20 },
            mult: { label: "Multiplier", min: 1, max: 4, step: 0.1, def: 2 },
        },
        run: ({ candles, params }) => {
            const boll = bollinger(candles.map((c) => c.close), params.period || 20, params.mult || 2);
            const signals: (1 | -1 | 0)[] = new Array(candles.length).fill(0);
            let position = false;
            for (let i = 1; i < candles.length; i++) {
                const close = candles[i].close;
                if (!position && !isNaN(boll.upper[i]) && close > boll.upper[i]) {
                    signals[i] = 1;
                    position = true;
                } else if (position && !isNaN(boll.middle[i]) && close < boll.middle[i]) {
                    signals[i] = -1;
                    position = false;
                }
            }
            return signals;
        },
    },
    {
        id: "donchian-breakout",
        name: "Donchian Breakout",
        description: "The classic turtle trading entry: buy on a new N-day high, sell on a new N-day low.",
        category: "Breakout",
        tags: ["Turtle", "Channel"],
        params: {
            period: { label: "Channel Period", min: 5, max: 120, step: 1, def: 20 },
        },
        run: ({ candles, params }) => {
            const highs = candles.map((c) => c.high);
            const lows = candles.map((c) => c.low);
            const highArr = highest(highs, params.period || 20);
            const lowArr = lowest(lows, params.period || 20);
            const signals: (1 | -1 | 0)[] = new Array(candles.length).fill(0);
            for (let i = 1; i < candles.length; i++) {
                if (candles[i].close > highArr[i - 1]) signals[i] = 1;
                else if (candles[i].close < lowArr[i - 1]) signals[i] = -1;
            }
            return signals;
        },
    },
    {
        id: "ema-atr-exit",
        name: "EMA + ATR Trailing",
        description: "Trend-following strategy that stays long above the EMA and uses an ATR-trailing stop to exit on adverse moves.",
        category: "Trend Following",
        tags: ["EMA", "ATR", "Trailing Stop"],
        params: {
            period: { label: "EMA Period", min: 5, max: 100, step: 1, def: 21 },
            atrPeriod: { label: "ATR Period", min: 5, max: 100, step: 1, def: 14 },
            atrMult: { label: "ATR Multiplier", min: 1, max: 6, step: 0.5, def: 3 },
        },
        run: ({ candles, params }) => {
            const closes = candles.map((c) => c.close);
            const emaArr = ema(closes, params.period || 21);
            const atrArr = atr(candles, params.atrPeriod || 14);
            const mult = params.atrMult || 3;
            const signals: (1 | -1 | 0)[] = new Array(candles.length).fill(0);
            let position = false;
            let stop = 0;
            for (let i = 1; i < candles.length; i++) {
                if (!position && !isNaN(emaArr[i]) && closes[i] > emaArr[i]) {
                    signals[i] = 1;
                    position = true;
                    stop = closes[i] - atrArr[i] * mult;
                } else if (position) {
                    stop = Math.max(stop, closes[i] - atrArr[i] * mult);
                    if (closes[i] < stop) {
                        signals[i] = -1;
                        position = false;
                    }
                }
            }
            return signals;
        },
    },
];

export const POPULAR_BACKTEST_SYMBOLS = ["MSFT", "AMZN", "AAPL", "GOOGL", "TSLA", "NVDA", "META", "NFLX", "AMD", "SPY"];

export function instantiateStrategy(id: string): StrategyInstance | null {
    const def = STRATEGY_CATALOG.find((s) => s.id === id);
    if (!def) return null;
    const params: Record<string, number> = {};
    Object.entries(def.params).forEach(([key, val]) => { params[key] = val.def; });
    return { id: def.id, name: def.name, description: def.description, category: def.category, tags: def.tags, params };
}