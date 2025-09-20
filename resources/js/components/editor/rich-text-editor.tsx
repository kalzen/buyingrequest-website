import { useEditor, EditorContent, JSONContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Link from '@tiptap/extension-link';
import Placeholder from '@tiptap/extension-placeholder';
import { Toggle } from '@/components/ui/toggle';
import { Bold, Italic, List, ListOrdered, Quote, Heading } from 'lucide-react';
import { useEffect } from 'react';

interface RichTextEditorProps {
    value?: JSONContent | null;
    onChange?: (content: JSONContent) => void;
    placeholder?: string;
}

export function RichTextEditor({ value, onChange, placeholder }: RichTextEditorProps) {
    const editor = useEditor({
        extensions: [
            StarterKit.configure({
                heading: {
                    levels: [2, 3, 4],
                },
                bulletList: { keepMarks: true },
                orderedList: { keepMarks: true },
            }),
            Link.configure({ openOnClick: false, autolink: true }),
            Placeholder.configure({
                placeholder: placeholder ?? 'Write your content...'
            }),
        ],
        content: value ?? undefined,
        editorProps: {
            attributes: {
                class: 'prose prose-invert max-w-none min-h-[240px] text-base focus:outline-none'
            },
        },
        onUpdate({ editor }) {
            onChange?.(editor.getJSON());
        },
    });

    useEffect(() => {
        if (!editor) return;
        if (value) {
            editor.commands.setContent(value);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [editor]);

    if (!editor) {
        return null;
    }

    return (
        <div className="rounded-xl border border-white/10 bg-neutral-900/40">
            <div className="flex flex-wrap items-center gap-2 border-b border-white/10 px-3 py-2">
                <Toggle
                    size="sm"
                    pressed={editor.isActive('bold')}
                    onPressedChange={() => editor.chain().focus().toggleBold().run()}
                    aria-label="Bold"
                >
                    <Bold className="size-4" />
                </Toggle>
                <Toggle
                    size="sm"
                    pressed={editor.isActive('italic')}
                    onPressedChange={() => editor.chain().focus().toggleItalic().run()}
                    aria-label="Italic"
                >
                    <Italic className="size-4" />
                </Toggle>
                <Toggle
                    size="sm"
                    pressed={editor.isActive('heading', { level: 2 })}
                    onPressedChange={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                    aria-label="Heading"
                >
                    <Heading className="size-4" />
                </Toggle>
                <Toggle
                    size="sm"
                    pressed={editor.isActive('bulletList')}
                    onPressedChange={() => editor.chain().focus().toggleBulletList().run()}
                    aria-label="Bulleted list"
                >
                    <List className="size-4" />
                </Toggle>
                <Toggle
                    size="sm"
                    pressed={editor.isActive('orderedList')}
                    onPressedChange={() => editor.chain().focus().toggleOrderedList().run()}
                    aria-label="Numbered list"
                >
                    <ListOrdered className="size-4" />
                </Toggle>
                <Toggle
                    size="sm"
                    pressed={editor.isActive('blockquote')}
                    onPressedChange={() => editor.chain().focus().toggleBlockquote().run()}
                    aria-label="Quote"
                >
                    <Quote className="size-4" />
                </Toggle>
            </div>
            <div className="px-4 py-3">
                <EditorContent editor={editor} />
            </div>
        </div>
    );
}
