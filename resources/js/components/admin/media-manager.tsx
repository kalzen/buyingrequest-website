import { useForm, router } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Image as ImageIcon, Folder, Trash2, Upload } from 'lucide-react';
import { destroy as destroyFileRoute } from '@/routes/admin/media/files';
import { destroy as destroyFolderRoute, store as storeFolderRoute } from '@/routes/admin/media/folders';
import { store as uploadMediaRoute } from '@/routes/admin/media/uploads';

interface MediaFolder {
    id: number;
    name: string;
    slug: string;
    children?: MediaFolder[];
}

interface MediaFile {
    id: number;
    filename: string;
    url: string;
    mime: string | null;
    size: number;
    folder?: string | null;
    created_at?: string | null;
}

interface MediaManagerProps {
    folders: MediaFolder[];
    recentFiles: MediaFile[];
}

export function MediaManager({ folders, recentFiles }: MediaManagerProps) {
    const [selectedFolder, setSelectedFolder] = useState<number | null>(null);
    const { data, setData, post, processing, reset } = useForm({
        name: '',
        parent_id: selectedFolder as number | null,
    });

    const [file, setFile] = useState<File | null>(null);

    const handleCreateFolder = () => {
        post(storeFolderRoute(), {
            preserveScroll: true,
            onSuccess: () => {
                reset('name');
            },
        });
    };

    const handleUpload = () => {
        if (!file) return;

        const formData = new FormData();
        if (selectedFolder) {
            formData.append('folder_id', String(selectedFolder));
        }
        formData.append('file', file);

        router.post(uploadMediaRoute(), formData, {
            forceFormData: true,
            preserveScroll: true,
            onSuccess: () => setFile(null),
        });
    };

    const deleteFile = (id: number) => {
        router.delete(destroyFileRoute(id), {
            preserveScroll: true,
        });
    };

    const deleteFolder = (id: number) => {
        router.delete(destroyFolderRoute(id), {
            preserveScroll: true,
            onSuccess: () => {
                if (selectedFolder === id) {
                    setSelectedFolder(null);
                }
            },
        });
    };

    const renderTree = (nodes: MediaFolder[]) => (
        <ul className="space-y-1 text-sm text-neutral-200">
            {nodes.map((node) => (
                <li key={node.id}>
                    <button
                        type="button"
                        onClick={() => setSelectedFolder(node.id)}
                        className={`flex w-full items-center justify-between rounded-md px-2 py-1 hover:bg-neutral-800 ${selectedFolder === node.id ? 'bg-neutral-800 text-orange-400' : ''}`}
                    >
                        <span className="flex items-center gap-2">
                            <Folder className="size-4" />
                            {node.name}
                        </span>
                        <Trash2
                            className="size-4 text-neutral-500 hover:text-red-400"
                            onClick={(event) => {
                                event.stopPropagation();
                                deleteFolder(node.id);
                            }}
                        />
                    </button>
                    {node.children && node.children.length > 0 && (
                        <div className="ml-5 mt-1 border-l border-neutral-800 pl-2">
                            {renderTree(node.children)}
                        </div>
                    )}
                </li>
            ))}
        </ul>
    );

    return (
        <div className="grid gap-6 lg:grid-cols-[280px,1fr]">
            <Card className="border-white/10 bg-neutral-900/70">
                <CardHeader>
                    <CardTitle className="text-sm text-neutral-200">Folders</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 text-sm">
                    <div className="space-y-2">
                        <Label htmlFor="folder-name">Create folder</Label>
                        <Input
                            id="folder-name"
                            value={data.name}
                            onChange={(event) => setData('name', event.target.value)}
                            placeholder="Folder name"
                        />
                        <Button
                            onClick={handleCreateFolder}
                            disabled={!data.name || processing}
                            size="sm"
                            className="w-full"
                        >
                            Create
                        </Button>
                    </div>
                    <Separator className="bg-white/10" />
                    <ScrollArea className="h-64 pr-2">
                        {folders.length ? (
                            renderTree(folders)
                        ) : (
                            <p className="text-xs text-neutral-500">No folders yet.</p>
                        )}
                    </ScrollArea>
                </CardContent>
            </Card>

            <Card className="border-white/10 bg-neutral-900/70">
                <CardHeader>
                    <CardTitle className="text-sm text-neutral-200">Recent uploads</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="flex flex-col gap-2 rounded-lg border border-white/10 bg-neutral-900/60 p-4">
                        <Label className="text-sm text-neutral-300">Upload new file</Label>
                        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                            <Input
                                type="file"
                                onChange={(event) => {
                                    const files = event.target.files;
                                    setFile(files && files.length ? files[0] : null);
                                }}
                                accept="image/*"
                            />
                            <Button
                                type="button"
                                onClick={handleUpload}
                                disabled={!file}
                                className="gap-2"
                            >
                                <Upload className="size-4" />
                                Upload
                            </Button>
                        </div>
                        {selectedFolder && (
                            <Badge variant="secondary" className="w-fit bg-orange-500/20 text-orange-300">
                                Target folder #{selectedFolder}
                            </Badge>
                        )}
                    </div>

                    <ScrollArea className="max-h-[420px] pr-2">
                        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                            {recentFiles.map((media) => (
                                <div
                                    key={media.id}
                                    className="flex flex-col gap-2 rounded-lg border border-white/10 bg-neutral-900/60 p-3"
                                >
                                    <div className="relative aspect-video overflow-hidden rounded-md bg-neutral-800">
                                        <img
                                            src={media.url}
                                            alt={media.filename}
                                            className="absolute inset-0 h-full w-full object-cover"
                                        />
                                    </div>
                                    <div className="space-y-1 text-xs text-neutral-400">
                                        <p className="font-medium text-neutral-200">{media.filename}</p>
                                        <p>{(media.size / 1024).toFixed(1)} KB</p>
                                        {media.folder && <p>Folder: {media.folder}</p>}
                                    </div>
                                    <Button
                                        variant="ghost"
                                        className="justify-start gap-2 text-red-300 hover:bg-red-500/10"
                                        onClick={() => deleteFile(media.id)}
                                    >
                                        <Trash2 className="size-4" />
                                        Delete
                                    </Button>
                                </div>
                            ))}
                            {recentFiles.length === 0 && (
                                <div className="col-span-full flex items-center justify-center rounded-lg border border-dashed border-white/10 p-6 text-sm text-neutral-500">
                                    <ImageIcon className="mr-2 size-4" />
                                    No files uploaded yet.
                                </div>
                            )}
                        </div>
                    </ScrollArea>
                </CardContent>
            </Card>
        </div>
    );
}

