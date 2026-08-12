import { NextRequest, NextResponse } from 'next/server';
import { Webhook } from 'svix';
import { headers } from 'next/headers';
import { handleUserCreated } from '@/lib/actions/auth.actions';

const webhookSecret = process.env.CLERK_WEBHOOK_SECRET;

export async function POST(request: NextRequest) {
    try {
        if (!webhookSecret) {
            throw new Error('CLERK_WEBHOOK_SECRET is not configured');
        }

        const headerPayload = await headers();
        const svixId = headerPayload.get('svix-id');
        const svixTimestamp = headerPayload.get('svix-timestamp');
        const svixSignature = headerPayload.get('svix-signature');

        if (!svixId || !svixTimestamp || !svixSignature) {
            return NextResponse.json({ error: 'Missing webhook headers' }, { status: 400 });
        }

        const payload = await request.json();
        const body = JSON.stringify(payload);

        const wh = new Webhook(webhookSecret);
        const evt = wh.verify(body, {
            'svix-id': svixId,
            'svix-timestamp': svixTimestamp,
            'svix-signature': svixSignature,
        }) as { type: string; data: any };

        if (evt.type === 'user.created') {
            const { email_addresses, first_name, last_name } = evt.data;
            const email = email_addresses?.[0]?.email_address;
            const name = first_name || last_name || email?.split('@')[0] || 'User';

            await handleUserCreated({
                email,
                name,
                country: 'US',
                investmentGoals: 'Growth',
                riskTolerance: 'Medium',
                preferredIndustry: 'Technology',
            });
        }

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Webhook error:', error);
        return NextResponse.json(
            { error: 'Webhook error' },
            { status: 400 }
        );
    }
}
