import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { getMarkets, searchMarkets, getTrendingMarkets, getEvents, getCategories } from '@/lib/actions/kalshi.actions';

export async function GET(request: NextRequest) {
    try {
        const { userId } = await auth();
        if (!userId) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const { searchParams } = new URL(request.url);
        const query = searchParams.get('q');
        const trending = searchParams.get('trending');
        const events = searchParams.get('events');
        const categories = searchParams.get('categories');
        const limit = parseInt(searchParams.get('limit') || '20');
        const status = searchParams.get('status') as 'open' | 'closed' | 'settled' | undefined;

        if (categories === 'true') {
            const cats = await getCategories();
            return NextResponse.json({ categories: cats });
        }

        if (events === 'true') {
            const eventsData = await getEvents({ limit, status: status as 'open' | 'closed' | undefined });
            return NextResponse.json({ events: eventsData.events });
        }

        let markets;

        if (trending === 'true') {
            markets = await getTrendingMarkets();
        } else if (query) {
            markets = await searchMarkets(query);
        } else {
            const response = await getMarkets({ limit, status });
            markets = response.markets;
        }

        return NextResponse.json({ markets });
    } catch (error) {
        console.error('Error fetching Kalshi data:', error);
        return NextResponse.json(
            { error: 'Failed to fetch markets' },
            { status: 500 }
        );
    }
}
