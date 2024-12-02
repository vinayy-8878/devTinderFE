import React, { useEffect } from 'react';

function App() {
  // useEffect hook will run when the component is mounted (like componentDidMount)
  useEffect(() => {
    alert('Welcome to DevTinder FE!');
  }, []); // Empty dependency array means it will only run once after the component mounts.

  return (
    <div className="App">
      <h1>Hello, DevTinder!</h1>
    </div>
  );
}

export default App;
