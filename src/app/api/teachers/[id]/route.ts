import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";

export async function GET(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id: paramId } = await params;
        const teacher = await prisma.teacher.findUnique({
            where: { id: paramId },
        });

        if (!teacher) {
            return NextResponse.json({ error: "Teacher not found" }, { status: 404 });
        }

        return NextResponse.json(teacher);
    } catch (error) {
        return NextResponse.json({ error: "Failed to fetch teacher" }, { status: 500 });
    }
}

export async function PUT(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id: paramId } = await params;
        const session = await getServerSession(authOptions);
        if (!session) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const body = await request.json();
        const teacher = await prisma.teacher.update({
            where: { id: paramId },
            data: {
                name: body.name,
                photo: body.photo,
                position: body.position,
                bio: body.bio,
            },
        });

        return NextResponse.json(teacher);
    } catch (error) {
        return NextResponse.json({ error: "Failed to update teacher" }, { status: 500 });
    }
}

export async function DELETE(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id: paramId } = await params;
        const session = await getServerSession(authOptions);
        if (!session) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        await prisma.teacher.delete({
            where: { id: paramId },
        });

        return NextResponse.json({ message: "Teacher deleted successfully" });
    } catch (error) {
        return NextResponse.json({ error: "Failed to delete teacher" }, { status: 500 });
    }
}
