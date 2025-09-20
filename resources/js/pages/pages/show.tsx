import LandingLayout from '@/layouts/landing-layout';
import { useMemo } from 'react';
import { Head, Link, usePage } from '@inertiajs/react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { generateHTML } from '@tiptap/html';
import StarterKit from '@tiptap/starter-kit';
import LinkExtension from '@tiptap/extension-link';
import type { JSONContent } from '@tiptap/react';
import { ArrowRight } from 'lucide-react';
import { home as homeRoute } from '@/routes';

interface Props {
    page: {
        id: number;
        title: string;
        subtitle?: string | null;
        excerpt?: string | null;
        heroImage?: string | null;
        heroCtaLabel?: string | null;
        heroCtaRoute?: string | null;
        heroCtaUrl?: string | null;
        content?: JSONContent | null;
        metaTitle?: string | null;
        metaDescription?: string | null;
    };
}

type PageProps = Props;

export default function CmsPageShow() {
    const { props } = usePage<PageProps>();
    const { page } = props;

    const renderedContent = useMemo(() => {
        if (!page.content) {
            return null;
        }

        try {
            return generateHTML(page.content, [StarterKit, LinkExtension]);
        } catch (error) {
            console.error('Failed to render page content', error);
            return null;
        }
    }, [page.content]);

    const fallbackCta = `${homeRoute().url}#resources`;

    return (
        <LandingLayout>
            <Head title={page.metaTitle ?? page.title}>
                {page.metaDescription && (
                    <meta name="description" content={page.metaDescription} />
                )}
            </Head>

            <section className="relative mx-auto w-full max-w-5xl px-4 py-20">
                <div className="rounded-3xl border border-orange-100 bg-gradient-to-br from-orange-500 via-orange-500/70 to-orange-400 p-px">
                    <div className="rounded-[calc(theme(borderRadius.3xl)-1px)] bg-white/95 p-10 text-neutral-900">
                        <Badge className="bg-orange-500/10 text-orange-600">Resource</Badge>
                        <h1 className="mt-6 text-4xl font-bold text-neutral-900">{page.title}</h1>
                        {page.subtitle && (
                            <p className="mt-4 max-w-3xl text-lg text-neutral-600">{page.subtitle}</p>
                        )}
                        {page.heroCtaLabel && (
                            <Button asChild className="mt-6 bg-orange-600 hover:bg-orange-600/90">
                                <Link href={page.heroCtaUrl ?? fallbackCta}>
                                    {page.heroCtaLabel}
                                    <ArrowRight className="ml-2 size-4" />
                                </Link>
                            </Button>
                        )}
                    </div>
                </div>
            </section>

            <section className="mx-auto w-full max-w-4xl px-4 pb-24">
                <article className="prose prose-lg max-w-none text-neutral-800">
                    {renderedContent ? (
                        <div dangerouslySetInnerHTML={{ __html: renderedContent }} />
                    ) : (
                        <p className="text-neutral-600">Content coming soon.</p>
                    )}
                </article>
            </section>
        </LandingLayout>
    );
}
