"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Star, Plus, Trash2, Edit2, ImageIcon, Search } from "lucide-react";
import toast from "react-hot-toast";
import Image from "next/image";
import { getDirectImageUrl } from "@/lib/utils";

interface Facility {
    id: string;
    name: string;
    image: string;
    description: string | null;
    order: number;
}

export default function FacilitiesDashboard() {
    const [facilities, setFacilities] = useState<Facility[]>([]);
    const [loading, setLoading] = useState(true);
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [editingFacility, setEditingFacility] = useState<Facility | null>(null);
    const [formData, setFormData] = useState({
        name: "",
        image: "",
        description: "",
        order: 0,
    });
    const [query, setQuery] = useState("");
    const [uploading, setUploading] = useState(false);

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
            toast.error("Upload failed");
        } finally {
            setUploading(false);
        }
    };

    const fetchFacilities = async () => {
        try {
            const response = await fetch(`/api/facilities?query=${query}`);
            const data = await response.json();
            setFacilities(data);
        } catch (error) {
            toast.error("Failed to fetch facilities");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchFacilities();
    }, [query]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const method = editingFacility ? "PUT" : "POST";
        const url = editingFacility ? `/api/facilities/${editingFacility.id}` : "/api/facilities";

        try {
            const response = await fetch(url, {
                method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                toast.success(editingFacility ? "Facility updated" : "Facility created");
                setIsFormOpen(false);
                setEditingFacility(null);
                setFormData({ name: "", image: "", description: "", order: 0 });
                fetchFacilities();
            } else {
                toast.error("Something went wrong");
            }
        } catch (error) {
            toast.error("An error occurred");
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure?")) return;
        try {
            const response = await fetch(`/api/facilities/${id}`, { method: "DELETE" });
            if (response.ok) {
                toast.success("Facility deleted");
                fetchFacilities();
            }
        } catch (error) {
            toast.error("Failed to delete");
        }
    };

    if (loading) return <div className="p-8">Loading...</div>;

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-slate-900">School Facilities</h1>
                    <p className="text-muted-foreground mt-1">Manage infrastructure photos and descriptions shown on the profile page.</p>
                </div>
                <Button onClick={() => { setIsFormOpen(true); setEditingFacility(null); }} className="rounded-full shadow-lg">
                    <Plus className="mr-2 h-4 w-4" /> Add Facility
                </Button>
            </div>

            <div className="flex items-center gap-4">
                <div className="relative flex-1 max-w-sm">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                        placeholder="Search facilities..."
                        className="pl-9 rounded-xl"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                    />
                </div>
            </div>

            {isFormOpen && (
                <Card className="border-none shadow-xl ring-1 ring-indigo-100 bg-card">
                    <CardHeader>
                        <CardTitle>{editingFacility ? "Edit Facility" : "Add New Facility"}</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="text-sm font-bold">Facility Name</label>
                                    <Input
                                        required
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-bold">Facility Image</label>
                                    <div className="flex gap-2">
                                        <Input
                                            type="file"
                                            accept="image/*"
                                            onChange={handleFileUpload}
                                            className="flex-1"
                                        />
                                        {uploading && <div className="flex items-center text-sm text-muted-foreground whitespace-nowrap">Uploading...</div>}
                                    </div>
                                    <Input
                                        required
                                        value={formData.image}
                                        onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                                        placeholder="Or enter image URL..."
                                    />
                                    {formData.image && (
                                        <div className="mt-2 relative h-32 w-full rounded-xl overflow-hidden border bg-slate-50">
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
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-bold">Description (Optional)</label>
                                <textarea
                                    className="w-full rounded-xl border border-input bg-background px-4 py-3 text-sm"
                                    rows={2}
                                    value={formData.description}
                                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                />
                            </div>
                            <div className="flex justify-end gap-3">
                                <Button variant="outline" type="button" onClick={() => setIsFormOpen(false)}>Cancel</Button>
                                <Button type="submit">Save Facility</Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {facilities.map((facility) => (
                    <div key={facility.id} className="group flex flex-col bg-white rounded-[2rem] overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 ring-1 ring-slate-100">
                        <div className="relative h-48 w-full overflow-hidden">
                            <Image
                                src={getDirectImageUrl(facility.image)}
                                alt={facility.name}
                                fill
                                className="object-cover group-hover:scale-110 transition-transform duration-700"
                                unoptimized
                            />
                            <div className="absolute top-4 right-4 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                <Button variant="secondary" size="icon" className="h-8 w-8 rounded-full" onClick={() => {
                                    setEditingFacility(facility);
                                    setFormData({
                                        name: facility.name,
                                        image: facility.image,
                                        description: facility.description || "",
                                        order: facility.order
                                    });
                                    setIsFormOpen(true);
                                }}>
                                    <Edit2 className="h-3 w-3" />
                                </Button>
                                <Button variant="destructive" size="icon" className="h-8 w-8 rounded-full" onClick={() => handleDelete(facility.id)}>
                                    <Trash2 className="h-3 w-3" />
                                </Button>
                            </div>
                        </div>
                        <div className="p-6">
                            <h3 className="font-black text-lg text-slate-800 tracking-tight">{facility.name}</h3>
                            {facility.description && (
                                <p className="text-sm text-slate-500 mt-2 line-clamp-2 leading-relaxed italic">"{facility.description}"</p>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
