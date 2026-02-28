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

        const messages = await prisma.message.findMany({
            orderBy: { createdAt: "desc" },
        });

        return NextResponse.json(messages);
    } catch (error) {
        return NextResponse.json({ error: "Failed to fetch messages" }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const message = await prisma.message.create({
            data: {
                name: body.name,
                email: body.email,
                phone: body.phone,
                subject: body.subject,
                body: body.body,
            },
        });

        return NextResponse.json(message);
    } catch (error) {
        return NextResponse.json({ error: "Failed to send message" }, { status: 500 });
    }
}
