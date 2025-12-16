export const executeJavaScript = async (code) => {
  return new Promise((resolve) => {
    const iframe = document.createElement('iframe');
    iframe.style.display = 'none';
    document.body.appendChild(iframe);

    const win = iframe.contentWindow;
    const logs = [];

    // Override console.log
    win.console.log = (...args) => {
      logs.push(args.map(a => String(a)).join(' '));
    };

    try {
      win.eval(code);
      resolve({ output: logs.join('\n'), error: null });
    } catch (err) {
      resolve({ output: logs.join('\n'), error: err.toString() });
    } finally {
      document.body.removeChild(iframe);
    }
  });
};

let pyodideInstance = null;

export const executePython = async (code) => {
  if (!window.loadPyodide) {
    return { output: '', error: 'Pyodide not loaded yet' };
  }

  if (!pyodideInstance) {
    pyodideInstance = await window.loadPyodide();
  }

  try {
    // Capturing stdout
    pyodideInstance.setStdout({ batched: (str) => console.log('pyout:', str) });
    
    // Simplistic capture via redirecting sys.stdout
    // A better way in pyodide is using setStdout but let's do a quick wrapper if needed.
    // Actually, let's use the Python-side capture for reliability.
    
    await pyodideInstance.runPythonAsync(`
      import sys
      from io import StringIO
      sys.stdout = StringIO()
    `);
    
    await pyodideInstance.runPythonAsync(code);
    
    const output = await pyodideInstance.runPythonAsync('sys.stdout.getvalue()');
    return { output, error: null };
  } catch (err) {
    return { output: '', error: err.toString() };
  }
};
