import React from 'react';
import Editor from '@monaco-editor/react';

/**
 * CodeEditor component wrapping Monaco Editor.
 * @param {string} value - Current code content.
 * @param {(val: string) => void} onChange - Callback when code changes.
 * @param {string} language - Language mode (javascript, python).
 */
function CodeEditor({ value, onChange, language }) {
    const handleEditorChange = (val) => {
        if (onChange) {
            onChange(val);
        }
    };

    return (
        <Editor
            height="100%"
            language={language}
            theme="vs-dark"
            value={value}
            onChange={handleEditorChange}
            options={{
                minimap: { enabled: false },
                fontSize: 14,
                automaticLayout: true,
                scrollBeyondLastLine: false,
            }}
        />
    );
}

export default CodeEditor;
