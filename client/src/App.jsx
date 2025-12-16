import React, { useState, useEffect, useCallback } from 'react';
import { io } from 'socket.io-client';
import { v4 as uuidv4 } from 'uuid';
import CodeEditor from './components/CodeEditor';
import OutputPanel from './components/OutputPanel';
import ProblemPanel from './components/ProblemPanel';
import { executeJavaScript, executePython } from './utils/executor';
import './App.css';

// Sample problem for the interview
const SAMPLE_PROBLEM = {
    title: 'Two Sum',
    description: `Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.

You may assume that each input would have exactly one solution, and you may not use the same element twice.

You can return the answer in any order.

Example:
Input: nums = [2,7,11,15], target = 9
Output: [0,1]
Explanation: Because nums[0] + nums[1] == 9, we return [0, 1].`
};

function App() {
    // Get session ID from URL or generate new one
    const getSessionId = () => {
        const path = window.location.pathname.slice(1);
        if (path) return path;
        const newId = uuidv4();
        window.history.replaceState(null, '', '/' + newId);
        return newId;
    };

    const [sessionId] = useState(getSessionId);
    const [code, setCode] = useState('// Write your solution here\n');
    const [language, setLanguage] = useState('javascript');
    const [output, setOutput] = useState('');
    const [error, setError] = useState(null);
    const [socket, setSocket] = useState(null);
    const [isRunning, setIsRunning] = useState(false);
    const [copied, setCopied] = useState(false);

    // Initialize socket connection
    useEffect(() => {
        const newSocket = io();
        setSocket(newSocket);

        newSocket.on('connect', () => {
            console.log('Connected to server');
            newSocket.emit('join-session', sessionId);
        });

        newSocket.on('code-update', (newCode) => {
            setCode(newCode);
        });

        return () => {
            newSocket.close();
        };
    }, [sessionId]);

    // Handle code changes
    const handleCodeChange = useCallback((newCode) => {
        setCode(newCode);
        if (socket) {
            socket.emit('code-update', { sessionId, code: newCode });
        }
    }, [socket, sessionId]);

    // Run code
    const handleRunCode = async () => {
        setIsRunning(true);
        setOutput('');
        setError(null);

        try {
            let result;
            if (language === 'javascript') {
                result = await executeJavaScript(code);
            } else {
                result = await executePython(code);
            }
            setOutput(result.output);
            setError(result.error);
        } catch (err) {
            setError(err.toString());
        } finally {
            setIsRunning(false);
        }
    };

    // Copy invite link
    const handleCopyLink = () => {
        const link = window.location.href;
        navigator.clipboard.writeText(link);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    // Handle language change
    const handleLanguageChange = (e) => {
        const newLang = e.target.value;
        setLanguage(newLang);
        // Set starter code based on language
        if (newLang === 'python') {
            setCode('# Write your solution here\n');
        } else {
            setCode('// Write your solution here\n');
        }
    };

    return (
        <div className="app">
            <header className="header">
                <h1 className="logo">CodeInterview</h1>
                <div className="header-actions">
                    <span className="session-id">Session: {sessionId.slice(0, 8)}...</span>
                    <button className="btn btn-secondary" onClick={handleCopyLink}>
                        {copied ? '✓ Copied!' : '📋 Copy Invite Link'}
                    </button>
                </div>
            </header>

            <main className="main-content">
                <div className="panel problem-container">
                    <ProblemPanel problem={SAMPLE_PROBLEM} />
                </div>

                <div className="panel editor-container">
                    <div className="editor-toolbar">
                        <select
                            className="language-select"
                            value={language}
                            onChange={handleLanguageChange}
                        >
                            <option value="javascript">JavaScript</option>
                            <option value="python">Python</option>
                        </select>
                        <button
                            className="btn btn-primary"
                            onClick={handleRunCode}
                            disabled={isRunning}
                        >
                            {isRunning ? '⏳ Running...' : '▶ Run Code'}
                        </button>
                    </div>
                    <div className="editor-wrapper">
                        <CodeEditor
                            value={code}
                            onChange={handleCodeChange}
                            language={language}
                        />
                    </div>
                </div>

                <div className="panel output-container">
                    <OutputPanel output={output} error={error} />
                </div>
            </main>
        </div>
    );
}

export default App;
