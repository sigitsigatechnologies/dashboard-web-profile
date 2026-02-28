import { Card, CardContent } from "@/components/ui/Card";
import { Mail, Phone, MapPin, Clock } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { ContactForm } from "@/components/shared/ContactForm";

export default async function ContactPage() {
    const profile = await prisma.schoolProfile.findFirst();

    return (
        <div className="flex flex-col gap-20 pb-20">
            <section className="bg-slate-900 pt-32 pb-20 text-white">
                <div className="container mx-auto px-4 text-center">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">Contact Us</h1>
                    <p className="text-lg text-slate-400 max-w-2xl mx-auto">
                        Have questions? We're here to help. Reach out to us via the form below or using our contact information.
                    </p>
                </div>
            </section>

            <section className="container mx-auto px-4 -mt-10">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Contact Info */}
                    <div className="lg:col-span-1 space-y-6">
                        <Card className="bg-blue-600 text-white border-none shadow-xl">
                            <CardContent className="p-8 space-y-8">
                                <h3 className="text-2xl font-bold">Get In Touch</h3>
                                <div className="space-y-6">
                                    <div className="flex items-start space-x-4">
                                        <MapPin className="h-6 w-6 shrink-0 mt-1" />
                                        <div>
                                            <p className="font-bold">Our Address</p>
                                            <p className="text-blue-100">{profile?.address || "123 School Street, Education City, ED 12345"}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start space-x-4">
                                        <Phone className="h-6 w-6 shrink-0 mt-1" />
                                        <div>
                                            <p className="font-bold">Phone Number</p>
                                            <p className="text-blue-100">{profile?.phone || "+1 (234) 567-890"}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start space-x-4">
                                        <Mail className="h-6 w-6 shrink-0 mt-1" />
                                        <div>
                                            <p className="font-bold">Email Address</p>
                                            <p className="text-blue-100">{profile?.email || "info@educenter.sch.id"}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start space-x-4">
                                        <Clock className="h-6 w-6 shrink-0 mt-1" />
                                        <div>
                                            <p className="font-bold">Office Hours</p>
                                            <p className="text-blue-100">{profile?.officeHours || "Mon - Fri: 07:00 AM - 04:00 PM"}</p>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <div className="h-[300px] rounded-xl overflow-hidden border shadow-lg">
                            <iframe
                                src={profile?.googleMapsUrl || "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15865.039237691!2d106.816666!3d-6.19!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f3e945e3ecb1%3A0x600f6b4020a5948a!2sJakarta%20Pusat%2C%20Kota%20Jakarta%20Pusat%2C%20Daerah%20Khusus%20Ibukota%20Jakarta!5e0!3m2!1sid!2sid!4v1650000000000!5m2!1sid!2sid"}
                                width="100%"
                                height="100%"
                                style={{ border: 0 }}
                                allowFullScreen={true}
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                                title="Google Maps"
                            ></iframe>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div className="lg:col-span-2">
                        <ContactForm />
                    </div>
                </div>
            </section>
        </div>
    );
}
