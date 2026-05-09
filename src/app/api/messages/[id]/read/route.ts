import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";

export async function PUT(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const session = await getServerSession(authOptions);
        if (!session) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const { id } = await params;

        const message = await prisma.message.update({
            where: { id },
            data: { isRead: true },
        });

        return NextResponse.json(message);
    } catch (error) {
        return NextResponse.json({ error: "Failed to mark message as read" }, { status: 500 });
    }
}
