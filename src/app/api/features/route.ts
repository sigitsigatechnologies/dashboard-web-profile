import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";

export async function GET() {
    try {
        const features = await prisma.feature.findMany({
            orderBy: { order: "asc" },
        });
        return NextResponse.json(features);
    } catch (error) {
        return NextResponse.json({ error: "Failed to fetch features" }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const session = await getServerSession(authOptions);
        if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

        const body = await request.json();
        const feature = await prisma.feature.create({
            data: body,
        });
        return NextResponse.json(feature);
    } catch (error) {
        return NextResponse.json({ error: "Failed to create feature" }, { status: 500 });
    }
}
