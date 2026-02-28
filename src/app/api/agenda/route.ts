import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const query = searchParams.get("query");

        const agenda = await prisma.agenda.findMany({
            where: query
                ? {
                    OR: [
                        { title: { contains: query, mode: "insensitive" } },
                        { location: { contains: query, mode: "insensitive" } },
                    ],
                }
                : {},
            orderBy: { date: "desc" },
        });

        return NextResponse.json(agenda);
    } catch (error) {
        return NextResponse.json({ error: "Failed to fetch agenda" }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const session = await getServerSession(authOptions);
        if (!session) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const body = await request.json();
        const agenda = await prisma.agenda.create({
            data: {
                title: body.title,
                description: body.description,
                date: new Date(body.date),
                location: body.location,
                image: body.image,
            },
        });

        return NextResponse.json(agenda);
    } catch (error) {
        return NextResponse.json({ error: "Failed to create agenda" }, { status: 500 });
    }
}
