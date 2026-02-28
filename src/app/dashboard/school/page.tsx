"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Building2, Save, Globe, Info, Phone } from "lucide-react";
import toast from "react-hot-toast";
import { getDirectImageUrl } from "@/lib/utils";

export default function SchoolProfilePage() {
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [formData, setFormData] = useState({
        schoolName: "",
        logo: "",
        vision: "",
        mission: "",
        history: "",
        principalMessage: "",
        address: "",
        phone: "",
        email: "",
        googleMapsUrl: "",
        heroHeadline: "",
        heroSubheadline: "",
        heroImage: "",
        ctaHeadline: "",
        ctaDescription: "",
        officeHours: "",
        facebookUrl: "",
        twitterUrl: "",
        instagramUrl: "",
        youtubeUrl: "",
    });

    const [uploading, setUploading] = useState<{ [key: string]: boolean }>({});

    const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>, field: "logo" | "heroImage") => {
        const file = e.target.files?.[0];
        if (!file) return;

        setUploading(prev => ({ ...prev, [field]: true }));
        const uploadFormData = new FormData();
        uploadFormData.append("file", file);

        try {
            const response = await fetch("/api/upload", {
                method: "POST",
                body: uploadFormData,
            });
            const data = await response.json();
            if (data.url) {
                setFormData(prev => ({ ...prev, [field]: data.url }));
                toast.success(`${field} uploaded successfully`);
            }
        } catch (error) {
            console.error("Upload failed:", error);
            toast.error(`Failed to upload ${field}`);
        } finally {
            setUploading(prev => ({ ...prev, [field]: false }));
        }
    };

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await fetch("/api/school");
                const data = await response.json();
                if (data) {
                    setFormData({
                        schoolName: data.schoolName || "",
                        logo: data.logo || "",
                        vision: data.vision || "",
                        mission: data.mission || "",
                        history: data.history || "",
                        principalMessage: data.principalMessage || "",
                        address: data.address || "",
                        phone: data.phone || "",
                        email: data.email || "",
                        googleMapsUrl: data.googleMapsUrl || "",
                        heroHeadline: data.heroHeadline || "",
                        heroSubheadline: data.heroSubheadline || "",
                        heroImage: data.heroImage || "",
                        ctaHeadline: data.ctaHeadline || "",
                        ctaDescription: data.ctaDescription || "",
                        officeHours: data.officeHours || "",
                        facebookUrl: data.facebookUrl || "",
                        twitterUrl: data.twitterUrl || "",
                        instagramUrl: data.instagramUrl || "",
                        youtubeUrl: data.youtubeUrl || "",
                    });
                }
            } catch (error) {
                toast.error("Failed to load school profile");
            } finally {
                setLoading(false);
            }
        };

        fetchProfile();
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);
        try {
            const response = await fetch("/api/school", {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                toast.success("School profile updated successfully");
            } else {
                toast.error("Failed to update school profile");
            }
        } catch (error) {
            toast.error("An error occurred while saving");
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return (
            <div className="flex h-full items-center justify-center p-8">
                <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
            </div>
        );
    }

    return (
        <div className="max-w-5xl mx-auto space-y-8 pb-20">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-black tracking-tight text-slate-900">Manage School Identity</h1>
                    <p className="text-muted-foreground mt-1 font-medium">Configure all public-facing information and brand elements.</p>
                </div>
                <Button onClick={handleSubmit} disabled={saving} className="rounded-full shadow-xl px-8">
                    {saving ? "Saving Changes..." : "Save All Changes"}
                    <Save className="ml-2 h-4 w-4" />
                </Button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
                {/* Basic Section */}
                <Card className="border-none shadow-sm ring-1 ring-slate-200">
                    <CardHeader className="border-b bg-slate-50/50">
                        <CardTitle className="flex items-center gap-2 text-lg">
                            <Building2 className="h-5 w-5 text-blue-600" /> Basic Information
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="p-8 space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-slate-700">School Name</label>
                                <Input
                                    value={formData.schoolName}
                                    onChange={(e) => setFormData({ ...formData, schoolName: e.target.value })}
                                    className="rounded-xl"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-slate-700">School Logo</label>
                                <div className="flex gap-2">
                                    <Input
                                        type="file"
                                        accept="image/*"
                                        onChange={(e) => handleFileUpload(e, "logo")}
                                        className="rounded-xl flex-1"
                                    />
                                    {uploading.logo && <div className="flex items-center text-sm text-blue-600">Uploading...</div>}
                                </div>
                                <Input
                                    value={formData.logo}
                                    onChange={(e) => setFormData({ ...formData, logo: e.target.value })}
                                    className="rounded-xl"
                                    placeholder="Or enter logo URL..."
                                />
                                <div className="mt-2 h-16 w-32 border bg-slate-50 overflow-hidden relative">
                                    <Image src={getDirectImageUrl(formData.logo)} alt="Logo Preview" fill className="object-contain" unoptimized />
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Hero & CTA Section */}
                <Card className="border-none shadow-sm ring-1 ring-slate-200">
                    <CardHeader className="border-b bg-slate-50/50">
                        <CardTitle className="flex items-center gap-2 text-lg">
                            <Globe className="h-5 w-5 text-blue-600" /> Homepage Presence
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="p-8 space-y-6">
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-slate-700">Hero Headline</label>
                            <Input
                                value={formData.heroHeadline}
                                onChange={(e) => setFormData({ ...formData, heroHeadline: e.target.value })}
                                className="rounded-xl text-lg font-bold"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-slate-700">Hero Subheadline</label>
                            <textarea
                                className="w-full rounded-xl border border-input bg-background px-4 py-3 text-sm min-h-[80px]"
                                value={formData.heroSubheadline}
                                onChange={(e) => setFormData({ ...formData, heroSubheadline: e.target.value })}
                            />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-slate-700">Hero Image</label>
                                <div className="flex gap-2">
                                    <Input
                                        type="file"
                                        accept="image/*"
                                        onChange={(e) => handleFileUpload(e, "heroImage")}
                                        className="rounded-xl flex-1"
                                    />
                                    {uploading.heroImage && <div className="flex items-center text-sm text-blue-600">Uploading...</div>}
                                </div>
                                <Input
                                    value={formData.heroImage}
                                    onChange={(e) => setFormData({ ...formData, heroImage: e.target.value })}
                                    className="rounded-xl"
                                    placeholder="Or enter hero image URL..."
                                />
                                <div className="mt-2 h-32 w-full border bg-slate-50 overflow-hidden relative">
                                    <Image src={getDirectImageUrl(formData.heroImage)} alt="Hero Preview" fill className="object-cover" unoptimized />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-slate-700">CTA Headline</label>
                                <Input
                                    value={formData.ctaHeadline}
                                    onChange={(e) => setFormData({ ...formData, ctaHeadline: e.target.value })}
                                    className="rounded-xl"
                                />
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Contact & Socials */}
                <Card className="border-none shadow-sm ring-1 ring-slate-200">
                    <CardHeader className="border-b bg-slate-50/50">
                        <CardTitle className="flex items-center gap-2 text-lg">
                            <Phone className="h-5 w-5 text-blue-600" /> Contact & Channels
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="p-8 space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-slate-700">Email</label>
                                <Input value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className="rounded-xl" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-slate-700">Phone</label>
                                <Input value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} className="rounded-xl" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-slate-700">Office Hours</label>
                                <Input value={formData.officeHours} onChange={(e) => setFormData({ ...formData, officeHours: e.target.value })} className="rounded-xl" placeholder="Mon - Fri: 08:00 - 16:00" />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-slate-700">Address</label>
                            <Input value={formData.address} onChange={(e) => setFormData({ ...formData, address: e.target.value })} className="rounded-xl" />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-slate-700">Facebook URL</label>
                                <Input value={formData.facebookUrl} onChange={(e) => setFormData({ ...formData, facebookUrl: e.target.value })} className="rounded-xl" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-slate-700">Instagram URL</label>
                                <Input value={formData.instagramUrl} onChange={(e) => setFormData({ ...formData, instagramUrl: e.target.value })} className="rounded-xl" />
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Narrative Section */}
                <Card className="border-none shadow-sm ring-1 ring-slate-200">
                    <CardHeader className="border-b bg-slate-50/50">
                        <CardTitle className="flex items-center gap-2 text-lg">
                            <Info className="h-5 w-5 text-blue-600" /> School Narrative
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="p-8 space-y-6">
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-slate-700">History</label>
                            <textarea
                                className="w-full rounded-xl border border-input bg-background px-4 py-3 text-sm min-h-[120px]"
                                value={formData.history}
                                onChange={(e) => setFormData({ ...formData, history: e.target.value })}
                            />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-slate-700">Vision</label>
                                <textarea
                                    className="w-full rounded-xl border border-input bg-background px-4 py-3 text-sm min-h-[100px]"
                                    value={formData.vision}
                                    onChange={(e) => setFormData({ ...formData, vision: e.target.value })}
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-slate-700">Mission</label>
                                <textarea
                                    className="w-full rounded-xl border border-input bg-background px-4 py-3 text-sm min-h-[100px]"
                                    value={formData.mission}
                                    onChange={(e) => setFormData({ ...formData, mission: e.target.value })}
                                />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-slate-700">Principal&apos;s Message</label>
                            <textarea
                                className="w-full rounded-xl border border-input bg-background px-4 py-3 text-sm min-h-[120px]"
                                value={formData.principalMessage}
                                onChange={(e) => setFormData({ ...formData, principalMessage: e.target.value })}
                            />
                        </div>
                    </CardContent>
                </Card>
            </form>
        </div>
    );
}
