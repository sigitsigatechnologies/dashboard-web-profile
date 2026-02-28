"use client";

import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { X } from "lucide-react";
import { formatDate, getDirectImageUrl } from "@/lib/utils";

interface AgendaFormProps {
    initialData?: any;
    onSuccess: () => void;
    onCancel: () => void;
}

export function AgendaForm({ initialData, onSuccess, onCancel }: AgendaFormProps) {
    const [loading, setLoading] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [formData, setFormData] = useState({
        title: initialData?.title || "",
        description: initialData?.description || "",
        date: initialData?.date ? new Date(initialData.date).toISOString().split('T')[0] : "",
        location: initialData?.location || "",
        image: initialData?.image || "",
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
                setFormData(prev => ({ ...prev, image: data.url }));
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
                ? `/api/agenda/${initialData.id}`
                : "/api/agenda";
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
            alert("Failed to save agenda");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Card className="w-full max-w-2xl mx-auto max-h-[90vh] overflow-y-auto">
            <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>{initialData ? "Edit Agenda" : "Add New Agenda"}</CardTitle>
                <Button variant="ghost" size="icon" onClick={onCancel}>
                    <X className="h-4 w-4" />
                </Button>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Title</label>
                        <Input
                            required
                            value={formData.title}
                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                            placeholder="e.g. Annual School Festival"
                        />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Date</label>
                            <Input
                                type="date"
                                required
                                value={formData.date}
                                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Location</label>
                            <Input
                                required
                                value={formData.location}
                                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                                placeholder="e.g. School Main Hall"
                            />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Description</label>
                        <textarea
                            className="flex min-h-[100px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                            required
                            value={formData.description}
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                            placeholder="Full event details..."
                        />
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
                            value={formData.image}
                            onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                            placeholder="Or enter image URL..."
                        />
                        {formData.image && (
                            <div className="mt-2 relative aspect-video w-full rounded-xl overflow-hidden border bg-slate-50">
                                <Image
                                    src={getDirectImageUrl(formData.image)}
                                    alt="Preview"
                                    fill
                                    className="object-cover"
                                    unoptimized
                                />
                            </div>
                        )}
                    </div>
                    <div className="flex justify-end gap-3 pt-4">
                        <Button type="button" variant="outline" onClick={onCancel}>
                            Cancel
                        </Button>
                        <Button type="submit" disabled={loading}>
                            {loading ? "Saving..." : initialData ? "Update Agenda" : "Add Agenda"}
                        </Button>
                    </div>
                </form>
            </CardContent>
        </Card>
    );
}
