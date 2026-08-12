'use server';

import { inngest } from "@/lib/inngest/client";

export const handleUserCreated = async (data: {
    email: string;
    name: string;
    country: string;
    investmentGoals: string;
    riskTolerance: string;
    preferredIndustry: string;
}) => {
    try {
        await inngest.send({
            name: 'app/user.created',
            data
        });
        return { success: true };
    } catch (e) {
        console.log('Failed to send user created event', e);
        return { success: false, error: 'Failed to send event' };
    }
}
