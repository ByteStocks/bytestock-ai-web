'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { formatDistanceToNow } from 'date-fns';

interface MarketCardProps {
    market: {
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
        yes_bid?: number;
        yes_ask?: number;
        no_bid?: number;
        no_ask?: number;
    };
    platform: 'polymarket' | 'kalshi';
}

export function MarketCard({ market, platform }: MarketCardProps) {
    const title = market.question || market.title || 'Untitled Market';
    const ticker = market.ticker || market.id;
    const volume = market.volume || 0;
    const endDate = market.end_date || market.close_time;
    const isActive = platform === 'polymarket' ? market.active : market.status === 'open';

    const currentPrice = platform === 'polymarket'
        ? market.outcome_prices?.[0]
        : market.last_price;

    const formatPrice = (price?: number) => {
        if (price === undefined || price === null) return '--';
        return platform === 'polymarket'
            ? `${(price * 100).toFixed(1)}¢`
            : `$${price.toFixed(2)}`;
    };

    const formatVolume = (vol: number) => {
        if (vol >= 1_000_000) return `$${(vol / 1_000_000).toFixed(1)}M`;
        if (vol >= 1_000) return `$${(vol / 1_000).toFixed(1)}K`;
        return `$${vol.toFixed(0)}`;
    };

    return (
        <Card className="bg-gray-800/50 border-gray-700 hover:border-yellow-500/50 transition-all duration-200">
            <CardHeader className="pb-3">
                <div className="flex items-start justify-between gap-2">
                    <CardTitle className="text-base font-medium text-gray-100 line-clamp-2">
                        {title}
                    </CardTitle>
                    <Badge
                        variant={isActive ? 'default' : 'secondary'}
                        className={isActive ? 'bg-green-500/20 text-green-400' : 'bg-gray-600 text-gray-300'}
                    >
                        {isActive ? 'Active' : 'Closed'}
                    </Badge>
                </div>
            </CardHeader>
            <CardContent className="space-y-3">
                <p className="text-sm text-gray-400 line-clamp-2">
                    {market.description}
                </p>

                <div className="flex items-center justify-between">
                    <div>
                        <span className="text-xs text-gray-500">Current Price</span>
                        <p className="text-lg font-semibold text-yellow-500">
                            {formatPrice(currentPrice)}
                        </p>
                    </div>
                    <div className="text-right">
                        <span className="text-xs text-gray-500">Volume</span>
                        <p className="text-sm font-medium text-gray-300">
                            {formatVolume(volume)}
                        </p>
                    </div>
                </div>

                {platform === 'kalshi' && market.yes_bid !== undefined && (
                    <div className="flex justify-between text-xs text-gray-500">
                        <span>Yes: {formatPrice(market.yes_bid)} / {formatPrice(market.yes_ask)}</span>
                        <span>No: {formatPrice(market.no_bid)} / {formatPrice(market.no_ask)}</span>
                    </div>
                )}

                {endDate && (
                    <div className="flex items-center text-xs text-gray-500">
                        <span>Ends {formatDistanceToNow(new Date(endDate), { addSuffix: true })}</span>
                    </div>
                )}

                <div className="flex items-center gap-2 text-xs text-gray-500">
                    <Badge variant="outline" className="border-gray-600 text-gray-400">
                        {platform === 'polymarket' ? 'Polymarket' : 'Kalshi'}
                    </Badge>
                    {ticker && (
                        <span className="text-gray-500 truncate">{ticker}</span>
                    )}
                </div>
            </CardContent>
        </Card>
    );
}
