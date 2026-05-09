import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const query = searchParams.get("query");

        const facilities = await prisma.facility.findMany({
            where: query ? {
                OR: [
                    { name: { contains: query, mode: "insensitive" } },
                    { description: { contains: query, mode: "insensitive" } },
                ]
            } : {},
            orderBy: { order: "asc" },
        });
        return NextResponse.json(facilities);
    } catch (error) {
        return NextResponse.json({ error: "Failed to fetch facilities" }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const session = await getServerSession(authOptions);
        if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

        const body = await request.json();
        const facility = await prisma.facility.create({
            data: body,
        });
        return NextResponse.json(facility);
    } catch (error) {
        return NextResponse.json({ error: "Failed to create facility" }, { status: 500 });
    }
}
