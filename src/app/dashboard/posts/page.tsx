"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Card, CardContent } from "@/components/ui/Card";
import { Plus, Search, Pencil, Trash2, FileText, ExternalLink } from "lucide-react";
import { PostForm } from "@/components/dashboard/PostForm";
import toast from "react-hot-toast";
import { formatDate, getDirectImageUrl } from "@/lib/utils";
import Link from "next/link";
import Image from "next/image";
import { Badge } from "@/components/ui/Badge";

export default function PostsDashboardPage() {
    const [posts, setPosts] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [query, setQuery] = useState("");
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [editingPost, setEditingPost] = useState<any>(null);

    const fetchPosts = async () => {
        setLoading(true);
        try {
            const response = await fetch(`/api/posts?query=${query}`);
            const data = await response.json();
            setPosts(data);
        } catch (error) {
            toast.error("Failed to fetch posts");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPosts();
    }, [query]);

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure you want to delete this post?")) return;

        try {
            const response = await fetch(`/api/posts/${id}`, { method: "DELETE" });
            if (response.ok) {
                toast.success("Post deleted successfully");
                fetchPosts();
            } else {
                toast.error("Failed to delete post");
            }
        } catch (error) {
            toast.error("An error occurred");
        }
    };

    const handleEdit = (post: any) => {
        setEditingPost(post);
        setIsFormOpen(true);
    };

    const handleSuccess = () => {
        setIsFormOpen(false);
        setEditingPost(null);
        fetchPosts();
        toast.success(editingPost ? "Post updated" : "Post created");
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Posts</h1>
                    <p className="text-muted-foreground">Manage school news, articles, and announcements.</p>
                </div>
                <Button onClick={() => setIsFormOpen(true)}>
                    <Plus className="mr-2 h-4 w-4" /> Create Post
                </Button>
            </div>

            <div className="flex items-center gap-4">
                <div className="relative flex-1 max-w-sm">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                        placeholder="Search posts..."
                        className="pl-9"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                    />
                </div>
            </div>

            {isFormOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
                    <PostForm
                        initialData={editingPost}
                        onSuccess={handleSuccess}
                        onCancel={() => {
                            setIsFormOpen(false);
                            setEditingPost(null);
                        }}
                    />
                </div>
            )}

            {loading ? (
                <div className="flex h-32 items-center justify-center">
                    <p>Loading posts...</p>
                </div>
            ) : (
                <Card>
                    <CardContent className="p-0">
                        <div className="relative w-full overflow-auto">
                            <table className="w-full caption-bottom text-sm">
                                <thead className="[&_tr]:border-b">
                                    <tr className="border-b transition-colors hover:bg-muted/50">
                                        <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Title</th>
                                        <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Category</th>
                                        <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Status</th>
                                        <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Date</th>
                                        <th className="h-12 px-4 text-right align-middle font-medium text-muted-foreground">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="[&_tr:last-child]:border-0">
                                    {posts.map((post) => (
                                        <tr key={post.id} className="border-b transition-colors hover:bg-muted/50">
                                            <td className="p-4 align-middle font-medium">
                                                <div className="flex items-center gap-3">
                                                    {post.featuredImage ? (
                                                        <div className="h-10 w-16 relative rounded overflow-hidden border">
                                                            <Image
                                                                src={getDirectImageUrl(post.featuredImage)}
                                                                alt=""
                                                                fill
                                                                className="object-cover"
                                                                unoptimized
                                                            />
                                                        </div>
                                                    ) : (
                                                        <div className="h-10 w-16 rounded bg-muted flex items-center justify-center">
                                                            <FileText className="h-4 w-4 text-muted-foreground" />
                                                        </div>
                                                    )}
                                                    <div className="flex flex-col">
                                                        <span>{post.title}</span>
                                                        <span className="text-xs text-muted-foreground flex items-center gap-1">
                                                            /{post.slug}
                                                        </span>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="p-4 align-middle">
                                                <Badge variant="secondary">{post.category}</Badge>
                                            </td>
                                            <td className="p-4 align-middle">
                                                {post.published ? (
                                                    <Badge variant="success">Published</Badge>
                                                ) : (
                                                    <Badge variant="outline">Draft</Badge>
                                                )}
                                            </td>
                                            <td className="p-4 align-middle">{formatDate(post.createdAt)}</td>
                                            <td className="p-4 align-middle text-right">
                                                <div className="flex justify-end gap-2">
                                                    <Link href={`/news/${post.slug}`} target="_blank">
                                                        <Button variant="ghost" size="icon">
                                                            <ExternalLink className="h-4 w-4" />
                                                        </Button>
                                                    </Link>
                                                    <Button variant="ghost" size="icon" onClick={() => handleEdit(post)}>
                                                        <Pencil className="h-4 w-4" />
                                                    </Button>
                                                    <Button variant="ghost" size="icon" className="text-red-600" onClick={() => handleDelete(post.id)}>
                                                        <Trash2 className="h-4 w-4" />
                                                    </Button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                    {posts.length === 0 && (
                                        <tr>
                                            <td colSpan={5} className="p-8 text-center text-muted-foreground">
                                                No posts found.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </CardContent>
                </Card>
            )}
        </div>
    );
}
