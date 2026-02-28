"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Card, CardContent } from "@/components/ui/Card";
import { Plus, Search, Pencil, Trash2, Calendar } from "lucide-react";
import { AgendaForm } from "@/components/dashboard/AgendaForm";
import toast from "react-hot-toast";
import { formatDate, getDirectImageUrl } from "@/lib/utils";
import Image from "next/image";

export default function AgendaDashboardPage() {
    const [agenda, setAgenda] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [query, setQuery] = useState("");
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [editingItem, setEditingItem] = useState<any>(null);

    const fetchAgenda = async () => {
        setLoading(true);
        try {
            const response = await fetch(`/api/agenda?query=${query}`);
            const data = await response.json();
            setAgenda(data);
        } catch (error) {
            toast.error("Failed to fetch agenda");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAgenda();
    }, [query]);

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure you want to delete this event?")) return;

        try {
            const response = await fetch(`/api/agenda/${id}`, { method: "DELETE" });
            if (response.ok) {
                toast.success("Event deleted successfully");
                fetchAgenda();
            } else {
                toast.error("Failed to delete event");
            }
        } catch (error) {
            toast.error("An error occurred");
        }
    };

    const handleEdit = (item: any) => {
        setEditingItem(item);
        setIsFormOpen(true);
    };

    const handleSuccess = () => {
        setIsFormOpen(false);
        setEditingItem(null);
        fetchAgenda();
        toast.success(editingItem ? "Event updated" : "Event added");
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Agenda</h1>
                    <p className="text-muted-foreground">Manage school events and academic calendar.</p>
                </div>
                <Button onClick={() => setIsFormOpen(true)}>
                    <Plus className="mr-2 h-4 w-4" /> Add Event
                </Button>
            </div>

            <div className="flex items-center gap-4">
                <div className="relative flex-1 max-w-sm">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                        placeholder="Search events..."
                        className="pl-9"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                    />
                </div>
            </div>

            {isFormOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
                    <AgendaForm
                        initialData={editingItem}
                        onSuccess={handleSuccess}
                        onCancel={() => {
                            setIsFormOpen(false);
                            setEditingItem(null);
                        }}
                    />
                </div>
            )}

            {loading ? (
                <div className="flex h-32 items-center justify-center">
                    <p>Loading agenda...</p>
                </div>
            ) : (
                <Card>
                    <CardContent className="p-0">
                        <div className="relative w-full overflow-auto">
                            <table className="w-full caption-bottom text-sm">
                                <thead className="[&_tr]:border-b">
                                    <tr className="border-b transition-colors hover:bg-muted/50">
                                        <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Event</th>
                                        <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Date</th>
                                        <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Location</th>
                                        <th className="h-12 px-4 text-right align-middle font-medium text-muted-foreground">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="[&_tr:last-child]:border-0">
                                    {agenda.map((item) => (
                                        <tr key={item.id} className="border-b transition-colors hover:bg-muted/50">
                                            <td className="p-4 align-middle font-medium">
                                                <div className="flex items-center gap-3">
                                                    <div className="h-10 w-10 flex items-center justify-center rounded-md bg-primary/10 text-primary overflow-hidden relative border">
                                                        {item.image ? (
                                                            <Image
                                                                src={getDirectImageUrl(item.image)}
                                                                alt=""
                                                                fill
                                                                className="object-cover"
                                                                unoptimized
                                                            />
                                                        ) : (
                                                            <Calendar className="h-5 w-5" />
                                                        )}
                                                    </div>
                                                    <span>{item.title}</span>
                                                </div>
                                            </td>
                                            <td className="p-4 align-middle">{formatDate(item.date)}</td>
                                            <td className="p-4 align-middle max-w-[200px] truncate">{item.location}</td>
                                            <td className="p-4 align-middle text-right">
                                                <div className="flex justify-end gap-2">
                                                    <Button variant="ghost" size="icon" onClick={() => handleEdit(item)}>
                                                        <Pencil className="h-4 w-4" />
                                                    </Button>
                                                    <Button variant="ghost" size="icon" className="text-red-600" onClick={() => handleDelete(item.id)}>
                                                        <Trash2 className="h-4 w-4" />
                                                    </Button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                    {agenda.length === 0 && (
                                        <tr>
                                            <td colSpan={4} className="p-8 text-center text-muted-foreground">
                                                No events found.
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
