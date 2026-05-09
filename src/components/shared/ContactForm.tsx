"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Send } from "lucide-react";
import toast from "react-hot-toast";
import { useLanguage } from "@/context/LanguageContext";

export function ContactForm() {
    const { t } = useLanguage();
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

            toast.success(t("contact.success") || "Message sent successfully!");
            setFormData({ name: "", email: "", phone: "", subject: "", body: "" });
        } catch (error) {
            toast.error(t("contact.error") || "Failed to send message.");
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { id, value } = e.target;
        setFormData((prev) => ({ ...prev, [id]: value }));
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div className="space-y-4">
                    <label className="text-xs font-black uppercase tracking-[0.3em] text-slate-900 ml-1">{t("contact.form.name")}</label>
                    <Input 
                        id="name" 
                        value={formData.name} 
                        onChange={handleChange} 
                        placeholder="e.g. Alexander Graham" 
                        className="h-16 px-8 rounded-2xl border-2 border-slate-100 bg-white focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all text-lg font-medium text-slate-900"
                        required 
                    />
                </div>
                <div className="space-y-4">
                    <label className="text-xs font-black uppercase tracking-[0.3em] text-slate-900 ml-1">{t("contact.form.email")}</label>
                    <Input 
                        id="email" 
                        type="email" 
                        value={formData.email} 
                        onChange={handleChange} 
                        placeholder="name@email.com" 
                        className="h-16 px-8 rounded-2xl border-2 border-slate-100 bg-white focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all text-lg font-medium text-slate-900"
                        required 
                    />
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div className="space-y-4">
                    <label className="text-xs font-black uppercase tracking-[0.3em] text-slate-900 ml-1">Phone Number</label>
                    <Input 
                        id="phone" 
                        value={formData.phone} 
                        onChange={handleChange} 
                        placeholder="+1 (555) 000-0000" 
                        className="h-16 px-8 rounded-2xl border-2 border-slate-100 bg-white focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all text-lg font-medium text-slate-900"
                    />
                </div>
                <div className="space-y-4">
                    <label className="text-xs font-black uppercase tracking-[0.3em] text-slate-900 ml-1">{t("contact.form.subject")}</label>
                    <Input 
                        id="subject" 
                        value={formData.subject} 
                        onChange={handleChange} 
                        placeholder="How can we help?" 
                        className="h-16 px-8 rounded-2xl border-2 border-slate-100 bg-white focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all text-lg font-medium text-slate-900"
                        required 
                    />
                </div>
            </div>
            <div className="space-y-4">
                <label className="text-xs font-black uppercase tracking-[0.3em] text-slate-900 ml-1">{t("contact.form.message")}</label>
                <textarea
                    id="body"
                    value={formData.body}
                    onChange={handleChange}
                    className="flex min-h-[250px] w-full rounded-[2rem] border-2 border-slate-100 bg-white px-8 py-6 text-lg font-medium placeholder:text-slate-400 focus-visible:outline-none focus-visible:border-primary focus-visible:ring-4 focus-visible:ring-primary/10 transition-all text-slate-900"
                    placeholder="Describe your inquiry in detail..."
                    required
                ></textarea>
            </div>
            <Button type="submit" size="lg" className="w-full h-24 rounded-[2.5rem] text-2xl font-black shadow-2xl shadow-primary/20 group bg-slate-900 text-white hover:bg-primary hover:text-slate-900 transition-all duration-500" disabled={loading}>
                {loading ? t("common.loading") : t("contact.form.send")}
                <Send className="ml-6 h-8 w-8 group-hover:translate-x-3 group-hover:-translate-y-3 transition-transform" />
            </Button>
        </form>
    );
}
