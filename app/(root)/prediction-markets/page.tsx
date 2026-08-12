'use client';

import { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { MarketList } from '@/components/prediction-markets/MarketList';
import { Search } from 'lucide-react';

type Platform = 'polymarket' | 'kalshi';

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

export default function PredictionMarketsPage() {
    const [platform, setPlatform] = useState<Platform>('polymarket');
    const [markets, setMarkets] = useState<Market[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [activeTab, setActiveTab] = useState<'trending' | 'all'>('trending');

    const fetchMarkets = async () => {
        setIsLoading(true);
        try {
            const params = new URLSearchParams();
            if (activeTab === 'trending') {
                params.set('trending', 'true');
            }
            if (searchQuery) {
                params.set('q', searchQuery);
            }

            const response = await fetch(`/api/${platform}?${params.toString()}`);
            const data = await response.json();
            setMarkets(data.markets || []);
        } catch (error) {
            console.error('Error fetching markets:', error);
            setMarkets([]);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchMarkets();
    }, [platform, activeTab]);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        fetchMarkets();
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-white">Prediction Markets</h1>
                    <p className="text-gray-400">
                        Track and explore prediction markets from Polymarket and Kalshi
                    </p>
                </div>

                <div className="flex items-center gap-2">
                    <Button
                        variant={platform === 'polymarket' ? 'default' : 'outline'}
                        onClick={() => setPlatform('polymarket')}
                        className={platform === 'polymarket' ? 'bg-yellow-500 text-yellow-900' : ''}
                    >
                        Polymarket
                    </Button>
                    <Button
                        variant={platform === 'kalshi' ? 'default' : 'outline'}
                        onClick={() => setPlatform('kalshi')}
                        className={platform === 'kalshi' ? 'bg-yellow-500 text-yellow-900' : ''}
                    >
                        Kalshi
                    </Button>
                </div>
            </div>

            <form onSubmit={handleSearch} className="flex gap-2">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                        placeholder="Search markets..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-10 bg-gray-800 border-gray-700 text-white"
                    />
                </div>
                <Button type="submit" className="bg-yellow-500 text-yellow-900">
                    Search
                </Button>
            </form>

            <div className="flex gap-4 border-b border-gray-700 pb-2">
                <button
                    onClick={() => setActiveTab('trending')}
                    className={`pb-2 px-4 text-sm font-medium transition-colors ${
                        activeTab === 'trending'
                            ? 'text-yellow-500 border-b-2 border-yellow-500'
                            : 'text-gray-400 hover:text-gray-300'
                    }`}
                >
                    Trending
                </button>
                <button
                    onClick={() => setActiveTab('all')}
                    className={`pb-2 px-4 text-sm font-medium transition-colors ${
                        activeTab === 'all'
                            ? 'text-yellow-500 border-b-2 border-yellow-500'
                            : 'text-gray-400 hover:text-gray-300'
                    }`}
                >
                    All Markets
                </button>
            </div>

            <MarketList markets={markets} platform={platform} isLoading={isLoading} />
        </div>
    );
}
