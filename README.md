# Coding Interview Platform

A full-stack online coding interview platform with real-time collaboration, syntax highlighting, and in-browser code execution.

## Features

- **Shareable Interview Links**: Generate unique session IDs for each interview
- **Real-time Collaboration**: Code syncs between participants via Socket.io
- **Syntax Highlighting**: Monaco Editor with JavaScript and Python support
- **In-browser Code Execution**: 
  - JavaScript runs in a sandboxed iframe
  - Python runs via Pyodide (WebAssembly)
- **Three-panel UI**: Problem description, code editor, and console output
- **No Authentication Required**: Sessions are ephemeral (URL-based)

## Tech Stack

- **Frontend**: React + Vite
- **Editor**: Monaco Editor (`@monaco-editor/react`)
- **Backend**: Express + Socket.io
- **Python Runtime**: Pyodide (WASM)
- **Testing**: Jest + Supertest (backend), Playwright (E2E)

## Project Structure

```
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/     # React components
│   │   ├── utils/          # Code execution utilities
│   │   └── App.jsx         # Main application
│   └── package.json
├── server/                 # Express backend
│   ├── index.js            # Server entry point
│   ├── app.js              # Express app
│   └── app.test.js         # Backend tests
├── e2e/                    # Playwright E2E tests
├── package.json            # Root workspace config
└── playwright.config.js    # Playwright configuration
```

## Getting Started

### Prerequisites

- Node.js 18+
- npm 9+

### Installation

```bash
# Install all dependencies (client + server)
npm install
```

### Running the Application

```bash
# Start both client and server concurrently
npm run dev
```

The application will be available at:
- **Frontend**: http://localhost:5173
- **Backend**: http://localhost:3000

### Building for Production

```bash
npm run build
```

## Testing

### Backend Tests (Jest + Supertest)

```bash
# Run backend tests
cd server && npm test
```

### End-to-End Tests (Playwright)

```bash
# Run E2E tests
npm run test:e2e
```

The test script installs Playwright browsers automatically on first run.

## Usage

1. **Start an Interview**: Navigate to the app to get a unique session URL
2. **Share the Link**: Copy the URL and send it to your candidate
3. **Write Code**: Select JavaScript or Python and start coding
4. **Run Code**: Click "Run Code" to execute and see output
5. **Collaborate**: Code changes sync in real-time between participants

## Security Considerations

- **No server-side code execution**: All code runs in the browser
- **JavaScript sandboxing**: JS code runs in an isolated iframe
- **Python via WebAssembly**: Pyodide runs in a sandboxed WASM environment
- **Ephemeral sessions**: No data persistence, no authentication required

## Manual Configuration

If deploying to production:

1. Update `server/index.js` CORS settings to restrict origins
2. Configure `client/vite.config.js` proxy for production URLs
3. Set `NODE_ENV=production` environment variable

## License

MIT
