import Image from "next/image";
import { prisma } from "@/lib/prisma";
import { getDirectImageUrl } from "@/lib/utils";
import { getServerTranslations } from "@/lib/i18n";

export const dynamic = "force-dynamic";

export default async function FacilitiesPage() {
    const { t } = await getServerTranslations();
    const facilities = await prisma.facility.findMany({ orderBy: { order: "asc" } });

    return (
        <div className="flex flex-col pb-32 bg-slate-900 min-h-screen">
            <section className="pt-40 pb-20 px-4 text-center">
                <h1 className="text-5xl md:text-7xl font-black mb-6 tracking-tighter text-white">
                    {t("facilities.title") || "Fasilitas Unggulan"}
                </h1>
                <p className="text-xl text-slate-400 max-w-2xl mx-auto font-medium">
                    Lingkungan belajar modern yang dirancang untuk mendukung setiap aspek perkembangan siswa.
                </p>
            </section>
            
            <section className="container mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {facilities.map((facility) => (
                        <div key={facility.id} className="group relative rounded-[3rem] overflow-hidden aspect-[4/3] bg-slate-800 border border-slate-800">
                            <Image 
                                src={getDirectImageUrl(facility.image)} 
                                alt={facility.name} 
                                fill 
                                className="object-cover group-hover:scale-110 transition-transform duration-700" 
                                unoptimized
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent opacity-90 group-hover:opacity-80 transition-opacity" />
                            <div className="absolute bottom-0 left-0 p-10 w-full transform translate-y-6 group-hover:translate-y-0 transition-transform duration-500">
                                <h3 className="text-3xl font-black text-white mb-3">{facility.name}</h3>
                                <div className="h-1 w-12 bg-primary rounded-full mb-4 group-hover:w-24 transition-all duration-500" />
                                <p className="text-slate-300 line-clamp-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                                    {facility.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
}
