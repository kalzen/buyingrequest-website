import { useEffect, useState } from 'react';
import AdminLayout from '@/layouts/admin-layout';
import { useForm, usePage, router } from '@inertiajs/react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RichTextEditor } from '@/components/editor/rich-text-editor';
import { Textarea } from '@/components/ui/textarea';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Switch } from '@/components/ui/switch';
import { index as adminPagesIndex, store as adminPagesStore, update as adminPagesUpdate, destroy as adminPagesDestroy } from '@/routes/admin/pages';
import type { JSONContent } from '@tiptap/react';

interface AdminPageSummary {
    id: number;
    title: string;
    slug: string;
    status: string;
    updated_at: string | null;
    published_at: string | null;
}

interface Pagination<T> {
    data: T[];
}

interface EditingPage {
    id: number;
    title: string;
    slug: string;
    subtitle?: string | null;
    hero_image_url?: string | null;
    hero_cta_label?: string | null;
    hero_cta_route?: string | null;
    excerpt?: string | null;
    content?: JSONContent | null;
    status: string;
    meta_title?: string | null;
    meta_description?: string | null;
    meta?: Record<string, unknown> | null;
}

interface PageIndexProps {
    pages: Pagination<AdminPageSummary>;
    editingPage?: EditingPage | null;
}

type PageProps = PageIndexProps;

export default function AdminPagesIndex() {
    const { props } = usePage<PageProps>();
    const [open, setOpen] = useState(false);

    const form = useForm({
        title: '',
        slug: '',
        subtitle: '',
        hero_image_url: '',
        hero_cta_label: '',
        hero_cta_route: 'pages.show',
        excerpt: '',
        content: null as JSONContent | null,
        status: 'draft',
        meta_title: '',
        meta_description: '',
        meta: {} as Record<string, unknown>,
    });

    useEffect(() => {
        if (props.editingPage) {
            const page = props.editingPage;
            form.setData({
                title: page.title,
                slug: page.slug,
                subtitle: page.subtitle ?? '',
                hero_image_url: page.hero_image_url ?? '',
                hero_cta_label: page.hero_cta_label ?? '',
                hero_cta_route: page.hero_cta_route ?? 'pages.show',
                excerpt: page.excerpt ?? '',
                content: page.content ?? null,
                status: page.status,
                meta_title: page.meta_title ?? '',
                meta_description: page.meta_description ?? '',
                meta: page.meta ?? {},
            });
            setOpen(true);
        }
    }, [props.editingPage]);

    const openCreate = () => {
        router.get(adminPagesIndex(), {}, {
            preserveState: true,
            preserveScroll: true,
            onSuccess: () => {
                form.reset();
                form.setData('status', 'draft');
                setOpen(true);
            },
        });
    };

    const openEdit = (page: AdminPageSummary) => {
        router.get(adminPagesIndex(), { edit: page.id }, {
            preserveState: true,
            preserveScroll: true,
        });
    };

    const submit = () => {
        const payload = {
            ...form.data,
            content: form.data.content ?? undefined,
        };

        if (props.editingPage) {
            form.transform(() => payload).put(adminPagesUpdate(props.editingPage.id), {
                preserveScroll: true,
                onSuccess: () => setOpen(false),
            });
        } else {
            form.transform(() => payload).post(adminPagesStore(), {
                preserveScroll: true,
                onSuccess: () => setOpen(false),
            });
        }
    };

    const removePage = (id: number) => {
        router.delete(adminPagesDestroy(id), {
            preserveScroll: true,
        });
    };

    return (
        <AdminLayout title="Pages">
            <Card className="border-white/10 bg-neutral-900/70">
                <CardHeader className="flex items-center justify-between">
                    <CardTitle className="text-sm text-neutral-300">Content pages</CardTitle>
                    <Button size="sm" onClick={openCreate}>
                        New page
                    </Button>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Title</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>Updated</TableHead>
                                <TableHead></TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {props.pages.data.map((page) => (
                                <TableRow key={page.id}>
                                    <TableCell>
                                        <div className="font-medium text-neutral-200">{page.title}</div>
                                        <div className="text-xs text-neutral-500">/{page.slug}</div>
                                    </TableCell>
                                    <TableCell>
                                        <Badge
                                            variant="secondary"
                                            className={page.status === 'published' ? 'bg-emerald-500/20 text-emerald-300' : 'bg-neutral-700 text-neutral-200'}
                                        >
                                            {page.status}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="text-sm text-neutral-400">
                                        {page.updated_at ?? '—'}
                                    </TableCell>
                                    <TableCell className="flex gap-2">
                                        <Button size="sm" variant="secondary" onClick={() => openEdit(page)}>
                                            Edit
                                        </Button>
                                        <Button
                                            size="sm"
                                            variant="ghost"
                                            className="text-red-300 hover:bg-red-500/10"
                                            onClick={() => removePage(page.id)}
                                        >
                                            Delete
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>

            <Dialog
                open={open}
                onOpenChange={(value) => {
                    setOpen(value);
                    if (!value) {
                        router.get(adminPagesIndex(), {}, {
                            preserveScroll: true,
                            preserveState: true,
                            only: ['pages', 'editingPage'],
                        });
                    }
                }}
            >
                <DialogContent className="max-w-3xl border-white/10 bg-neutral-900 text-white">
                    <DialogHeader>
                        <DialogTitle className="text-lg font-semibold">
                            {props.editingPage ? 'Edit page' : 'Create page'}
                        </DialogTitle>
                    </DialogHeader>
                    <div className="grid gap-3">
                        <div className="grid gap-2">
                            <Label htmlFor="title">Title</Label>
                            <Input
                                id="title"
                                value={form.data.title}
                                onChange={(event) => form.setData('title', event.target.value)}
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="slug">Slug</Label>
                            <Input
                                id="slug"
                                value={form.data.slug}
                                onChange={(event) => form.setData('slug', event.target.value)}
                                placeholder="Auto-generated when blank"
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="excerpt">Excerpt</Label>
                            <Textarea
                                id="excerpt"
                                value={form.data.excerpt ?? ''}
                                onChange={(event) => form.setData('excerpt', event.target.value)}
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label>Content</Label>
                            <RichTextEditor
                                value={form.data.content}
                                onChange={(value) => form.setData('content', value)}
                            />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="grid gap-2">
                                <Label htmlFor="heroImage">Hero image URL</Label>
                                <Input
                                    id="heroImage"
                                    value={form.data.hero_image_url ?? ''}
                                    onChange={(event) => form.setData('hero_image_url', event.target.value)}
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="ctaLabel">CTA label</Label>
                                <Input
                                    id="ctaLabel"
                                    value={form.data.hero_cta_label ?? ''}
                                    onChange={(event) => form.setData('hero_cta_label', event.target.value)}
                                />
                            </div>
                        </div>
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <Switch
                                    checked={form.data.status === 'published'}
                                    onCheckedChange={(checked) =>
                                        form.setData('status', checked ? 'published' : 'draft')
                                    }
                                />
                                <span className="text-sm text-neutral-300">Published</span>
                            </div>
                            <Button onClick={submit} disabled={form.processing}>
                                {props.editingPage ? 'Save changes' : 'Create page'}
                            </Button>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        </AdminLayout>
    );
}


