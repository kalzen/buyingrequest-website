<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\MediaFile;
use App\Models\MediaFolder;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Inertia\Response;

class MediaController extends Controller
{
    public function index(Request $request): Response
    {
        $folders = MediaFolder::with('children:id,name,parent_id')
            ->whereNull('parent_id')
            ->get()
            ->map(fn (MediaFolder $folder) => $this->transformFolder($folder));

        $files = MediaFile::with('folder')
            ->latest()
            ->take(20)
            ->get()
            ->map(fn (MediaFile $file) => $this->transformFile($file));

        return Inertia::render('admin/media/index', [
            'folders' => $folders,
            'recentFiles' => $files,
        ]);
    }

    public function storeFolder(Request $request): RedirectResponse
    {
        $data = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'parent_id' => ['nullable', 'exists:media_folders,id'],
        ]);

        MediaFolder::create([
            'name' => $data['name'],
            'parent_id' => $data['parent_id'] ?? null,
            'disk' => 'public',
            'slug' => Str::slug($data['name'] . '-' . Str::random(4)),
        ]);

        return back()->with('status', 'Folder created');
    }

    public function upload(Request $request): RedirectResponse
    {
        $data = $request->validate([
            'folder_id' => ['nullable', 'exists:media_folders,id'],
            'file' => ['required', 'file', 'max:5120'],
        ]);

        $file = $data['file'];
        $folder = $data['folder_id'] ? MediaFolder::find($data['folder_id']) : null;
        $directory = $folder ? ('media/' . $folder->slug) : 'media';

        $storedPath = $file->store($directory, 'public');

        MediaFile::create([
            'folder_id' => $folder?->id,
            'disk' => 'public',
            'path' => $storedPath,
            'filename' => $file->getClientOriginalName(),
            'mime_type' => $file->getMimeType(),
            'size' => $file->getSize(),
        ]);

        return back()->with('status', 'File uploaded');
    }

    public function destroyFile(MediaFile $mediaFile): RedirectResponse
    {
        Storage::disk($mediaFile->disk)->delete($mediaFile->path);
        $mediaFile->delete();

        return back()->with('status', 'File removed');
    }

    public function destroyFolder(MediaFolder $mediaFolder): RedirectResponse
    {
        foreach ($mediaFolder->files as $file) {
            Storage::disk($file->disk)->delete($file->path);
            $file->delete();
        }

        $mediaFolder->delete();

        return back()->with('status', 'Folder removed');
    }

    private function transformFolder(MediaFolder $folder): array
    {
        return [
            'id' => $folder->id,
            'name' => $folder->name,
            'slug' => $folder->slug,
            'children' => $folder->children->map(fn (MediaFolder $child) => [
                'id' => $child->id,
                'name' => $child->name,
                'slug' => $child->slug,
            ]),
        ];
    }

    private function transformFile(MediaFile $file): array
    {
        return [
            'id' => $file->id,
            'filename' => $file->filename,
            'url' => Storage::disk($file->disk)->url($file->path),
            'mime' => $file->mime_type,
            'size' => $file->size,
            'folder' => $file->folder?->name,
            'created_at' => $file->created_at?->toDateTimeString(),
        ];
    }
}
