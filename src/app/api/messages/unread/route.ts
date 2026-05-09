import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";

export async function GET() {
    try {
        const session = await getServerSession(authOptions);
        if (!session) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const [count, messages] = await prisma.$transaction([
            prisma.message.count({
                where: { isRead: false },
            }),
            prisma.message.findMany({
                where: { isRead: false },
                orderBy: { createdAt: "desc" },
                take: 5,
            })
        ]);

        return NextResponse.json({ count, messages });
    } catch (error) {
        return NextResponse.json({ error: "Failed to fetch unread info" }, { status: 500 });
    }
}
