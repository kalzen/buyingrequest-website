import LandingLayout from '@/layouts/landing-layout';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle2, TrendingUp, Globe, Shield, Zap, BarChart3 } from 'lucide-react';
import { Head } from '@inertiajs/react';

export default function About() {
    return (
        <LandingLayout>
            <Head title="About Us - Export Go" />
            
            {/* Hero Section */}
            <section className="bg-gradient-to-br from-[#0b3d91] to-[#1f6feb] py-20">
                <div className="mx-auto w-full max-w-6xl px-4 text-white">
                    <div className="text-center mb-8">
                        <Badge className="bg-white/20 text-white mb-4">About Export Go</Badge>
                        <h1 className="text-4xl md:text-5xl font-bold mb-6">
                            Welcome to Export Go: Your Global B2B Trade Gateway
                        </h1>
                        <p className="text-xl text-white/90 max-w-4xl mx-auto leading-relaxed">
                            Export Go is a premier global B2B trading platform, established 10 years ago in the United States. 
                            We specialize in closing the gap between verified international buyers and trustworthy suppliers, 
                            empowering businesses worldwide to scale their export and import operations with confidence.
                        </p>
                    </div>
                </div>
            </section>

            {/* Mission Statement */}
            <section className="bg-white py-16">
                <div className="mx-auto w-full max-w-6xl px-4">
                    <div className="grid gap-8 lg:grid-cols-2 items-center">
                        <div>
                            <img 
                                src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1200&q=80" 
                                alt="Global Business" 
                                className="rounded-2xl shadow-xl"
                            />
                        </div>
                        <div>
                            <h2 className="text-3xl font-bold text-foreground mb-4">
                                A Decade of Excellence
                            </h2>
                            <p className="text-lg text-slate-600 leading-relaxed">
                                With a decade of dedicated service, Export Go has evolved into a robust digital marketplace, 
                                hosting millions of trade connections across hundreds of industries. We are committed to fostering 
                                a secure, transparent, and high-volume trading ecosystem.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Why Trust Us */}
            <section className="bg-[#f5f7fb] py-20">
                <div className="mx-auto w-full max-w-6xl px-4">
                    <div className="text-center mb-12">
                        <Badge className="bg-primary/10 text-primary mb-4">Why Choose Us</Badge>
                        <h2 className="text-4xl font-bold text-foreground mb-4">
                            Why Global Businesses Trust Export Go
                        </h2>
                        <p className="text-lg text-slate-600 max-w-3xl mx-auto">
                            We provide the infrastructure, expertise, and network you need to succeed in international trade.
                        </p>
                    </div>

                    <div className="space-y-8">
                        {/* Feature 1 */}
                        <Card className="border-[#d6e0f5]">
                            <CardContent className="p-8">
                                <div className="grid gap-8 lg:grid-cols-[1fr,2fr] items-start">
                                    <div className="flex items-center gap-4">
                                        <div className="flex size-16 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                                            <Shield className="size-8" />
                                        </div>
                                        <div>
                                            <div className="text-2xl font-bold text-primary mb-1">1</div>
                                            <h3 className="text-xl font-bold text-foreground">
                                                A Decade of American Expertise and Trust
                                            </h3>
                                        </div>
                                    </div>
                                    <div className="space-y-4">
                                        <p className="text-slate-700 leading-relaxed">
                                            Our foundation in the U.S. and our 10-year track record underscore our commitment to business 
                                            integrity and professionalism. This long-standing experience ensures we understand the complexities 
                                            of international trade, providing you with a platform built on trust and proven reliability.
                                        </p>
                                        <p className="text-slate-700 leading-relaxed">
                                            You benefit from a structured environment designed for serious global commerce.
                                        </p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Feature 2 */}
                        <Card className="border-[#d6e0f5]">
                            <CardContent className="p-8">
                                <div className="grid gap-8 lg:grid-cols-[1fr,2fr] items-start">
                                    <div className="flex items-center gap-4">
                                        <div className="flex size-16 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                                            <Zap className="size-8" />
                                        </div>
                                        <div>
                                            <div className="text-2xl font-bold text-primary mb-1">2</div>
                                            <h3 className="text-xl font-bold text-foreground">
                                                Precision Matchmaking for Faster Deals
                                            </h3>
                                        </div>
                                    </div>
                                    <div className="space-y-4">
                                        <p className="text-slate-700 leading-relaxed">
                                            We go beyond simple listings. Our platform utilizes advanced AI and proprietary algorithms 
                                            to precisely match your business needs. Whether you are a supplier seeking bulk buyers in 
                                            emerging markets or a procurement manager sourcing specific materials, Export Go delivers:
                                        </p>
                                        <ul className="space-y-2">
                                            <li className="flex items-start gap-2">
                                                <CheckCircle2 className="size-5 text-primary mt-0.5 flex-shrink-0" />
                                                <span className="text-slate-700"><strong>Verified Leads:</strong> Access a network of vetted, active buyers and sellers.</span>
                                            </li>
                                            <li className="flex items-start gap-2">
                                                <CheckCircle2 className="size-5 text-primary mt-0.5 flex-shrink-0" />
                                                <span className="text-slate-700"><strong>Time Efficiency:</strong> Cut down months of traditional market research and networking into minutes of targeted searching.</span>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Feature 3 */}
                        <Card className="border-[#d6e0f5]">
                            <CardContent className="p-8">
                                <div className="grid gap-8 lg:grid-cols-[1fr,2fr] items-start">
                                    <div className="flex items-center gap-4">
                                        <div className="flex size-16 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                                            <Globe className="size-8" />
                                        </div>
                                        <div>
                                            <div className="text-2xl font-bold text-primary mb-1">3</div>
                                            <h3 className="text-xl font-bold text-foreground">
                                                Comprehensive Global Market Reach
                                            </h3>
                                        </div>
                                    </div>
                                    <div className="space-y-4">
                                        <p className="text-slate-700 leading-relaxed">
                                            Export Go is the true global crossroads of commerce. Our network spans every continent, 
                                            connecting you to opportunities in established markets and high-growth regions alike.
                                        </p>
                                        <p className="text-slate-700 leading-relaxed">
                                            We facilitate trade across a diverse spectrum of sectors, including: <strong>Agriculture, 
                                            Textiles, Machinery, Chemicals, and Consumer Goods</strong>. If you make it or buy it, 
                                            you can find it here.
                                        </p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Feature 4 */}
                        <Card className="border-[#d6e0f5]">
                            <CardContent className="p-8">
                                <div className="grid gap-8 lg:grid-cols-[1fr,2fr] items-start">
                                    <div className="flex items-center gap-4">
                                        <div className="flex size-16 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                                            <BarChart3 className="size-8" />
                                        </div>
                                        <div>
                                            <div className="text-2xl font-bold text-primary mb-1">4</div>
                                            <h3 className="text-xl font-bold text-foreground">
                                                Tools for Secure and Scalable Growth
                                            </h3>
                                        </div>
                                    </div>
                                    <div className="space-y-4">
                                        <p className="text-slate-700 leading-relaxed">
                                            We provide the necessary resources for your business to not only survive but thrive globally:
                                        </p>
                                        <ul className="space-y-2">
                                            <li className="flex items-start gap-2">
                                                <CheckCircle2 className="size-5 text-primary mt-0.5 flex-shrink-0" />
                                                <span className="text-slate-700"><strong>Market Insights:</strong> Get real-time data and trends to inform your pricing and product strategy.</span>
                                            </li>
                                            <li className="flex items-start gap-2">
                                                <CheckCircle2 className="size-5 text-primary mt-0.5 flex-shrink-0" />
                                                <span className="text-slate-700"><strong>Scalability:</strong> The platform easily handles connections for both small-volume trial orders and long-term, high-volume contracts.</span>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="bg-white py-20">
                <div className="mx-auto w-full max-w-6xl px-4">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-foreground mb-4">
                            Our Impact in Numbers
                        </h2>
                        <p className="text-lg text-slate-600">
                            A decade of connecting businesses worldwide
                        </p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                        <Card className="text-center">
                            <CardContent className="p-6">
                                <div className="text-4xl font-bold text-primary mb-2">10+</div>
                                <div className="text-sm text-slate-600">Years of Service</div>
                            </CardContent>
                        </Card>
                        <Card className="text-center">
                            <CardContent className="p-6">
                                <div className="text-4xl font-bold text-primary mb-2">1M+</div>
                                <div className="text-sm text-slate-600">Trade Connections</div>
                            </CardContent>
                        </Card>
                        <Card className="text-center">
                            <CardContent className="p-6">
                                <div className="text-4xl font-bold text-primary mb-2">100+</div>
                                <div className="text-sm text-slate-600">Industries Served</div>
                            </CardContent>
                        </Card>
                        <Card className="text-center">
                            <CardContent className="p-6">
                                <div className="text-4xl font-bold text-primary mb-2">150+</div>
                                <div className="text-sm text-slate-600">Countries Connected</div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </section>

            {/* Image Gallery */}
            <section className="bg-[#f5f7fb] py-20">
                <div className="mx-auto w-full max-w-6xl px-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="relative h-80 rounded-2xl overflow-hidden">
                            <img 
                                src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80" 
                                alt="Modern Business" 
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <div className="relative h-80 rounded-2xl overflow-hidden">
                            <img 
                                src="https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=1200&q=80" 
                                alt="Team Collaboration" 
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <div className="relative h-80 rounded-2xl overflow-hidden">
                            <img 
                                src="https://images.unsplash.com/photo-1553877522-43269d4ea984?auto=format&fit=crop&w=1200&q=80" 
                                alt="Global Trade" 
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <div className="relative h-80 rounded-2xl overflow-hidden">
                            <img 
                                src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80" 
                                alt="Business Analytics" 
                                className="w-full h-full object-cover"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* Closing Statement */}
            <section className="bg-white py-20">
                <div className="mx-auto w-full max-w-4xl px-4 text-center">
                    <h2 className="text-3xl font-bold text-foreground mb-6">
                        More Than Just a Platform
                    </h2>
                    <p className="text-xl text-slate-700 leading-relaxed mb-8">
                        Export Go is more than just a listing service—we are your proven partner for professional, 
                        efficient, and profitable global expansion.
                    </p>
                    <div className="flex flex-wrap justify-center gap-4">
                        <Badge className="bg-primary/10 text-primary px-4 py-2 text-base">Trusted</Badge>
                        <Badge className="bg-primary/10 text-primary px-4 py-2 text-base">Secure</Badge>
                        <Badge className="bg-primary/10 text-primary px-4 py-2 text-base">Global</Badge>
                        <Badge className="bg-primary/10 text-primary px-4 py-2 text-base">Scalable</Badge>
                    </div>
                </div>
            </section>
        </LandingLayout>
    );
}



