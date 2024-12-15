
import { useState } from 'react';
import { Landing } from './components/Landing';
import Marketplace from './components/Marketplace';
import { LucidProvider } from './context/LucidProvider';

function App() {
  const [showMarketplace, setShowMarketplace] = useState(false);

  return (
    <LucidProvider>
      <div className="min-h-screen bg-gradient-to-br from-accent-purple via-accent-pink to-accent-yellow">
        {showMarketplace ? (
          <Marketplace />
        ) : (
          <Landing onEnterMarketplace={() => setShowMarketplace(true)} />
        )}
      </div>
    </LucidProvider>
  );
}

export default App;
