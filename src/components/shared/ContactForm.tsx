"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Send } from "lucide-react";
import toast from "react-hot-toast";

export function ContactForm() {
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        subject: "",
        body: "",
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await fetch("/api/messages", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            if (!response.ok) throw new Error("Failed to send message");

            toast.success("Message sent successfully! We will get back to you soon.");
            setFormData({ name: "", email: "", phone: "", subject: "", body: "" });
        } catch (error) {
            toast.error("Failed to send message. Please try again later.");
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { id, value } = e.target;
        setFormData((prev) => ({ ...prev, [id]: value }));
    };

    return (
        <Card className="shadow-xl">
            <CardContent className="p-8">
                <h3 className="text-2xl font-bold mb-6">Send us a Message</h3>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Full Name</label>
                            <Input id="name" value={formData.name} onChange={handleChange} placeholder="Enter your name" required />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Email Address</label>
                            <Input id="email" type="email" value={formData.email} onChange={handleChange} placeholder="Enter your email" required />
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Phone Number</label>
                            <Input id="phone" value={formData.phone} onChange={handleChange} placeholder="Enter your phone" />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Subject</label>
                            <Input id="subject" value={formData.subject} onChange={handleChange} placeholder="Message subject" required />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Message</label>
                        <textarea
                            id="body"
                            value={formData.body}
                            onChange={handleChange}
                            className="flex min-h-[150px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                            placeholder="Type your message here..."
                            required
                        ></textarea>
                    </div>
                    <Button type="submit" size="lg" className="w-full md:w-auto px-10" disabled={loading}>
                        {loading ? "Sending..." : "Send Message"}
                        <Send className="ml-2 h-4 w-4" />
                    </Button>
                </form>
            </CardContent>
        </Card>
    );
}
