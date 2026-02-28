"use client";

import { useState } from "react";
import Image from "next/image";
import { getDirectImageUrl } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { X } from "lucide-react";

interface TeacherFormProps {
    initialData?: any;
    onSuccess: () => void;
    onCancel: () => void;
}

export function TeacherForm({ initialData, onSuccess, onCancel }: TeacherFormProps) {
    const [loading, setLoading] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [formData, setFormData] = useState({
        name: initialData?.name || "",
        position: initialData?.position || "",
        photo: initialData?.photo || "",
        bio: initialData?.bio || "",
    });

    const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setUploading(true);
        const uploadFormData = new FormData();
        uploadFormData.append("file", file);

        try {
            const response = await fetch("/api/upload", {
                method: "POST",
                body: uploadFormData,
            });
            const data = await response.json();
            if (data.url) {
                setFormData(prev => ({ ...prev, photo: data.url }));
            }
        } catch (error) {
            console.error("Upload failed:", error);
            alert("Upload failed");
        } finally {
            setUploading(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const url = initialData
                ? `/api/teachers/${initialData.id}`
                : "/api/teachers";
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
            alert("Failed to save teacher");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Card className="w-full max-w-2xl mx-auto max-h-[90vh] overflow-y-auto">
            <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>{initialData ? "Edit Teacher" : "Add New Teacher"}</CardTitle>
                <Button variant="ghost" size="icon" onClick={onCancel}>
                    <X className="h-4 w-4" />
                </Button>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Name</label>
                        <Input
                            required
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            placeholder="e.g. Dr. Jane Smith"
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Position</label>
                        <Input
                            required
                            value={formData.position}
                            onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                            placeholder="e.g. Principal / Science Teacher"
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Photo</label>
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
                            value={formData.photo}
                            onChange={(e) => setFormData({ ...formData, photo: e.target.value })}
                            placeholder="Or enter photo URL..."
                        />
                        {formData.photo && (
                            <div className="mt-2 h-24 w-24 rounded-full border bg-slate-50 overflow-hidden relative">
                                <Image
                                    src={getDirectImageUrl(formData.photo)}
                                    alt="Preview"
                                    fill
                                    className="object-cover"
                                    unoptimized
                                />
                            </div>
                        )}
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Bio</label>
                        <textarea
                            className="flex min-h-[100px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                            value={formData.bio}
                            onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                            placeholder="Brief biography..."
                        />
                    </div>
                    <div className="flex justify-end gap-3 pt-4">
                        <Button type="button" variant="outline" onClick={onCancel}>
                            Cancel
                        </Button>
                        <Button type="submit" disabled={loading}>
                            {loading ? "Saving..." : initialData ? "Update Teacher" : "Add Teacher"}
                        </Button>
                    </div>
                </form>
            </CardContent>
        </Card>
    );
}
