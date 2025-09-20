import { useForm, usePage, router } from '@inertiajs/react';
import AdminLayout from '@/layouts/admin-layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { store as adminSlidesStore, update as adminSlidesUpdate, destroy as adminSlidesDestroy } from '@/routes/admin/slides';

interface Slide {
    id: number;
    title: string;
    subtitle: string | null;
    cta_label: string | null;
    cta_route: string | null;
    image_url: string;
    position: number;
    is_active: boolean;
}

interface SlidesProps {
    slides: Slide[];
}

type PageProps = SlidesProps;

export default function AdminSlidesIndex() {
    const { props } = usePage<PageProps>();
    const form = useForm({
        title: '',
        subtitle: '',
        cta_label: '',
        cta_route: 'home',
        image_url: '',
        position: props.slides.length + 1,
        is_active: true,
    });

    const createSlide = () => {
        form.post(adminSlidesStore(), {
            preserveScroll: true,
            onSuccess: () => form.reset(),
        });
    };

    const updateSlide = (slide: Slide, data: Partial<Slide>) => {
        router.put(
            adminSlidesUpdate(slide.id),
            {
                ...slide,
                ...data,
            },
            { preserveScroll: true },
        );
    };

    const removeSlide = (slide: Slide) => {
        router.delete(adminSlidesDestroy(slide.id), {
            preserveScroll: true,
        });
    };

    return (
        <AdminLayout title="Homepage slides">
            <div className="grid gap-6 lg:grid-cols-[320px,1fr]">
                <Card className="border-white/10 bg-neutral-900/70">
                    <CardHeader>
                        <CardTitle className="text-sm text-neutral-300">Add slide</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                        <div className="grid gap-2">
                            <Label htmlFor="title">Title</Label>
                            <Input
                                id="title"
                                value={form.data.title}
                                onChange={(event) => form.setData('title', event.target.value)}
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="subtitle">Subtitle</Label>
                            <Input
                                id="subtitle"
                                value={form.data.subtitle}
                                onChange={(event) => form.setData('subtitle', event.target.value)}
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="image">Image URL</Label>
                            <Input
                                id="image"
                                value={form.data.image_url}
                                onChange={(event) => form.setData('image_url', event.target.value)}
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="cta">CTA label</Label>
                            <Input
                                id="cta"
                                value={form.data.cta_label}
                                onChange={(event) => form.setData('cta_label', event.target.value)}
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="route">Route name</Label>
                            <Input
                                id="route"
                                value={form.data.cta_route ?? ''}
                                onChange={(event) => form.setData('cta_route', event.target.value)}
                            />
                        </div>
                        <Button onClick={createSlide} disabled={form.processing} className="w-full">
                            Create slide
                        </Button>
                    </CardContent>
                </Card>

                <div className="space-y-4">
                    {props.slides.map((slide) => (
                        <Card key={slide.id} className="border-white/10 bg-neutral-900/70">
                            <CardHeader className="flex items-center justify-between">
                                <div>
                                    <CardTitle className="text-sm text-neutral-200">{slide.title}</CardTitle>
                                    <p className="text-xs text-neutral-500">Position {slide.position}</p>
                                </div>
                                <Badge variant="secondary" className={slide.is_active ? 'bg-emerald-500/20 text-emerald-300' : 'bg-neutral-700 text-neutral-200'}>
                                    {slide.is_active ? 'Active' : 'Hidden'}
                                </Badge>
                            </CardHeader>
                            <CardContent className="space-y-3 text-sm text-neutral-300">
                                <div className="grid grid-cols-2 gap-3">
                                    <div className="grid gap-2">
                                        <Label htmlFor={`title-${slide.id}`}>Title</Label>
                                        <Input
                                            id={`title-${slide.id}`}
                                            defaultValue={slide.title}
                                            onBlur={(event) => updateSlide(slide, { title: event.target.value })}
                                        />
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor={`subtitle-${slide.id}`}>Subtitle</Label>
                                        <Input
                                            id={`subtitle-${slide.id}`}
                                            defaultValue={slide.subtitle ?? ''}
                                            onBlur={(event) => updateSlide(slide, { subtitle: event.target.value })}
                                        />
                                    </div>
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor={`image-${slide.id}`}>Image URL</Label>
                                    <Input
                                        id={`image-${slide.id}`}
                                        defaultValue={slide.image_url}
                                        onBlur={(event) => updateSlide(slide, { image_url: event.target.value })}
                                    />
                                </div>
                                <div className="grid grid-cols-2 gap-3">
                                    <div className="grid gap-2">
                                        <Label htmlFor={`ctaLabel-${slide.id}`}>CTA label</Label>
                                        <Input
                                            id={`ctaLabel-${slide.id}`}
                                            defaultValue={slide.cta_label ?? ''}
                                            onBlur={(event) => updateSlide(slide, { cta_label: event.target.value })}
                                        />
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor={`ctaRoute-${slide.id}`}>Route name</Label>
                                        <Input
                                            id={`ctaRoute-${slide.id}`}
                                            defaultValue={slide.cta_route ?? ''}
                                            onBlur={(event) => updateSlide(slide, { cta_route: event.target.value })}
                                        />
                                    </div>
                                </div>
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <Switch
                                            checked={slide.is_active}
                                            onCheckedChange={(checked) => updateSlide(slide, { is_active: checked })}
                                        />
                                        <span>Visible</span>
                                    </div>
                                    <Button
                                        variant="ghost"
                                        className="text-red-300 hover:bg-red-500/10"
                                        onClick={() => removeSlide(slide)}
                                    >
                                        Delete
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                    {props.slides.length === 0 && (
                        <div className="rounded-lg border border-dashed border-white/10 p-6 text-sm text-neutral-500">
                            No slides configured yet.
                        </div>
                    )}
                </div>
            </div>
        </AdminLayout>
    );
}
