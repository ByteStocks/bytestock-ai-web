const KALSHI_API_URL = 'https://api.elections.kalshi.com/trade-api/v2';

export interface KalshiMarket {
    ticker: string;
    event_ticker: string;
    title: string;
    subtitle: string;
    description: string;
    category: string;
    status: 'open' | 'closed' | 'settled';
    open_time: string;
    close_time: string;
    expiration_time: string;
    settlement_time: string;
    tick_size: number;
    min_size: number;
    max_size: number;
    last_price: number;
    volume: number;
    open_interest: number;
    yes_ask: number;
    yes_bid: number;
    no_ask: number;
    no_bid: number;
    result: 'yes' | 'no' | null;
}

export interface KalshiEvent {
    event_ticker: string;
    title: string;
    subtitle: string;
    category: string;
    markets: KalshiMarket[];
    status: 'open' | 'closed';
    mutually_exclusive: boolean;
}

export interface KalshiOrderBook {
    market: string;
    yes: Array<{
        price: number;
        count: number;
        quantity: number;
    }>;
    no: Array<{
        price: number;
        count: number;
        quantity: number;
    }>;
}

export interface KalshiPosition {
    ticker: string;
    event_ticker: string;
    title: string;
    position: number;
    market_exposure: number;
    cash_on_hand: number;
    realized_pnl: number;
    realized_plus_education_pnl: number;
}

export interface KalshiTrade {
    taker_side: 'yes' | 'no';
    taker_action: 'buy' | 'sell';
    taker_count: number;
    taker_price: number;
    created_time: string;
    ticker: string;
    count: number;
    avg_price: number;
    realized_pnl: number;
}

let authToken: string | null = null;

async function getAuthToken(): Promise<string> {
    if (authToken) return authToken;

    const email = process.env.KALSHI_EMAIL;
    const password = process.env.KALSHI_PASSWORD;

    if (!email || !password) {
        throw new Error('Kalshi credentials not configured');
    }

    const response = await fetch(`${KALSHI_API_URL}/auth/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
        throw new Error('Failed to authenticate with Kalshi');
    }

    const data = await response.json();
    authToken = data.token;
    return authToken!;
}

async function kalshiRequest<T>(endpoint: string, options?: RequestInit): Promise<T> {
    const token = await getAuthToken();

    const response = await fetch(`${KALSHI_API_URL}${endpoint}`, {
        ...options,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
            ...options?.headers,
        },
    });

    if (!response.ok) {
        const error = await response.json().catch(() => ({}));
        throw new Error(error.message || `Kalshi API error: ${response.status}`);
    }

    return response.json();
}

export async function getMarkets(params?: {
    limit?: number;
    cursor?: string;
    event_ticker?: string;
    series_ticker?: string;
    status?: 'open' | 'closed' | 'settled';
    category?: string;
    has_volume?: boolean;
    close_time_before?: string;
    close_time_after?: string;
}): Promise<{ markets: KalshiMarket[]; cursor?: string }> {
    const searchParams = new URLSearchParams();
    if (params?.limit) searchParams.set('limit', params.limit.toString());
    if (params?.cursor) searchParams.set('cursor', params.cursor);
    if (params?.event_ticker) searchParams.set('event_ticker', params.event_ticker);
    if (params?.series_ticker) searchParams.set('series_ticker', params.series_ticker);
    if (params?.status) searchParams.set('status', params.status);
    if (params?.category) searchParams.set('category', params.category);
    if (params?.has_volume !== undefined) searchParams.set('has_volume', params.has_volume.toString());
    if (params?.close_time_before) searchParams.set('close_time_before', params.close_time_before);
    if (params?.close_time_after) searchParams.set('close_time_after', params.close_time_after);

    return kalshiRequest(`/markets?${searchParams.toString()}`);
}

export async function getMarketByTicker(ticker: string): Promise<KalshiMarket> {
    const response = await kalshiRequest<{ market: KalshiMarket }>(`/markets/${ticker}`);
    return response.market;
}

export async function getOrderBook(ticker: string): Promise<KalshiOrderBook> {
    return kalshiRequest(`/markets/${ticker}/orderbook`);
}

export async function getEvents(params?: {
    limit?: number;
    cursor?: string;
    event_ticker?: string;
    series_ticker?: string;
    status?: 'open' | 'closed';
    category?: string;
}): Promise<{ events: KalshiEvent[]; cursor?: string }> {
    const searchParams = new URLSearchParams();
    if (params?.limit) searchParams.set('limit', params.limit.toString());
    if (params?.cursor) searchParams.set('cursor', params.cursor);
    if (params?.event_ticker) searchParams.set('event_ticker', params.event_ticker);
    if (params?.series_ticker) searchParams.set('series_ticker', params.series_ticker);
    if (params?.status) searchParams.set('status', params.status);
    if (params?.category) searchParams.set('category', params.category);

    return kalshiRequest(`/events?${searchParams.toString()}`);
}

export async function searchMarkets(query: string): Promise<KalshiMarket[]> {
    const response = await getMarkets({ limit: 20, status: 'open' });
    return response.markets.filter(
        (market) =>
            market.title.toLowerCase().includes(query.toLowerCase()) ||
            market.description.toLowerCase().includes(query.toLowerCase()) ||
            market.ticker.toLowerCase().includes(query.toLowerCase())
    );
}

export async function getTrendingMarkets(): Promise<KalshiMarket[]> {
    const response = await getMarkets({
        limit: 10,
        status: 'open',
        has_volume: true,
    });
    return response.markets.sort((a, b) => b.volume - a.volume);
}

export async function getCategories(): Promise<string[]> {
    const response = await kalshiRequest<{ categories: string[] }>('/categories');
    return response.categories;
}

export async function getPositions(): Promise<KalshiPosition[]> {
    const response = await kalshiRequest<{ market_positions: KalshiPosition[] }>('/positions');
    return response.market_positions;
}

export async function getTrades(params?: {
    limit?: number;
    cursor?: string;
    ticker?: string;
    event_ticker?: string;
}): Promise<KalshiTrade[]> {
    const searchParams = new URLSearchParams();
    if (params?.limit) searchParams.set('limit', params.limit.toString());
    if (params?.cursor) searchParams.set('cursor', params.cursor);
    if (params?.ticker) searchParams.set('ticker', params.ticker);
    if (params?.event_ticker) searchParams.set('event_ticker', params.event_ticker);

    const response = await kalshiRequest<{ trades: KalshiTrade[] }>(`/trades?${searchParams.toString()}`);
    return response.trades;
}
