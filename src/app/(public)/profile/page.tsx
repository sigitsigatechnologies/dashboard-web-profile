import Image from "next/image";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { Button } from "@/components/ui/Button";
import { getDirectImageUrl } from "@/lib/utils";
import * as LucideIcons from "lucide-react";

export default async function ProfilePage() {
    const profile: any = await prisma.schoolProfile.findFirst();
    const teachers = await prisma.teacher.findMany();
    const facilities = await prisma.facility.findMany({ orderBy: { order: "asc" } });

    return (
        <div className="flex flex-col gap-20 pb-20">
            {/* Page Header */}
            <section className="bg-slate-900 pt-40 pb-24 text-white relative overflow-hidden">
                <div className="absolute inset-0 z-0 opacity-20">
                    <Image
                        src={getDirectImageUrl(profile?.heroImage) || "https://images.unsplash.com/photo-1523050335102-c67ad5154573?auto=format&fit=crop&q=80&w=2000"}
                        alt="School Background"
                        fill
                        className="object-cover"
                        unoptimized
                    />
                </div>
                <div className="container mx-auto px-4 relative z-10 text-center">
                    <h1 className="text-5xl md:text-7xl font-black mb-6 tracking-tight">Our Identity</h1>
                    <p className="text-xl md:text-2xl text-slate-300 max-w-3xl mx-auto font-medium leading-relaxed">
                        Discover the values, mission, and the incredible team behind {profile?.schoolName || "EduCenter Academy"}.
                    </p>
                </div>
            </section>

            {/* History Section */}
            <section className="container mx-auto px-4">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    <div className="relative aspect-video rounded-3xl overflow-hidden shadow-2xl">
                        <Image
                            src="https://images.unsplash.com/photo-1519311965067-36d3e5f33d39?auto=format&fit=crop&q=80&w=1000"
                            alt="School History"
                            fill
                            className="object-cover"
                        />
                    </div>
                    <div>
                        <div className="mb-6 inline-flex items-center rounded-full px-4 py-1 text-xs font-bold uppercase tracking-widest border-2 border-blue-600 text-blue-600">
                            Our Legacy
                        </div>
                        <h2 className="text-4xl font-bold mb-8 text-slate-900">History of Excellence</h2>
                        <div className="space-y-6 text-lg text-slate-600 leading-relaxed">
                            <p>{profile?.history || "Founded with a vision to transform education, our school has been a pillar of academic excellence for decades."}</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Vision & Mission */}
            <section className="bg-blue-600 py-24 text-white">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                        <div className="p-10 bg-white/10 backdrop-blur-md rounded-[2.5rem] border border-white/20">
                            <div className="w-16 h-16 bg-white text-blue-600 rounded-2xl flex items-center justify-center mb-8">
                                <LucideIcons.Target className="h-8 w-8" />
                            </div>
                            <h2 className="text-3xl font-bold mb-6">Our Vision</h2>
                            <p className="text-xl text-blue-50/90 leading-relaxed font-medium italic">
                                "{profile?.vision || "To be a world-class institution that nurtures future leaders with integrity and innovation."}"
                            </p>
                        </div>
                        <div className="p-10 bg-white/10 backdrop-blur-md rounded-[2.5rem] border border-white/20">
                            <div className="w-16 h-16 bg-white text-blue-600 rounded-2xl flex items-center justify-center mb-8">
                                <LucideIcons.Rocket className="h-8 w-8" />
                            </div>
                            <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
                            <ul className="space-y-4">
                                {profile?.mission ? (
                                    profile.mission.split('\n').map((m, i) => (
                                        <li key={i} className="flex items-start gap-4">
                                            <LucideIcons.CheckCircle2 className="h-6 w-6 text-blue-200 shrink-0 mt-1" />
                                            <span className="text-lg text-blue-50">{m}</span>
                                        </li>
                                    ))
                                ) : (
                                    <li className="flex items-start gap-4">
                                        <LucideIcons.CheckCircle2 className="h-6 w-6 text-blue-200 shrink-0 mt-1" />
                                        <span className="text-lg text-blue-50">Providing high-quality education and character building.</span>
                                    </li>
                                )}
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* Principal's Message */}
            <section className="container mx-auto px-4">
                <div className="bg-slate-50 dark:bg-slate-900/50 rounded-[3rem] p-12 md:p-20 border border-slate-100 dark:border-slate-800 flex flex-col items-center text-center shadow-sm">
                    <div className="w-24 h-24 rounded-[2rem] bg-blue-600 text-white flex items-center justify-center mb-10 shadow-xl shadow-blue-500/20">
                        <LucideIcons.Rocket className="h-10 w-10" />
                    </div>
                    <h2 className="text-3xl md:text-5xl font-black mb-10 tracking-tight text-slate-900">Message from our Principal</h2>
                    <p className="text-xl md:text-2xl text-slate-600 leading-relaxed italic max-w-4xl font-medium">
                        "{profile?.principalMessage || "Welcome to our school. We are committed to providing an environment where every student can discover their passions and reach their full potential."}"
                    </p>
                </div>
            </section>

            {/* Teachers Section */}
            <section className="container mx-auto px-4">
                <div className="text-center mb-20">
                    <h2 className="text-4xl md:text-5xl font-black mb-6 tracking-tight text-slate-900">Meet Our Educators</h2>
                    <p className="text-xl text-slate-500 max-w-2xl mx-auto font-medium">
                        Experienced professionals dedicated to mentoring and inspiring the next generation.
                    </p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
                    {teachers.map((teacher) => (
                        <div key={teacher.id} className="group relative">
                            <div className="relative aspect-[4/5] rounded-[2rem] overflow-hidden shadow-lg group-hover:shadow-2xl transition-all duration-500">
                                <Image
                                    src={getDirectImageUrl(teacher.photo) || "https://images.unsplash.com/photo-1544717297-fa154da09f9d?auto=format&fit=crop&q=80&w=400"}
                                    alt={teacher.name}
                                    fill
                                    className="object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700"
                                    unoptimized
                                />
                                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent p-8 pt-20">
                                    <h3 className="text-white text-2xl font-bold mb-1">{teacher.name}</h3>
                                    <p className="text-blue-300 font-bold text-sm tracking-wider uppercase mb-4">{teacher.position}</p>
                                    <p className="text-slate-300 text-xs line-clamp-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                                        {teacher.bio}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                    {teachers.length === 0 && (
                        <div className="col-span-full text-center py-20 bg-muted/20 rounded-[2rem] border-2 border-dashed">
                            <LucideIcons.Users className="h-12 w-12 mx-auto mb-4 opacity-10" />
                            <p className="text-muted-foreground font-medium">Faculty information is currently being updated.</p>
                        </div>
                    )}
                </div>
            </section>

            {/* Facilities & Contact */}
            <section className="bg-slate-50 dark:bg-slate-900 py-32">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
                        <div>
                            <h2 className="text-4xl font-black mb-10 tracking-tight text-slate-900">Our Facilities</h2>
                            <div className="grid grid-cols-2 gap-6">
                                {facilities.length > 0 ? (
                                    facilities.map((f, i) => (
                                        <div key={f.id} className="relative aspect-square rounded-[2rem] overflow-hidden group shadow-md">
                                            <Image src={getDirectImageUrl(f.image)} alt={f.name} fill className="object-cover group-hover:scale-110 transition-transform duration-700" unoptimized />
                                            <div className="absolute inset-0 bg-blue-900/60 backdrop-blur-[2px] flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 p-4 text-center">
                                                <span className="text-white text-xl font-black tracking-tight uppercase">{f.name}</span>
                                                {f.description && <span className="text-blue-200 text-sm mt-2">{f.description}</span>}
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <>
                                        <div className="relative aspect-square rounded-[2rem] overflow-hidden group shadow-md">
                                            <Image src="https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&q=80&w=600" alt="Smart Classrooms" fill className="object-cover group-hover:scale-110 transition-transform duration-700" />
                                        </div>
                                        <div className="relative aspect-square rounded-[2rem] overflow-hidden group shadow-md">
                                            <Image src="https://images.unsplash.com/photo-1532094349884-543bb1178329?auto=format&fit=crop&q=80&w=600" alt="Research Labs" fill className="object-cover group-hover:scale-110 transition-transform duration-700" />
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>

                        <div className="flex flex-col justify-center">
                            <h2 className="text-4xl font-black mb-10 tracking-tight text-slate-900">Contact Us</h2>
                            <div className="space-y-10">
                                <div className="flex items-start gap-8">
                                    <div className="w-14 h-14 rounded-2xl bg-blue-600 text-white flex items-center justify-center shrink-0 shadow-lg shadow-blue-500/20">
                                        <LucideIcons.MapPin className="h-7 w-7" />
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-black uppercase text-blue-600 tracking-[0.2em] mb-2">Our Location</p>
                                        <p className="text-xl font-bold text-slate-700 leading-relaxed">{profile?.address || "123 School Street, Education City, ED 12345"}</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-8">
                                    <div className="w-14 h-14 rounded-2xl bg-blue-600 text-white flex items-center justify-center shrink-0 shadow-lg shadow-blue-500/20">
                                        <LucideIcons.Award className="h-7 w-7" />
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-black uppercase text-blue-600 tracking-[0.2em] mb-2">Connect Directly</p>
                                        <p className="text-xl font-bold text-slate-700">{profile?.phone || "+1 (234) 567-890"}</p>
                                        <p className="text-xl font-bold text-slate-700">{profile?.email || "info@educenter.sch.id"}</p>
                                    </div>
                                </div>
                                <div className="pt-10">
                                    <Button size="lg" className="rounded-full shadow-2xl px-12" asChild>
                                        <Link href={profile?.googleMapsUrl || "/contact"}>Get Directions on Maps</Link>
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
