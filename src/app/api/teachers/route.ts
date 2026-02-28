import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const query = searchParams.get("query");

        const teachers = await prisma.teacher.findMany({
            where: query
                ? {
                    OR: [
                        { name: { contains: query, mode: "insensitive" } },
                        { position: { contains: query, mode: "insensitive" } },
                    ],
                }
                : {},
            orderBy: { createdAt: "desc" },
        });

        return NextResponse.json(teachers);
    } catch (error) {
        return NextResponse.json({ error: "Failed to fetch teachers" }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const session = await getServerSession(authOptions);
        if (!session) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const body = await request.json();
        const teacher = await prisma.teacher.create({
            data: {
                name: body.name,
                photo: body.photo,
                position: body.position,
                bio: body.bio,
            },
        });

        return NextResponse.json(teacher);
    } catch (error) {
        return NextResponse.json({ error: "Failed to create teacher" }, { status: 500 });
    }
}
