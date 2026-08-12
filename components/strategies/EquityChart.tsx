'use client';

import { useMemo } from 'react';

interface EquityChartProps {
    strategy: { index: number; equity: number; buyHold: number }[];
    height?: number;
}

export function EquityChart({ strategy, height = 220 }: EquityChartProps) {
    const { points, area, buyHoldPoints, buyHoldArea } = useMemo(() => {
        if (strategy.length < 2) return { points: '', area: '', buyHoldPoints: '', buyHoldArea: '' };

        const values = strategy.map((p) => p.equity);
        const hold = strategy.map((p) => p.buyHold);
        const all = [...values, ...hold];
        let min = Math.min(...all);
        let max = Math.max(...all);
        const padding = (max - min) * 0.1 || 1;
        min -= padding;
        max += padding;

        const width = 800;
        const map = (v: number) => height - ((v - min) / (max - min)) * height;
        const x = (i: number) => (i / (strategy.length - 1)) * width;

        const strategyPts = strategy.map((p, i) => `${x(i)},${map(p.equity)}`).join(' ');
        const holdPts = strategy.map((p, i) => `${x(i)},${map(p.buyHold)}`).join(' ');

        return {
            points: strategyPts,
            area: `${x(0)},${height} ${strategyPts} ${x(strategy.length - 1)},${height}`,
            buyHoldPoints: holdPts,
            buyHoldArea: `${x(0)},${height} ${holdPts} ${x(strategy.length - 1)},${height}`,
        };
    }, [strategy, height]);

    const strategyGain = strategy[strategy.length - 1]?.equity - strategy[0]?.equity;
    const holdGain = strategy[strategy.length - 1]?.buyHold - strategy[0]?.buyHold;
    const isPositive = strategyGain >= 0;

    return (
        <div className="w-full">
            <svg viewBox={`0 0 800 ${height}`} className="w-full h-auto" preserveAspectRatio="none">
                <defs>
                    <linearGradient id="eqFill" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor={isPositive ? '#22c55e' : '#ef4444'} stopOpacity="0.35" />
                        <stop offset="100%" stopColor={isPositive ? '#22c55e' : '#ef4444'} stopOpacity="0.02" />
                    </linearGradient>
                    <linearGradient id="bhFill" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#eab308" stopOpacity="0.18" />
                        <stop offset="100%" stopColor="#eab308" stopOpacity="0.02" />
                    </linearGradient>
                </defs>

                <line x1="0" y1={height} x2="800" y2={height} stroke="#374151" strokeWidth="1" strokeDasharray="4 4" />

                <polygon points={buyHoldArea} fill="url(#bhFill)" />
                <polyline points={buyHoldPoints} fill="none" stroke="#eab308" strokeWidth="1.5" strokeOpacity="0.7" />

                <polygon points={area} fill="url(#eqFill)" />
                <polyline points={points} fill="none" stroke={isPositive ? '#22c55e' : '#ef4444'} strokeWidth="2.5" />
            </svg>

            <div className="mt-2 flex items-center gap-4 text-xs">
                <span className="flex items-center gap-1.5 text-gray-400">
                    <span className="h-0.5 w-4 rounded bg-green-500" />
                    Strategy
                </span>
                <span className="flex items-center gap-1.5 text-gray-400">
                    <span className="h-0.5 w-4 rounded bg-yellow-500" />
                    Buy &amp; Hold
                </span>
                <span className="ml-auto flex items-center gap-3">
                    <span className={`font-medium ${isPositive ? 'text-green-400' : 'text-red-400'}`}>
                        {strategyGain >= 0 ? '+' : ''}{strategyGain.toFixed(0)}
                    </span>
                    <span className="text-gray-500">vs</span>
                    <span className={holdGain >= 0 ? 'text-yellow-500' : 'text-red-400'}>
                        {holdGain >= 0 ? '+' : ''}{holdGain.toFixed(0)}
                    </span>
                </span>
            </div>
        </div>
    );
}