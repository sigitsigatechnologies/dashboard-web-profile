"use client";

import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/Card";
import { Mail, Phone, Calendar, User, ChevronRight } from "lucide-react";
import toast from "react-hot-toast";
import { formatDate } from "@/lib/utils";
import { Badge } from "@/components/ui/Badge";

export default function MessagesPage() {
    const [messages, setMessages] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedMessage, setSelectedMessage] = useState<any>(null);

    const fetchMessages = async () => {
        setLoading(true);
        try {
            const response = await fetch("/api/messages");
            const data = await response.json();
            setMessages(data);
        } catch (error) {
            toast.error("Failed to fetch messages");
        } finally {
            setLoading(false);
        }
    };

    const markAsRead = async (id: string) => {
        try {
            await fetch(`/api/messages/${id}/read`, { method: "PUT" });
            setMessages(prev => prev.map(msg => 
                msg.id === id ? { ...msg, isRead: true } : msg
            ));
        } catch (error) {
            console.error("Failed to mark as read:", error);
        }
    };

    const handleSelectMessage = (msg: any) => {
        setSelectedMessage(msg);
        if (!msg.isRead) {
            markAsRead(msg.id);
        }
    };

    useEffect(() => {
        fetchMessages();
    }, []);

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Messages</h1>
                <p className="text-muted-foreground">Inquiries and messages from the contact form.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="md:col-span-1">
                    <CardContent className="p-0">
                        <div className="flex flex-col h-[600px] overflow-y-auto">
                            {loading ? (
                                <div className="p-4 text-center">Loading...</div>
                            ) : messages.length === 0 ? (
                                <div className="p-4 text-center text-muted-foreground">No messages yet.</div>
                            ) : (
                                messages.map((msg) => (
                                    <button
                                        key={msg.id}
                                        onClick={() => handleSelectMessage(msg)}
                                        className={`flex flex-col gap-1 p-4 text-left border-b hover:bg-muted/50 transition-colors relative ${selectedMessage?.id === msg.id ? "bg-accent" : ""
                                            } ${!msg.isRead ? "bg-primary/5" : ""}`}
                                    >
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-2">
                                                {!msg.isRead && <div className="h-2 w-2 rounded-full bg-primary shrink-0" />}
                                                <span className={`text-sm ${!msg.isRead ? "font-bold" : "font-semibold"}`}>{msg.name}</span>
                                            </div>
                                            <span className="text-[10px] text-muted-foreground">{formatDate(msg.createdAt)}</span>
                                        </div>
                                        <span className={`text-xs truncate ${!msg.isRead ? "font-semibold" : "font-medium"}`}>{msg.subject}</span>
                                        <span className="text-xs text-muted-foreground truncate">{msg.body}</span>
                                    </button>
                                ))
                            )}
                        </div>
                    </CardContent>
                </Card>

                <Card className="md:col-span-2">
                    <CardContent className="h-[600px] p-6">
                        {selectedMessage ? (
                            <div className="space-y-6 h-full overflow-y-auto">
                                <div className="flex items-center justify-between border-b pb-4">
                                    <div className="flex items-center gap-3">
                                        <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                                            {selectedMessage.name.charAt(0)}
                                        </div>
                                        <div>
                                            <h2 className="font-bold">{selectedMessage.name}</h2>
                                            <span className="text-sm text-muted-foreground">{selectedMessage.email}</span>
                                        </div>
                                    </div>
                                    <Badge variant="outline">{formatDate(selectedMessage.createdAt)}</Badge>
                                </div>

                                <div className="space-y-4">
                                    <div>
                                        <h3 className="text-xs font-bold uppercase text-muted-foreground mb-1">Subject</h3>
                                        <p className="font-medium">{selectedMessage.subject || "No Subject"}</p>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="flex items-center gap-2 text-sm">
                                            <Phone className="h-4 w-4 text-muted-foreground" />
                                            <span>{selectedMessage.phone || "No phone provided"}</span>
                                        </div>
                                        <div className="flex items-center gap-2 text-sm">
                                            <Mail className="h-4 w-4 text-muted-foreground" />
                                            <span>{selectedMessage.email}</span>
                                        </div>
                                    </div>

                                    <div className="pt-4 border-t">
                                        <h3 className="text-xs font-bold uppercase text-muted-foreground mb-2">Message Body</h3>
                                        <div className="bg-muted/30 rounded-lg p-4 text-sm leading-relaxed min-h-[200px] whitespace-pre-wrap">
                                            {selectedMessage.body}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="h-full flex flex-col items-center justify-center text-muted-foreground text-center space-y-2">
                                <Mail className="h-12 w-12 opacity-20" />
                                <p>Select a message to view details</p>
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
