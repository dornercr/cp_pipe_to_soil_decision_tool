import React, { useState } from 'react';
import Introduction from './Introduction';
import DecisionTool from './DecisionTool';

function App() {
  const [showTool, setShowTool] = useState(false);

  const containerStyle = { maxWidth: '1000px', margin: 'auto', padding: '20px' };

  // A callback function to start the tool
  const startTool = () => setShowTool(true);

  return (
      <div style={containerStyle}>
        {!showTool && <Introduction onStartTool={startTool} />}
        {showTool && <DecisionTool />}
      </div>
  );
}

export default App;
