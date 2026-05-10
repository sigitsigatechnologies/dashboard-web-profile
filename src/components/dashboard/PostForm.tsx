"use client";

import { useState } from "react";
import Image from "next/image";
import { getDirectImageUrl } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { X } from "lucide-react";

interface PostFormProps {
    initialData?: any;
    onSuccess: () => void;
    onCancel: () => void;
}

export function PostForm({ initialData, onSuccess, onCancel }: PostFormProps) {
    const [loading, setLoading] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [formData, setFormData] = useState({
        title: initialData?.title || "",
        slug: initialData?.slug || "",
        content: initialData?.content || "",
        featuredImage: initialData?.featuredImage || "",
        category: initialData?.category || "General",
        published: initialData?.published !== undefined ? initialData.published : true,
    });

    const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        // Limit size to 1MB for Base64 stability in DB
        if (file.size > 1024 * 1024) {
            alert("File too large. Please use an image under 1MB.");
            return;
        }

        setUploading(true);
        const reader = new FileReader();
        reader.onloadend = () => {
            const base64String = reader.result as string;
            setFormData(prev => ({ ...prev, featuredImage: base64String }));
            setUploading(false);
        };
        reader.onerror = () => {
            alert("Failed to read file");
            setUploading(false);
        };
        reader.readAsDataURL(file);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const url = initialData
                ? `/api/posts/${initialData.id}`
                : "/api/posts";
            const method = initialData ? "PUT" : "POST";

            const response = await fetch(url, {
                method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                onSuccess();
            } else {
                const data = await response.json();
                alert(data.error || "Something went wrong");
            }
        } catch (error) {
            alert("Failed to save post");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Card className="w-full max-w-4xl mx-auto max-h-[90vh] overflow-y-auto">
            <CardHeader className="flex flex-row items-center justify-between sticky top-0 bg-background z-10 border-b">
                <CardTitle>{initialData ? "Edit Post" : "Create New Post"}</CardTitle>
                <Button variant="ghost" size="icon" onClick={onCancel}>
                    <X className="h-4 w-4" />
                </Button>
            </CardHeader>
            <CardContent className="pt-6">
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Title</label>
                        <Input
                            required
                            value={formData.title}
                            onChange={(e) => {
                                const title = e.target.value;
                                const slug = title.toLowerCase().replace(/ /g, "-").replace(/[^\w-]+/g, "");
                                setFormData({ ...formData, title, slug: initialData ? formData.slug : slug });
                            }}
                            placeholder="Post title..."
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Slug</label>
                            <Input
                                required
                                value={formData.slug}
                                onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                                placeholder="post-url-slug"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Category</label>
                            <select
                                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                                value={formData.category}
                                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                            >
                                <option value="General">General</option>
                                <option value="Academic">Academic</option>
                                <option value="Sports">Sports</option>
                                <option value="Achievement">Achievement</option>
                                <option value="Event">Event</option>
                            </select>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium">Featured Image</label>
                        <div className="flex gap-2">
                            <Input
                                type="file"
                                accept="image/*"
                                onChange={handleFileUpload}
                                className="flex-1"
                            />
                            {uploading && <div className="flex items-center text-sm text-muted-foreground">Uploading...</div>}
                        </div>
                        <Input
                            value={formData.featuredImage}
                            onChange={(e) => setFormData({ ...formData, featuredImage: e.target.value })}
                            placeholder="Or enter image URL..."
                        />
                        {formData.featuredImage && (
                            <div className="mt-2 relative aspect-video w-full rounded-xl overflow-hidden border bg-slate-50">
                                <Image
                                    src={getDirectImageUrl(formData.featuredImage)}
                                    alt="Preview"
                                    fill
                                    className="object-cover"
                                    unoptimized
                                />
                            </div>
                        )}
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium">Content</label>
                        <textarea
                            className="flex min-h-[300px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                            required
                            value={formData.content}
                            onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                            placeholder="Write your post content here..."
                        />
                    </div>

                    <div className="flex items-center space-x-2">
                        <input
                            type="checkbox"
                            id="published"
                            checked={formData.published}
                            onChange={(e) => setFormData({ ...formData, published: e.target.checked })}
                            className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                        />
                        <label htmlFor="published" className="text-sm font-medium">
                            Published
                        </label>
                    </div>

                    <div className="flex justify-end gap-3 pt-6 border-t mt-6">
                        <Button type="button" variant="outline" onClick={onCancel}>
                            Cancel
                        </Button>
                        <Button type="submit" disabled={loading}>
                            {loading ? "Saving..." : initialData ? "Update Post" : "Create Post"}
                        </Button>
                    </div>
                </form>
            </CardContent>
        </Card>
    );
}
