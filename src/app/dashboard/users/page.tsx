"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Card, CardContent } from "@/components/ui/Card";
import { Plus, Search, Pencil, Trash2, Shield } from "lucide-react";
import { UserForm } from "@/components/dashboard/UserForm";
import toast from "react-hot-toast";
import { formatDate } from "@/lib/utils";

export default function UsersDashboardPage() {
    const [users, setUsers] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [query, setQuery] = useState("");
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [editingUser, setEditingUser] = useState<any>(null);

    const fetchUsers = async () => {
        setLoading(true);
        try {
            const response = await fetch(`/api/users?query=${query}`);
            const data = await response.json();
            if (response.ok) {
                setUsers(data);
            } else {
                toast.error(data.error || "Failed to fetch users");
            }
        } catch (error) {
            toast.error("An error occurred while fetching users");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, [query]);

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure you want to delete this user?")) return;

        try {
            const response = await fetch(`/api/users/${id}`, { method: "DELETE" });
            if (response.ok) {
                toast.success("User deleted successfully");
                fetchUsers();
            } else {
                const data = await response.json();
                toast.error(data.error || "Failed to delete user");
            }
        } catch (error) {
            toast.error("An error occurred");
        }
    };

    const filteredUsers = users;

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">User Management</h1>
                    <p className="text-muted-foreground">Manage administrative and standard user accounts.</p>
                </div>
                <Button onClick={() => { setEditingUser(null); setIsFormOpen(true); }}>
                    <Plus className="mr-2 h-4 w-4" /> Add User
                </Button>
            </div>

            <div className="flex items-center gap-4">
                <div className="relative flex-1 max-w-sm">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                        placeholder="Search by name or email..."
                        className="pl-9"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                    />
                </div>
            </div>

            {isFormOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
                    <UserForm
                        initialData={editingUser}
                        onSuccess={() => {
                            setIsFormOpen(false);
                            setEditingUser(null);
                            fetchUsers();
                            toast.success(editingUser ? "User updated" : "User added");
                        }}
                        onCancel={() => {
                            setIsFormOpen(false);
                            setEditingUser(null);
                        }}
                    />
                </div>
            )}

            {loading ? (
                <div className="flex h-32 items-center justify-center">
                    <p>Loading users...</p>
                </div>
            ) : (
                <Card>
                    <CardContent className="p-0">
                        <div className="relative w-full overflow-auto">
                            <table className="w-full caption-bottom text-sm">
                                <thead className="[&_tr]:border-b">
                                    <tr className="border-b transition-colors hover:bg-muted/50">
                                        <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Name</th>
                                        <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Email</th>
                                        <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Role</th>
                                        <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Joined</th>
                                        <th className="h-12 px-4 text-right align-middle font-medium text-muted-foreground">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="[&_tr:last-child]:border-0">
                                    {filteredUsers.map((user) => (
                                        <tr key={user.id} className="border-b transition-colors hover:bg-muted/50">
                                            <td className="p-4 align-middle font-medium">{user.name || "N/A"}</td>
                                            <td className="p-4 align-middle">{user.email}</td>
                                            <td className="p-4 align-middle">
                                                <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${user.role === "ADMIN" ? "bg-purple-100 text-purple-800" : "bg-blue-100 text-blue-800"
                                                    }`}>
                                                    {user.role}
                                                </span>
                                            </td>
                                            <td className="p-4 align-middle">{formatDate(user.createdAt)}</td>
                                            <td className="p-4 align-middle text-right">
                                                <div className="flex justify-end gap-2">
                                                    <Button variant="ghost" size="icon" onClick={() => { setEditingUser(user); setIsFormOpen(true); }}>
                                                        <Pencil className="h-4 w-4" />
                                                    </Button>
                                                    <Button variant="ghost" size="icon" className="text-red-600" onClick={() => handleDelete(user.id)}>
                                                        <Trash2 className="h-4 w-4" />
                                                    </Button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                    {filteredUsers.length === 0 && (
                                        <tr>
                                            <td colSpan={5} className="p-8 text-center text-muted-foreground">
                                                No users found.
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
