import React from 'react';
import Navbar from './components/Navbar';
import IntroSection from './components/IntroSection';
import FeaturesSection from './components/FeaturesSection';
import AboutSection from './components/AboutSection';
import './App.css'; // Main CSS file for styling

function App() {
  return (
    <div className="App">
      <Navbar />
      <IntroSection />
      <FeaturesSection />
      <AboutSection />
    </div>
  );
}

export default App;
