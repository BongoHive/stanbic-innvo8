import React from 'react';
import './App.css';
import Navbar from './Components/Navbar';
import Section from './Components/Section';
import dummyText from './DummyText';

function Homepage() {
  return (
    <div className="App">
      <Navbar />
      <Section title="Section 1" subtitle={dummyText} dark id="section1" />
      <Section
        title="Section 2"
        subtitle={dummyText}
        dark={false}
        id="section2"
      />
      <Section title="Section 3" subtitle={dummyText} dark id="section3" />
      <Section
        title="Section 4"
        subtitle={dummyText}
        dark={false}
        id="section4"
      />
      <Section title="Section 5" subtitle={dummyText} dark id="section5" />
    </div>
  );
}

export default Homepage;
