import React, { useRef } from 'react'
import { Editor } from '@tinymce/tinymce-react'

export default function TinyMCE ({ field }) {
    const editorRef = useRef(null)
    return (
        <Editor
            apiKey={import.meta.env.VITE_TINYMCE_API_KEY}
            onInit={(evt, editor) => (editorRef.current = editor)}
            value={field.value}
            onEditorChange={content => field.onChange(content)}
            init={{
                height: 500,
                menubar: false,
                plugins: [
                    'advlist',
                    'autolink',
                    'lists',
                    'link',
                    'image',
                    'charmap',
                    'preview',
                    'anchor',
                    'searchreplace',
                    'visualblocks',
                    'code',
                    'fullscreen',
                    'insertdatetime',
                    'media',
                    'table',
                    'code',
                    'help',
                    'wordcount',
                ],
                toolbar:
                    'undo redo | blocks | ' +
                    'bold italic forecolor | alignleft aligncenter ' +
                    'alignright alignjustify | bullist numlist outdent indent | ' +
                    'removeformat | help',
                content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
            }}
        />
    )
}
