'use client';

import { useState } from "react";
import { STRATEGY_CATALOG } from "@/lib/strategies/catalog";
import { StrategyCard } from "@/components/strategies/StrategyCard";
import { BacktestPanel } from "@/components/strategies/BacktestPanel";
import { PythonSandbox } from "@/components/strategies/PythonSandbox";
import { cn } from "@/lib/utils";
import { FlaskConical, Code2 } from "lucide-react";

type Tab = 'library' | 'sandbox';

export default function StrategiesPage() {
    const [tab, setTab] = useState<Tab>('library');
    const [selectedId, setSelectedId] = useState(STRATEGY_CATALOG[0].id);

    const selected = STRATEGY_CATALOG.find((s) => s.id === selectedId) ?? STRATEGY_CATALOG[0];

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-white">Strategy Lab</h1>
                    <p className="text-gray-400">Browse built-in trading strategies, backtest them, and practice Python with our coding sandbox.</p>
                </div>

                <div className="flex items-center gap-1 rounded-lg border border-gray-700 bg-gray-800/60 p-1">
                    <button
                        onClick={() => setTab('library')}
                        className={cn(
                            'inline-flex items-center gap-2 rounded-md px-4 py-1.5 text-sm font-medium transition-colors',
                            tab === 'library' ? 'bg-yellow-500 text-yellow-900' : 'text-gray-400 hover:text-gray-200'
                        )}
                    >
                        <FlaskConical className="h-4 w-4" />
                        Strategies
                    </button>
                    <button
                        onClick={() => setTab('sandbox')}
                        className={cn(
                            'inline-flex items-center gap-2 rounded-md px-4 py-1.5 text-sm font-medium transition-colors',
                            tab === 'sandbox' ? 'bg-yellow-500 text-yellow-900' : 'text-gray-400 hover:text-gray-200'
                        )}
                    >
                        <Code2 className="h-4 w-4" />
                        Python Sandbox
                    </button>
                </div>
            </div>

            {tab === 'sandbox' ? (
                <PythonSandbox />
            ) : (
                <div className="grid grid-cols-1 lg:grid-cols-[340px_1fr] gap-6">
                    <div>
                        <h2 className="mb-3 text-sm font-medium text-gray-300">Strategy Library</h2>
                        <div className="space-y-3">
                            {STRATEGY_CATALOG.map((s) => (
                                <StrategyCard key={s.id} strategy={s} isActive={s.id === selectedId} onSelect={setSelectedId} />
                            ))}
                        </div>
                    </div>

                    <div>
                        <h2 className="mb-3 text-sm font-medium text-gray-300">Backtest</h2>
                        <BacktestPanel key={selected.id} strategy={selected} />
                    </div>
                </div>
            )}
        </div>
    );
}