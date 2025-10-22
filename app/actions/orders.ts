'use server';

import { db } from '@/lib/db';

export async function getOrders() {
    try {
        const orders = await db.order.findMany({
            include: {
                items: {
                    include: {
                        product: true
                    }
                }
            },
            orderBy: { createdAt: 'desc' },
        });
        return orders;
    } catch (error) {
        console.error('Error fetching orders:', error);
        return [];
    }
}

export async function getOrderById(orderId: string) {
    try {
        const order = await db.order.findUnique({
            where: { id: orderId },
            include: {
                items: {
                    include: {
                        product: true
                    }
                }
            }
        });
        return order;
    } catch (error) {
        console.error('Error fetching order:', error);
        return null;
    }
}

export async function numberOfOrders() {
    try {
        return await db.order.count({
            where: {
                status: 'COMPLETED'
            }
        });
    } catch (error) {
        console.error('Error fetching order count:', error);
        return 0;
    }
}

export async function getTotalSuccessfulOrderAmount() {
    try {
        const result = await db.order.aggregate({
            _sum: {
                totalAmount: true,
            },
            where: {
                status: 'COMPLETED'
            }
        });

        return result._sum.totalAmount || 0;
    } catch (error) {
        console.error('Error calculating successful order amount:', error);
        return 0;
    }
}

export async function getPendingOrdersCount() {
    try {
        return await db.order.count({
            where: {
                status: 'PENDING'
            }
        });
    } catch (error) {
        console.error('Error fetching pending orders:', error);
        return 0;
    }
}

export async function getOrdersByStatus(status: 'PENDING' | 'PROCESSING' | 'COMPLETED' | 'FAILED' | 'CANCELLED') {
    try {
        const orders = await db.order.findMany({
            where: { status },
            include: {
                items: {
                    include: {
                        product: true
                    }
                }
            },
            orderBy: { createdAt: 'desc' },
        });
        return orders;
    } catch (error) {
        console.error('Error fetching orders by status:', error);
        return [];
    }
}