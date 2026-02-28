import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";

export async function GET() {
    try {
        const profile = await prisma.schoolProfile.findFirst();
        return NextResponse.json(profile);
    } catch (error) {
        return NextResponse.json({ error: "Failed to fetch profile" }, { status: 500 });
    }
}

export async function PUT(request: Request) {
    try {
        const session = await getServerSession(authOptions);
        if (!session) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const { id, updatedAt, createdAt, ...updateData } = await request.json();
        const existing = await prisma.schoolProfile.findFirst();

        const profile = existing
            ? await prisma.schoolProfile.update({
                where: { id: existing.id },
                data: updateData,
            })
            : await prisma.schoolProfile.create({
                data: updateData,
            });

        return NextResponse.json(profile);
    } catch (error) {
        return NextResponse.json({ error: "Failed to update profile" }, { status: 500 });
    }
}
