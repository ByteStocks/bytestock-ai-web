'use client';

import { useState, useEffect, useCallback } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { EquityChart } from "@/components/strategies/EquityChart";
import { POPULAR_BACKTEST_SYMBOLS } from "@/lib/strategies/catalog";
import { generateCandles } from "@/lib/strategies/data";
import { runBacktest } from "@/lib/strategies/backtester";
import type { BacktestOutput, StrategyDefinition } from "@/lib/strategies/types";
import { cn } from "@/lib/utils";

const fmtPct = (v: number) => `${v >= 0 ? '+' : ''}${v.toFixed(2)}%`;
const fmtRatio = (v: number) => v.toFixed(2);

interface BacktestPanelProps {
    strategy: StrategyDefinition;
}

export function BacktestPanel({ strategy }: BacktestPanelProps) {
    const [symbol, setSymbol] = useState(POPULAR_BACKTEST_SYMBOLS[0]);
    const [lookbackYears, setLookbackYears] = useState(5);
    const [params, setParams] = useState<Record<string, number>>(() => defaultParams(strategy));
    const [result, setResult] = useState<BacktestOutput | null>(null);
    const [running, setRunning] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        setParams(defaultParams(strategy));
        setResult(null);
        setError(null);
    }, [strategy]);

    const run = useCallback(() => {
        setRunning(true);
        setError(null);
        setResult(null);
        try {
            const candles = generateCandles(symbol, lookbackYears * 252);
            const output = runBacktest({
                candles,
                strategy: strategy.run,
                params,
                symbol,
            });
            setResult(output);
        } catch (e) {
            setError(e instanceof Error ? e.message : 'Backtest failed');
        } finally {
            setRunning(false);
        }
    }, [symbol, lookbackYears, params, strategy]);

    useEffect(() => {
        run();
    }, [run]);

    const metrics = result?.metrics;

    const statTile = (label: string, value: string, color = 'text-gray-100') => (
        <div className="flex flex-col gap-1 rounded-lg border border-gray-700/60 bg-gray-900/40 p-3">
            <span className="text-xs text-gray-500">{label}</span>
            <span className={cn("text-lg font-bold tabular-nums", color)}>{value}</span>
        </div>
    );

    return (
        <Card className="bg-gray-800/40 border-gray-700">
            <CardHeader className="pb-4">
                <CardTitle className="text-xl text-gray-100">{strategy.name}</CardTitle>
                <CardDescription>{strategy.description}</CardDescription>
            </CardHeader>

            <CardContent className="space-y-5">
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                    <div className="space-y-1.5">
                        <label className="text-sm text-gray-400">Symbol</label>
                        <select
                            value={symbol}
                            onChange={(e) => setSymbol(e.target.value)}
                            className="w-full rounded-md border border-gray-700 bg-gray-900 px-3 py-2 text-sm text-gray-100 focus:outline-none focus:ring-1 focus:ring-yellow-500"
                        >
                            {POPULAR_BACKTEST_SYMBOLS.map((s) => (
                                <option key={s} value={s}>{s}</option>
                            ))}
                        </select>
                    </div>

                    <div className="space-y-1.5">
                        <label className="text-sm text-gray-400">Lookback (years)</label>
                        <select
                            value={lookbackYears}
                            onChange={(e) => setLookbackYears(Number(e.target.value))}
                            className="w-full rounded-md border border-gray-700 bg-gray-900 px-3 py-2 text-sm text-gray-100 focus:outline-none focus:ring-1 focus:ring-yellow-500"
                        >
                            {[1, 2, 3, 5, 10].map((y) => (
                                <option key={y} value={y}>{y}Y</option>
                            ))}
                        </select>
                    </div>

                    <div className="flex items-end">
                        <Button
                            onClick={run}
                            disabled={running}
                            className="w-full bg-yellow-500 text-yellow-900 hover:bg-yellow-400"
                        >
                            {running ? 'Running...' : 'Run Backtest'}
                        </Button>
                    </div>
                </div>

                {Object.keys(strategy.params).length > 0 && (
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 border-t border-gray-700/60 pt-4">
                        {Object.entries(strategy.params).map(([key, def]) => (
                            <div key={key} className="space-y-1.5">
                                <label className="text-sm text-gray-400">{def.label}</label>
                                <div className="flex items-center gap-2">
                                    <input
                                        type="range"
                                        min={def.min}
                                        max={def.max}
                                        step={def.step ?? 1}
                                        value={params[key] ?? def.def}
                                        onChange={(e) => setParams((prev) => ({ ...prev, [key]: Number(e.target.value) }))}
                                        className="flex-1 accent-yellow-500"
                                    />
                                    <span className="w-12 text-right text-sm font-medium tabular-nums text-gray-300">
                                        {params[key]}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {error && (
                    <div className="rounded-lg border border-red-500/40 bg-red-950/40 p-3 text-sm text-red-300">
                        {error}
                    </div>
                )}

                {metrics && (
                    <div className="space-y-4 pt-2">
                        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
                            {statTile('Total Return', fmtPct(metrics.totalReturnPct), metrics.totalReturnPct >= 0 ? 'text-green-400' : 'text-red-400')}
                            {statTile('CAGR', fmtPct(metrics.cagrPct))}
                            {statTile('Sharpe Ratio', fmtRatio(metrics.sharpeRatio), 'text-yellow-400')}
                            {statTile('Max Drawdown', `-${metrics.maxDrawdownPct.toFixed(2)}%`, 'text-red-400')}
                            {statTile('Win Rate', `${metrics.winRatePct.toFixed(1)}%`)}
                            {statTile('Trades', String(metrics.numTrades))}
                        </div>

                        <div className="rounded-lg border border-gray-700/60 bg-gray-900/40 p-4">
                            <EquityChart strategy={result!.equity} />
                        </div>

                        <div className="flex flex-wrap items-center gap-2">
                            <Badge className="bg-gray-700 text-gray-300">{strategy.id}</Badge>
                            <span className="text-xs text-gray-500">
                                Alpha vs buy-and-hold: <span className={metrics.alphaPct >= 0 ? 'text-green-400' : 'text-red-400'}>{fmtPct(metrics.alphaPct)}</span>
                            </span>
                            <span className="text-xs text-gray-500">
                                Benchmark:{' '}
                                <span className={metrics.benchmarkReturnPct >= 0 ? 'text-yellow-500' : 'text-red-400'}>
                                    {fmtPct(metrics.benchmarkReturnPct)}
                                </span>
                            </span>
                        </div>
                    </div>
                )}
            </CardContent>
        </Card>
    );
}

function defaultParams(strategy: StrategyDefinition): Record<string, number> {
    const init: Record<string, number> = {};
    Object.entries(strategy.params).forEach(([key, val]) => { init[key] = val.def; });
    return init;
}