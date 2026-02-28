import { prisma } from "@/lib/prisma";
import { Card, CardContent } from "@/components/ui/Card";
import { Calendar, MapPin, Clock, Search } from "lucide-react";
import { getDirectImageUrl } from "@/lib/utils";
import Image from "next/image";

export default async function AgendaPage({
    searchParams,
}: {
    searchParams: { q?: string };
}) {
    const query = searchParams.q || "";

    const events = await prisma.agenda.findMany({
        where: {
            OR: [
                { title: { contains: query, mode: "insensitive" } },
                { location: { contains: query, mode: "insensitive" } },
            ],
        },
        orderBy: { date: "asc" },
    });

    return (
        <div className="container mx-auto px-4 py-32">
            <div className="mb-12">
                <h1 className="text-4xl font-bold mb-4">School Agenda</h1>
                <p className="text-muted-foreground">Stay informed about upcoming events and activities.</p>
            </div>

            <div className="flex flex-col md:flex-row gap-8 mb-12">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <input
                        type="text"
                        placeholder="Search events..."
                        className="w-full pl-10 pr-4 py-2 rounded-lg border bg-background"
                        defaultValue={query}
                    />
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {events.map((event) => (
                    <Card key={event.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                        <CardContent className="p-0">
                            <div className="flex flex-col md:flex-row">
                                <div className="w-full md:w-48 h-48 md:h-auto relative bg-primary/10">
                                    {event.image ? (
                                        <Image
                                            src={getDirectImageUrl(event.image)}
                                            alt={event.title}
                                            fill
                                            className="object-cover"
                                            unoptimized
                                        />
                                    ) : (
                                        <div className="h-full w-full flex flex-col items-center justify-center text-primary-foreground bg-primary">
                                            <span className="text-4xl font-bold">{new Date(event.date).getDate()}</span>
                                            <span className="text-sm font-medium uppercase">
                                                {new Date(event.date).toLocaleDateString('en-US', { month: 'short' })}
                                            </span>
                                        </div>
                                    )}
                                </div>
                                <div className="p-6 flex-1">
                                    <h3 className="text-xl font-bold mb-4">{event.title}</h3>
                                    <div className="space-y-2 text-sm text-muted-foreground">
                                        <div className="flex items-center gap-2">
                                            <Clock className="h-4 w-4" />
                                            <span>Event Date: {new Date(event.date).toLocaleDateString()}</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <MapPin className="h-4 w-4" />
                                            <span>{event.location}</span>
                                        </div>
                                    </div>
                                    <p className="mt-4 text-sm line-clamp-3">{event.description}</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ))}
                {events.length === 0 && (
                    <div className="col-span-full text-center py-20 bg-muted/20 rounded-2xl border border-dashed">
                        <Calendar className="h-12 w-12 mx-auto mb-4 opacity-20" />
                        <p className="text-muted-foreground">No events found matching your search.</p>
                    </div>
                )}
            </div>
        </div>
    );
}
