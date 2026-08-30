import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth/server';
import { getMarkets, searchMarkets, getTrendingMarkets } from '@/lib/actions/polymarket.actions';

export async function GET(request: NextRequest) {
    try {
        const { userId } = await auth();
        if (!userId) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const { searchParams } = new URL(request.url);
        const query = searchParams.get('q');
        const trending = searchParams.get('trending');
        const limit = parseInt(searchParams.get('limit') || '20');
        const active = searchParams.get('active');

        let markets;

        if (trending === 'true') {
            markets = await getTrendingMarkets();
        } else if (query) {
            markets = await searchMarkets(query);
        } else {
            markets = await getMarkets({
                limit,
                active: active !== null ? active === 'true' : undefined,
            });
        }

        return NextResponse.json({ markets });
    } catch (error) {
        console.error('Error fetching Polymarket data:', error);
        return NextResponse.json(
            { error: 'Failed to fetch markets' },
            { status: 500 }
        );
    }
}
