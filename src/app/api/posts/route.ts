import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const query = searchParams.get("query");

        const posts = await prisma.post.findMany({
            where: query
                ? {
                    OR: [
                        { title: { contains: query, mode: "insensitive" } },
                        { content: { contains: query, mode: "insensitive" } },
                    ],
                }
                : {},
            orderBy: { createdAt: "desc" },
        });

        return NextResponse.json(posts);
    } catch (error) {
        return NextResponse.json({ error: "Failed to fetch posts" }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const session = await getServerSession(authOptions);
        if (!session) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const body = await request.json();
        const slug = body.title
            .toLowerCase()
            .replace(/ /g, "-")
            .replace(/[^\w-]+/g, "");

        const post = await prisma.post.create({
            data: {
                title: body.title,
                slug: body.slug || `${slug}-${Math.random().toString(36).substring(2, 7)}`,
                content: body.content,
                featuredImage: body.featuredImage,
                author: session.user?.name || "Admin",
                category: body.category || "General",
                published: body.published !== undefined ? body.published : true,
            },
        });

        return NextResponse.json(post);
    } catch (error) {
        return NextResponse.json({ error: "Failed to create post" }, { status: 500 });
    }
}
