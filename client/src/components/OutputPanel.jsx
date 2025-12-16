import React from 'react';

/**
 * OutputPanel component to display execution results.
 * @param {string} output - Standard output from code execution.
 * @param {string|null} error - Error message, if any.
 */
function OutputPanel({ output, error }) {
    return (
        <div className="output-panel">
            <div className="output-header">Console Output</div>
            <pre className="output-content">
                {error ? (
                    <span className="output-error">{error}</span>
                ) : (
                    output || 'Run your code to see output here...'
                )}
            </pre>
        </div>
    );
}

export default OutputPanel;
