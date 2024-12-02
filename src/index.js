import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';  // Optional: For styling (can be omitted if you don't need custom styles)
import App from './App';  // Import the main App component

// Render the App component inside the 'root' div in index.html
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')  // The id 'root' should match the id in your index.html file
);
