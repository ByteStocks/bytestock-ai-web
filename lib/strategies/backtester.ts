import type { BacktestMetrics, BacktestOptions, BacktestOutput, Trade } from "./types";
import { TRADING_DAYS_PER_YEAR } from "./data";

const RISK_FREE_RATE = 0.02;

export function runBacktest(options: BacktestOptions): BacktestOutput {
    const { candles, strategy, params } = options;
    const signals = strategy({ candles, params });

    const initialCapital = 10000;
    let capital = initialCapital;
    let inPosition = false;
    let entryIndex = 0;
    let entryPrice = 0;
    let shares = 0;

    const trades: Trade[] = [];
    const equity = candles.map((c, i) => ({ index: i, equity: 0, buyHold: 0 }));

    for (let i = 0; i < candles.length; i++) {
        const close = candles[i].close;
        const signal = signals[i];

        if (signal === 1 && !inPosition) {
            inPosition = true;
            entryIndex = i;
            entryPrice = close;
            shares = (capital * 0.98) / close;
        } else if (signal === -1 && inPosition) {
            const exitPrice = candles[i].close;
            const exitValue = shares * exitPrice;
            const returnPct = (exitPrice / entryPrice - 1) * 100;
            trades.push({
                entryIndex,
                exitIndex: i,
                entryPrice,
                exitPrice,
                returnPct,
                holdingPeriod: i - entryIndex,
            });
            capital = exitValue * 0.999;
            inPosition = false;
            shares = 0;
        }

        equity[i].equity = inPosition ? (shares * close) + (capital - entryPrice * shares) : capital;
    }

    if (inPosition) {
        const exitPrice = candles[candles.length - 1].close;
        const returnPct = (exitPrice / entryPrice - 1) * 100;
        trades.push({
            entryIndex,
            exitIndex: candles.length - 1,
            entryPrice,
            exitPrice,
            returnPct,
            holdingPeriod: candles.length - 1 - entryIndex,
        });
        capital = shares * exitPrice * 0.999;
        equity[candles.length - 1].equity = capital;
    }

    const buyHoldEq = candles.map((_, i) => (candles[i].close / candles[0].close) * initialCapital);
    equity.forEach((p, i) => { p.buyHold = buyHoldEq[i]; });

    const metrics = computeMetrics({ candles, equity, trades, initialCapital, benchmark: buyHoldEq[buyHoldEq.length - 1] });

    return { metrics, trades, equity, signals };
}

function computeMetrics(args: {
    candles: { close: number }[];
    equity: { equity: number }[];
    trades: Trade[];
    initialCapital: number;
    benchmark: number;
}): BacktestMetrics {
    const { candles, equity, trades, initialCapital, benchmark } = args;
    const n = candles.length;
    const years = n / TRADING_DAYS_PER_YEAR;

    const finalEquity = equity[equity.length - 1].equity;
    const totalReturnPct = (finalEquity / initialCapital - 1) * 100;
    const benchmarkReturnPct = (benchmark / initialCapital - 1) * 100;

    const cagrPct = totalReturnPct > -100 && years > 0 ? (Math.pow(finalEquity / initialCapital, 1 / years) - 1) * 100 : 0;

    const returns: number[] = [];
    for (let i = 1; i < equity.length; i++) {
        returns.push(equity[i].equity / equity[i - 1].equity - 1);
    }
    const mean = returns.reduce((a, b) => a + b, 0) / returns.length;
    const variance = returns.reduce((a, b) => a + Math.pow(b - mean, 2), 0) / returns.length;
    const std = Math.sqrt(variance);
    const annualizedStd = std * Math.sqrt(TRADING_DAYS_PER_YEAR);
    const volatilityPct = annualizedStd * 100;
    const sharpeRatio = annualizedStd > 0 ? ((mean * TRADING_DAYS_PER_YEAR - RISK_FREE_RATE) / annualizedStd) : 0;

    let peak = -Infinity;
    let maxDrawdownPct = 0;
    for (const point of equity) {
        if (point.equity > peak) peak = point.equity;
        const dd = (peak - point.equity) / peak;
        if (dd > maxDrawdownPct) maxDrawdownPct = dd;
    }
    maxDrawdownPct *= 100;

    const wins = trades.filter((t) => t.returnPct > 0).length;
    const winRatePct = trades.length > 0 ? (wins / trades.length) * 100 : 0;
    const alphaPct = totalReturnPct - benchmarkReturnPct;

    return {
        totalReturnPct,
        years,
        cagrPct,
        sharpeRatio,
        volatilityPct,
        maxDrawdownPct,
        winRatePct,
        numTrades: trades.length,
        alphaPct,
        benchmarkReturnPct,
    };
}