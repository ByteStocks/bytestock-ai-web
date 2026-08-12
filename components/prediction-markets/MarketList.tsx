'use client';

import { MarketCard } from './MarketCard';

interface Market {
    id?: string;
    ticker?: string;
    question?: string;
    title?: string;
    description: string;
    end_date?: string;
    close_time?: string;
    volume?: number;
    active?: boolean;
    status?: string;
    outcome_prices?: number[];
    last_price?: number;
}

interface MarketListProps {
    markets: Market[];
    platform: 'polymarket' | 'kalshi';
    isLoading?: boolean;
}

export function MarketList({ markets, platform, isLoading }: MarketListProps) {
    if (isLoading) {
        return (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {Array.from({ length: 6 }).map((_, i) => (
                    <div
                        key={i}
                        className="h-48 bg-gray-800/50 rounded-lg animate-pulse"
                    />
                ))}
            </div>
        );
    }

    if (markets.length === 0) {
        return (
            <div className="text-center py-12">
                <p className="text-gray-400">No markets found</p>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {markets.map((market) => (
                <MarketCard
                    key={market.ticker || market.id}
                    market={market}
                    platform={platform}
                />
            ))}
        </div>
    );
}
