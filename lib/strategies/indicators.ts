export function sma(values: number[], period: number): number[] {
    const result = new Array(values.length).fill(NaN);
    let sum = 0;
    for (let i = 0; i < values.length; i++) {
        sum += values[i];
        if (i >= period) sum -= values[i - period];
        if (i >= period - 1) result[i] = sum / period;
    }
    return result;
}

export function ema(values: number[], period: number): number[] {
    const result = new Array(values.length).fill(NaN);
    const k = 2 / (period + 1);
    for (let i = 0; i < values.length; i++) {
        if (i === 0) result[i] = values[i];
        else result[i] = values[i] * k + result[i - 1] * (1 - k);
    }
    return result;
}

export function rsi(values: number[], period: number): number[] {
    const result = new Array(values.length).fill(NaN);
    let avgGain = 0;
    let avgLoss = 0;

    for (let i = 1; i < values.length; i++) {
        const change = values[i] - values[i - 1];
        const gain = change > 0 ? change : 0;
        const loss = change < 0 ? -change : 0;

        if (i <= period) {
            avgGain += gain;
            avgLoss += loss;
            if (i === period) {
                avgGain /= period;
                avgLoss /= period;
                result[i] = avgLoss === 0 ? 100 : 100 - 100 / (1 + avgGain / avgLoss);
            }
        } else {
            avgGain = (avgGain * (period - 1) + gain) / period;
            avgLoss = (avgLoss * (period - 1) + loss) / period;
            result[i] = avgLoss === 0 ? 100 : 100 - 100 / (1 + avgGain / avgLoss);
        }
    }
    return result;
}

export function macd(values: number[], fast = 12, slow = 26, signal = 9): { macd: number[]; signal: number[]; hist: number[] } {
    const emaFast = ema(values, fast);
    const emaSlow = ema(values, slow);
    const macdLine = emaFast.map((v, i) => (isNaN(v) || isNaN(emaSlow[i]) ? NaN : v - emaSlow[i]));
    const signalLine = ema(macdLine.map((v) => (isNaN(v) ? 0 : v)), signal);
    const macdClean = macdLine.map((v) => (isNaN(v) ? 0 : v));
    const hist = macdClean.map((v, i) => (isNaN(signalLine[i]) ? NaN : v - signalLine[i]));
    return { macd: macdLine, signal: signalLine, hist };
}

export function bollinger(values: number[], period: number, mult = 2): { upper: number[]; middle: number[]; lower: number[] } {
    const middle = sma(values, period);
    const upper = new Array(values.length).fill(NaN);
    const lower = new Array(values.length).fill(NaN);

    for (let i = period - 1; i < values.length; i++) {
        const slice = values.slice(i - period + 1, i + 1);
        const mean = middle[i];
        const variance = slice.reduce((acc, v) => acc + Math.pow(v - mean, 2), 0) / period;
        const std = Math.sqrt(variance);
        upper[i] = mean + mult * std;
        lower[i] = mean - mult * std;
    }
    return { upper, middle, lower };
}

export function highest(values: number[], period: number): number[] {
    const result = new Array(values.length).fill(NaN);
    for (let i = 0; i < values.length; i++) {
        if (i < period - 1) continue;
        let max = -Infinity;
        for (let j = i - period + 1; j <= i; j++) max = Math.max(max, values[j]);
        result[i] = max;
    }
    return result;
}

export function lowest(values: number[], period: number): number[] {
    const result = new Array(values.length).fill(NaN);
    for (let i = 0; i < values.length; i++) {
        if (i < period - 1) continue;
        let min = Infinity;
        for (let j = i - period + 1; j <= i; j++) min = Math.min(min, values[j]);
        result[i] = min;
    }
    return result;
}

export function crossUp(a: number[], b: number[]): boolean[] {
    return a.map((v, i) => i > 0 && !isNaN(v) && !isNaN(b[i]) && !isNaN(a[i - 1]) && !isNaN(b[i - 1]) && v > b[i] && a[i - 1] <= b[i - 1]);
}

export function crossDown(a: number[], b: number[]): boolean[] {
    return a.map((v, i) => i > 0 && !isNaN(v) && !isNaN(b[i]) && !isNaN(a[i - 1]) && !isNaN(b[i - 1]) && v < b[i] && a[i - 1] >= b[i - 1]);
}

export function atr(candles: { high: number; low: number; close: number }[], period: number): number[] {
    const result = new Array(candles.length).fill(NaN);
    const tr = new Array(candles.length).fill(NaN);
    tr[0] = candles[0].high - candles[0].low;
    for (let i = 1; i < candles.length; i++) {
        tr[i] = Math.max(
            candles[i].high - candles[i].low,
            Math.abs(candles[i].high - candles[i - 1].close),
            Math.abs(candles[i].low - candles[i - 1].close)
        );
        if (i >= period) {
            let sum = 0;
            for (let j = i - period + 1; j <= i; j++) sum += tr[j];
            result[i] = sum / period;
        }
    }
    return result;
}