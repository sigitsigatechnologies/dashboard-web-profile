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
        const agenda = await prisma.agenda.findUnique({
            where: { id: paramId },
        });

        if (!agenda) {
            return NextResponse.json({ error: "Agenda not found" }, { status: 404 });
        }

        return NextResponse.json(agenda);
    } catch (error) {
        return NextResponse.json({ error: "Failed to fetch agenda" }, { status: 500 });
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
        const agenda = await prisma.agenda.update({
            where: { id: paramId },
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
        return NextResponse.json({ error: "Failed to update agenda" }, { status: 500 });
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

        await prisma.agenda.delete({
            where: { id: paramId },
        });

        return NextResponse.json({ message: "Agenda deleted successfully" });
    } catch (error) {
        return NextResponse.json({ error: "Failed to delete agenda" }, { status: 500 });
    }
}
