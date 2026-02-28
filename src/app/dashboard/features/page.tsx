"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Trophy, Plus, Trash2, Edit2, GripVertical } from "lucide-react";
import toast from "react-hot-toast";

interface Feature {
    id: string;
    title: string;
    description: string;
    icon: string;
    order: number;
}

export default function FeaturesDashboard() {
    const [features, setFeatures] = useState<Feature[]>([]);
    const [loading, setLoading] = useState(true);
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [editingFeature, setEditingFeature] = useState<Feature | null>(null);
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        icon: "BookOpen",
        order: 0,
    });

    const fetchFeatures = async () => {
        try {
            const response = await fetch("/api/features");
            const data = await response.json();
            setFeatures(data);
        } catch (error) {
            toast.error("Failed to fetch features");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchFeatures();
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const method = editingFeature ? "PUT" : "POST";
        const url = editingFeature ? `/api/features/${editingFeature.id}` : "/api/features";

        try {
            const response = await fetch(url, {
                method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                toast.success(editingFeature ? "Feature updated" : "Feature created");
                setIsFormOpen(false);
                setEditingFeature(null);
                setFormData({ title: "", description: "", icon: "BookOpen", order: 0 });
                fetchFeatures();
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
            const response = await fetch(`/api/features/${id}`, { method: "DELETE" });
            if (response.ok) {
                toast.success("Feature deleted");
                fetchFeatures();
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
                    <h1 className="text-3xl font-bold tracking-tight text-slate-900">Homepage Features</h1>
                    <p className="text-muted-foreground mt-1">Manage the core highlights shown on the home page.</p>
                </div>
                <Button onClick={() => { setIsFormOpen(true); setEditingFeature(null); }} className="rounded-full shadow-lg">
                    <Plus className="mr-2 h-4 w-4" /> Add Feature
                </Button>
            </div>

            {isFormOpen && (
                <Card className="border-none shadow-xl ring-1 ring-blue-100 bg-card">
                    <CardHeader>
                        <CardTitle>{editingFeature ? "Edit Feature" : "Create New Feature"}</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="text-sm font-bold">Title</label>
                                    <Input
                                        required
                                        value={formData.title}
                                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-bold">Icon (Lucide Name)</label>
                                    <Input
                                        value={formData.icon}
                                        onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                                        placeholder="BookOpen, Users, Trophy, Star..."
                                    />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-bold">Description</label>
                                <textarea
                                    className="w-full rounded-xl border border-input bg-background px-4 py-3 text-sm"
                                    rows={3}
                                    required
                                    value={formData.description}
                                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                />
                            </div>
                            <div className="flex justify-end gap-3">
                                <Button variant="outline" type="button" onClick={() => setIsFormOpen(false)}>Cancel</Button>
                                <Button type="submit">Save Feature</Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {features.map((feature) => (
                    <Card key={feature.id} className="group relative hover:shadow-xl transition-all duration-300 border-none bg-white shadow-sm ring-1 ring-slate-100">
                        <CardContent className="p-6">
                            <div className="flex items-start justify-between">
                                <div className="flex gap-4">
                                    <div className="w-12 h-12 rounded-2xl bg-blue-100 text-blue-600 flex items-center justify-center shrink-0">
                                        <Trophy className="h-6 w-6" />
                                    </div>
                                    <div>
                                        <h3 className="font-black text-lg text-slate-800">{feature.title}</h3>
                                        <p className="text-sm text-slate-500 mt-1 leading-relaxed">{feature.description}</p>
                                    </div>
                                </div>
                                <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <Button variant="ghost" size="icon" onClick={() => {
                                        setEditingFeature(feature);
                                        setFormData({
                                            title: feature.title,
                                            description: feature.description,
                                            icon: feature.icon,
                                            order: feature.order
                                        });
                                        setIsFormOpen(true);
                                    }}>
                                        <Edit2 className="h-4 w-4" />
                                    </Button>
                                    <Button variant="ghost" size="icon" className="text-red-600" onClick={() => handleDelete(feature.id)}>
                                        <Trash2 className="h-4 w-4" />
                                    </Button>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
}
