const POLYMARKET_API_URL = 'https://clob.polymarket.com';
const POLYMARKET_DATA_API_URL = 'https://gamma-api.polymarket.com';

export interface PolymarketMarket {
    id: string;
    question: string;
    description: string;
    end_date: string;
    liquidity: number;
    volume: number;
    active: boolean;
    closed: boolean;
    outcomes: string[];
    outcome_prices: number[];
    condition_id: string;
    tokens: Array<{
        token_id: string;
        outcome: string;
        price: number;
    }>;
}

export interface PolymarketEvent {
    id: string;
    title: string;
    slug: string;
    markets: PolymarketMarket[];
    active: boolean;
    closed: boolean;
}

export interface PolymarketOrderBook {
    market_id: string;
    bids: Array<{
        price: number;
        size: number;
    }>;
    asks: Array<{
        price: number;
        size: number;
    }>;
}

export interface PolymarketPosition {
    market_id: string;
    outcome: string;
    size: number;
    average_price: number;
    unrealized_pnl: number;
}

const getAuthHeaders = () => {
    const apiKey = process.env.POLYMARKET_API_KEY;
    const secret = process.env.POLYMARKET_SECRET;
    const passphrase = process.env.POLYMARKET_PASSPHRASE;

    return {
        'Content-Type': 'application/json',
        'POLY_API_KEY': apiKey || '',
        'POLY_SECRET': secret || '',
        'POLY_PASSPHRASE': passphrase || '',
    };
};

export async function getMarkets(params?: {
    limit?: number;
    offset?: number;
    active?: boolean;
    closed?: boolean;
    tag?: string;
}): Promise<PolymarketMarket[]> {
    const searchParams = new URLSearchParams();
    if (params?.limit) searchParams.set('limit', params.limit.toString());
    if (params?.offset) searchParams.set('offset', params.offset.toString());
    if (params?.active !== undefined) searchParams.set('active', params.active.toString());
    if (params?.closed !== undefined) searchParams.set('closed', params.closed.toString());
    if (params?.tag) searchParams.set('tag', params.tag);

    const response = await fetch(
        `${POLYMARKET_DATA_API_URL}/markets?${searchParams.toString()}`,
        { next: { revalidate: 60 } }
    );

    if (!response.ok) {
        throw new Error('Failed to fetch Polymarket markets');
    }

    return response.json();
}

export async function getMarketById(marketId: string): Promise<PolymarketMarket> {
    const response = await fetch(
        `${POLYMARKET_DATA_API_URL}/markets/${marketId}`,
        { next: { revalidate: 30 } }
    );

    if (!response.ok) {
        throw new Error(`Failed to fetch market ${marketId}`);
    }

    return response.json();
}

export async function getOrderBook(tokenId: string): Promise<PolymarketOrderBook> {
    const response = await fetch(
        `${POLYMARKET_API_URL}/book?token_id=${tokenId}`,
        { next: { revalidate: 10 } }
    );

    if (!response.ok) {
        throw new Error(`Failed to fetch order book for token ${tokenId}`);
    }

    return response.json();
}

export async function searchMarkets(query: string): Promise<PolymarketMarket[]> {
    const response = await fetch(
        `${POLYMARKET_DATA_API_URL}/markets?_q=${encodeURIComponent(query)}`,
        { next: { revalidate: 60 } }
    );

    if (!response.ok) {
        throw new Error('Failed to search Polymarket markets');
    }

    return response.json();
}

export async function getTrendingMarkets(): Promise<PolymarketMarket[]> {
    const response = await fetch(
        `${POLYMARKET_DATA_API_URL}/markets?active=true&order=volume&ascending=false&limit=10`,
        { next: { revalidate: 300 } }
    );

    if (!response.ok) {
        throw new Error('Failed to fetch trending markets');
    }

    return response.json();
}

export async function getMarketEvents(): Promise<PolymarketEvent[]> {
    const response = await fetch(
        `${POLYMARKET_DATA_API_URL}/events?active=true&limit=10`,
        { next: { revalidate: 300 } }
    );

    if (!response.ok) {
        throw new Error('Failed to fetch market events');
    }

    return response.json();
}
