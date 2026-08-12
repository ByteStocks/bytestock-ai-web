export interface Candle {
    timestamp: number;
    open: number;
    high: number;
    low: number;
    close: number;
    volume: number;
}

export interface StrategyInput {
    candles: Candle[];
    params: Record<string, number>;
}

export type StrategyHandler = (input: StrategyInput) => (1 | -1 | 0)[];

export interface BacktestOptions {
    candles: Candle[];
    strategy: StrategyHandler;
    params: Record<string, number>;
    symbol: string;
}

export interface Trade {
    entryIndex: number;
    exitIndex: number;
    entryPrice: number;
    exitPrice: number;
    returnPct: number;
    holdingPeriod: number;
}

export interface EquityPoint {
    index: number;
    equity: number;
    buyHold: number;
}

export interface BacktestMetrics {
    totalReturnPct: number;
    years: number;
    cagrPct: number;
    sharpeRatio: number;
    volatilityPct: number;
    maxDrawdownPct: number;
    winRatePct: number;
    numTrades: number;
    alphaPct: number;
    benchmarkReturnPct: number;
}

export interface BacktestOutput {
    metrics: BacktestMetrics;
    trades: Trade[];
    equity: EquityPoint[];
    signals: (1 | -1 | 0)[];
}

export interface StrategyDefinition {
    id: string;
    name: string;
    description: string;
    category: string;
    tags: string[];
    params: Record<string, { label: string; min: number; max: number; step?: number; def: number }>;
    run: (input: StrategyInput) => (1 | -1 | 0)[];
}

export interface StrategyInstance {
    id: string;
    name: string;
    description: string;
    category: string;
    tags: string[];
    params: Record<string, number>;
}