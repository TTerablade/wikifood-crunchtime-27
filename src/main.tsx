
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
// Import styles
import './index.css'

// Force cache invalidation with a stronger unique timestamp
console.log(`App initialized at: ${new Date().toISOString()} - v${Math.random().toString(36).substring(2)}`);

// Get the root element
const rootElement = document.getElementById("root");

// Check if root exists
if (!rootElement) {
  throw new Error("Root element not found");
}

// Create and render root
const root = createRoot(rootElement);
root.render(<App />);
