import React, { useState } from 'react';
import ChatApp from './components/chat';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CreateRoom from './components/CreateRoom';


export default function App() {
  const [code, setCode] = useState('');
  console.log(code);

  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<CreateRoom onSetData={setCode} />} />
        <Route exact path="/chat" element={<ChatApp />} />
  
      </Routes>
    </Router>
  );
}
