'use server';

import { db } from '@/lib/db';

export async function getTickets() {
    try {
        const purchases = await db.ticketPurchase.findMany({
            orderBy: { createdAt: 'desc' },
        });
        return purchases;
    } catch (error) {
        console.error('Error fetching ticket purchases:', error);
        return [];
    }
}


export async function numberofTickets() {

    try {
        return await db.ticketPurchase.count();

    } catch (error) {
        console.error('Error fetching ticket purchases:', error);
        return [];


    }
}

export async function getTotalSuccessfulAmount() {
    try {
        const result = await db.ticketPurchase.aggregate({
            _sum: {
                amount: true,
            },
            where: {
                paymentStatus: 'COMPLETED'
            }
        });
        
        return result._sum.amount || 0;
    } catch (error) {
        console.error('Error calculating successful ticket amount:', error);
        return 0;
    }
}
