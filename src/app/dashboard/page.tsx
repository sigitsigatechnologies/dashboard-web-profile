import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import {
    FileText,
    Calendar,
    Users,
    MessageSquare,
    TrendingUp,
    Clock,
    ArrowUpRight
} from "lucide-react";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { formatDate } from "@/lib/utils";

export default async function DashboardOverview() {
    const postCount = await prisma.post.count();
    const agendaCount = await prisma.agenda.count();
    const teacherCount = await prisma.teacher.count();
    const messageCount = await prisma.message.count();

    const recentPosts = await prisma.post.findMany({
        orderBy: { createdAt: "desc" },
        take: 5,
    });

    const recentMessages = await prisma.message.findMany({
        orderBy: { createdAt: "desc" },
        take: 5,
    });

    const stats = [
        { name: "Total Posts", value: postCount, icon: FileText, change: "Updated just now", color: "text-blue-600", bg: "bg-blue-50" },
        { name: "Total Agenda", value: agendaCount, icon: Calendar, change: "Events scheduled", color: "text-purple-600", bg: "bg-purple-50" },
        { name: "Total Teachers", value: teacherCount, icon: Users, change: "Faculty members", color: "text-green-600", bg: "bg-green-50" },
        { name: "Total Messages", value: messageCount, icon: MessageSquare, change: "Form submissions", color: "text-orange-600", bg: "bg-orange-50" },
    ];

    return (
        <div className="space-y-8">
            <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Dashboard Overview</h1>
                    <p className="text-muted-foreground mt-1">Welcome back! Here's a summary of your school's activity.</p>
                </div>
                <div className="flex gap-3">
                    <Link href="/dashboard/posts">
                        <button className="flex h-10 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 shadow-lg transition-all active:scale-95">
                            Manage Content
                        </button>
                    </Link>
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat) => (
                    <Card key={stat.name} className="border shadow-sm hover:shadow-md transition-all duration-300">
                        <CardContent className="p-6">
                            <div className="flex items-center justify-between mb-4">
                                <div className={`p-3 rounded-2xl ${stat.bg}`}>
                                    <stat.icon className={`h-6 w-6 ${stat.color}`} />
                                </div>
                                <div className="flex items-center text-[10px] font-bold uppercase tracking-wider text-green-600 bg-green-50 px-3 py-1 rounded-full">
                                    <TrendingUp className="h-3 w-3 mr-1" />
                                    Live
                                </div>
                            </div>
                            <div className="space-y-1">
                                <p className="text-sm font-medium text-muted-foreground">{stat.name}</p>
                                <p className="text-3xl font-black tracking-tight">{stat.value}</p>
                            </div>
                            <p className="mt-4 text-xs text-muted-foreground border-t pt-4 font-medium italic">
                                {stat.change}
                            </p>
                        </CardContent>
                    </Card>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <Card className="lg:col-span-2 shadow-sm border overflow-hidden">
                    <CardHeader className="bg-slate-50/50">
                        <CardTitle className="text-lg flex items-center justify-between font-bold">
                            Recent Content
                            <Link href="/dashboard/posts" className="text-xs font-bold text-primary hover:underline flex items-center uppercase tracking-widest">
                                Manage Posts <ArrowUpRight className="ml-1.5 h-3 w-3" />
                            </Link>
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="p-0">
                        <div className="relative overflow-x-auto">
                            <table className="w-full text-left text-sm">
                                <thead className="text-[10px] uppercase bg-slate-50 text-muted-foreground border-y font-bold">
                                    <tr>
                                        <th className="px-6 py-4">Title</th>
                                        <th className="px-6 py-4">Category</th>
                                        <th className="px-6 py-4">Status</th>
                                        <th className="px-6 py-4">Created At</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y">
                                    {recentPosts.map((post) => (
                                        <tr key={post.id} className="hover:bg-slate-50/50 transition-colors">
                                            <td className="px-6 py-4 font-bold text-slate-700 max-w-[200px] truncate">{post.title}</td>
                                            <td className="px-6 py-4">
                                                <span className="text-xs font-medium px-2 py-1 rounded-md bg-slate-100">{post.category}</span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className={`px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${post.published ? "bg-green-100 text-green-700" : "bg-orange-100 text-orange-700"
                                                    }`}>
                                                    {post.published ? "Published" : "Draft"}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 font-medium text-muted-foreground whitespace-nowrap">{formatDate(post.createdAt)}</td>
                                        </tr>
                                    ))}
                                    {recentPosts.length === 0 && (
                                        <tr>
                                            <td colSpan={4} className="px-6 py-12 text-center text-muted-foreground italic">No content found</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </CardContent>
                </Card>

                <Card className="shadow-sm border">
                    <CardHeader>
                        <CardTitle className="text-lg flex items-center gap-2 font-bold">
                            <MessageSquare className="h-5 w-5 text-primary" />
                            Recent Inquiries
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="p-0">
                        <div className="divide-y">
                            {recentMessages.map((msg) => (
                                <div key={msg.id} className="p-5 hover:bg-slate-50/50 transition-colors">
                                    <div className="flex items-center justify-between mb-2">
                                        <p className="text-sm font-black">{msg.name}</p>
                                        <span className="text-[10px] text-muted-foreground font-bold">{formatDate(msg.createdAt)}</span>
                                    </div>
                                    <p className="text-xs font-bold text-blue-600 mb-1 truncate">{msg.subject}</p>
                                    <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed italic">"{msg.body}"</p>
                                </div>
                            ))}
                            {recentMessages.length === 0 && (
                                <div className="p-10 text-center text-muted-foreground italic space-y-2">
                                    <MessageSquare className="h-8 w-8 mx-auto opacity-10" />
                                    <p>No messages yet</p>
                                </div>
                            )}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
