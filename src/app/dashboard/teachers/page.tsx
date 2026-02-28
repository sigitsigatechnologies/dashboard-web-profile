"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Card, CardContent } from "@/components/ui/Card";
import { Plus, Search, Pencil, Trash2 } from "lucide-react";
import { TeacherForm } from "@/components/dashboard/TeacherForm";
import toast from "react-hot-toast";
import { getDirectImageUrl } from "@/lib/utils";
import Image from "next/image";

export default function TeachersPage() {
    const [teachers, setTeachers] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [query, setQuery] = useState("");
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [editingTeacher, setEditingTeacher] = useState<any>(null);

    const fetchTeachers = async () => {
        setLoading(true);
        try {
            const response = await fetch(`/api/teachers?query=${query}`);
            const data = await response.json();
            setTeachers(data);
        } catch (error) {
            toast.error("Failed to fetch teachers");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTeachers();
    }, [query]);

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure you want to delete this teacher?")) return;

        try {
            const response = await fetch(`/api/teachers/${id}`, { method: "DELETE" });
            if (response.ok) {
                toast.success("Teacher deleted successfully");
                fetchTeachers();
            } else {
                toast.error("Failed to delete teacher");
            }
        } catch (error) {
            toast.error("An error occurred");
        }
    };

    const handleEdit = (teacher: any) => {
        setEditingTeacher(teacher);
        setIsFormOpen(true);
    };

    const handleSuccess = () => {
        setIsFormOpen(false);
        setEditingTeacher(null);
        fetchTeachers();
        toast.success(editingTeacher ? "Teacher updated" : "Teacher added");
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Teachers</h1>
                    <p className="text-muted-foreground">Manage school teaching staff and faculty.</p>
                </div>
                <Button onClick={() => setIsFormOpen(true)}>
                    <Plus className="mr-2 h-4 w-4" /> Add Teacher
                </Button>
            </div>

            <div className="flex items-center gap-4">
                <div className="relative flex-1 max-w-sm">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                        placeholder="Search teachers..."
                        className="pl-9"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                    />
                </div>
            </div>

            {isFormOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
                    <TeacherForm
                        initialData={editingTeacher}
                        onSuccess={handleSuccess}
                        onCancel={() => {
                            setIsFormOpen(false);
                            setEditingTeacher(null);
                        }}
                    />
                </div>
            )}

            {loading ? (
                <div className="flex h-32 items-center justify-center">
                    <p>Loading teachers...</p>
                </div>
            ) : (
                <Card>
                    <CardContent className="p-0">
                        <div className="relative w-full overflow-auto">
                            <table className="w-full caption-bottom text-sm">
                                <thead className="[&_tr]:border-b">
                                    <tr className="border-b transition-colors hover:bg-muted/50">
                                        <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Name</th>
                                        <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Position</th>
                                        <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Bio</th>
                                        <th className="h-12 px-4 text-right align-middle font-medium text-muted-foreground">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="[&_tr:last-child]:border-0">
                                    {teachers.map((teacher) => (
                                        <tr key={teacher.id} className="border-b transition-colors hover:bg-muted/50">
                                            <td className="p-4 align-middle font-medium">
                                                <div className="flex items-center gap-3">
                                                    <div className="h-10 w-10 rounded-full bg-accent overflow-hidden border relative">
                                                        {teacher.photo ? (
                                                            <Image
                                                                src={getDirectImageUrl(teacher.photo)}
                                                                alt={teacher.name}
                                                                fill
                                                                className="object-cover"
                                                                unoptimized
                                                            />
                                                        ) : (
                                                            <div className="h-full w-full flex items-center justify-center text-muted-foreground">
                                                                {teacher.name.charAt(0)}
                                                            </div>
                                                        )}
                                                    </div>
                                                    <span>{teacher.name}</span>
                                                </div>
                                            </td>
                                            <td className="p-4 align-middle">{teacher.position}</td>
                                            <td className="p-4 align-middle max-w-[300px] truncate text-muted-foreground">
                                                {teacher.bio || "-"}
                                            </td>
                                            <td className="p-4 align-middle text-right">
                                                <div className="flex justify-end gap-2">
                                                    <Button variant="ghost" size="icon" onClick={() => handleEdit(teacher)}>
                                                        <Pencil className="h-4 w-4" />
                                                    </Button>
                                                    <Button variant="ghost" size="icon" className="text-red-600" onClick={() => handleDelete(teacher.id)}>
                                                        <Trash2 className="h-4 w-4" />
                                                    </Button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                    {teachers.length === 0 && (
                                        <tr>
                                            <td colSpan={4} className="p-8 text-center text-muted-foreground">
                                                No teachers found.
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
