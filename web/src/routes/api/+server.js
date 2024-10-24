import { json } from '@sveltejs/kit';
import { fetchMessages } from '$lib/models/messages';

export async function GET() {
    try {
        try {
            const messages = await fetchMessages();
            return json(messages);
        } catch (error) {
            if (error instanceof Error) {
                return json({ error: 'Failed to fetch messages', details: error.message }, { status: 500 });
            } else {
                return json({ error: 'Failed to fetch messages', details: 'Unknown error' }, { status: 500 });
            }
        }
    } catch (error) {
        if (error instanceof Error) {
            return json({ error: 'Internal server error', details: error.message }, { status: 500 });
        } else {
            return json({ error: 'Internal server error', details: 'Unknown error' }, { status: 500 });
        }
    }
}