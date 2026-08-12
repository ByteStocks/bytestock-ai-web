'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { StrategyDefinition } from "@/lib/strategies/types";

interface StrategyCardProps {
    strategy: StrategyDefinition;
    isActive: boolean;
    onSelect: (id: string) => void;
}

export function StrategyCard({ strategy, isActive, onSelect }: StrategyCardProps) {
    return (
        <Card
            className={`bg-gray-800/40 border transition-all duration-200 ${
                isActive
                    ? 'border-yellow-500/70 ring-1 ring-yellow-500/30'
                    : 'border-gray-700 hover:border-yellow-500/40'
            }`}
        >
            <CardHeader className="pb-3">
                <div className="flex items-start justify-between gap-2">
                    <CardTitle className="text-base font-medium text-gray-100">{strategy.name}</CardTitle>
                    <Badge className="bg-gray-700 text-gray-300 shrink-0">{strategy.category}</Badge>
                </div>
                <CardDescription className="line-clamp-3 leading-snug">{strategy.description}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="flex flex-wrap gap-1.5">
                    {strategy.tags.map((tag) => (
                        <span key={tag} className="rounded bg-gray-800 px-2 py-0.5 text-xs text-gray-400">
                            {tag}
                        </span>
                    ))}
                </div>
                <Button
                    variant={isActive ? 'default' : 'outline'}
                    onClick={() => onSelect(strategy.id)}
                    className={`w-full ${
                        isActive
                            ? 'bg-yellow-500 text-yellow-900 hover:bg-yellow-400'
                            : 'border-gray-600 text-gray-200 hover:border-yellow-500 hover:text-yellow-400'
                    }`}
                >
                    {isActive ? 'Selected' : 'Backtest'}
                </Button>
            </CardContent>
        </Card>
    );
}