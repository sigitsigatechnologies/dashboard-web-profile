import Image from "next/image";
import { prisma } from "@/lib/prisma";
import { getDirectImageUrl } from "@/lib/utils";
import { getServerTranslations } from "@/lib/i18n";

export const dynamic = "force-dynamic";

export default async function TeachersPage() {
    const { t } = await getServerTranslations();
    const teachers = await prisma.teacher.findMany();

    return (
        <div className="flex flex-col pb-32 bg-slate-50 dark:bg-slate-900 min-h-screen">
            <section className="pt-40 pb-20 px-4 text-center">
                <h1 className="text-5xl md:text-7xl font-black mb-6 tracking-tighter text-slate-900 dark:text-white">
                    {t("teachers.title") || "Tenaga Pengajar"}
                </h1>
                <p className="text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto font-medium">
                    Dididik oleh para ahli dan profesional yang berdedikasi tinggi terhadap masa depan siswa.
                </p>
            </section>
            
            <section className="container mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
                    {teachers.map((teacher) => (
                        <div key={teacher.id} className="group text-center bg-white dark:bg-slate-950 p-8 rounded-[3rem] shadow-xl hover:shadow-2xl transition-all duration-500 border border-slate-100 dark:border-slate-800 hover:-translate-y-2 flex flex-col items-center">
                            <div className="relative w-48 h-48 mb-8 rounded-full overflow-hidden border-4 border-slate-50 shadow-inner group-hover:border-primary transition-colors duration-500 flex-shrink-0">
                                <Image 
                                    src={getDirectImageUrl(teacher.photo)} 
                                    alt={teacher.name} 
                                    fill 
                                    className="object-cover group-hover:scale-110 transition-transform duration-500" 
                                    unoptimized
                                />
                            </div>
                            <h3 className="text-2xl font-black text-slate-900 dark:text-white">{teacher.name}</h3>
                            <p className="text-primary font-bold text-xs uppercase tracking-widest mt-3 mb-6">{teacher.position}</p>
                            <p className="text-slate-500 dark:text-slate-400 text-base leading-relaxed">{teacher.bio}</p>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
}
