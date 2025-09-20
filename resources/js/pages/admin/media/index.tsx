import AdminLayout from '@/layouts/admin-layout';
import { MediaManager } from '@/components/admin/media-manager';
import { usePage } from '@inertiajs/react';

interface Props {
    folders: Array<{
        id: number;
        name: string;
        slug: string;
        children?: Array<{ id: number; name: string; slug: string }>;
    }>;
    recentFiles: Array<{
        id: number;
        filename: string;
        url: string;
        mime: string | null;
        size: number;
        folder?: string | null;
        created_at?: string | null;
    }>;
}

type PageProps = Props;

export default function AdminMediaIndex() {
    const { props } = usePage<PageProps>();

    return (
        <AdminLayout title="Media library">
            <MediaManager folders={props.folders} recentFiles={props.recentFiles} />
        </AdminLayout>
    );
}
