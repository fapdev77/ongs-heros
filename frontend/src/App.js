import React from 'react';
// import do css global
import './global.css';
// import do componemte Logon 
// nao preciso especificar o arquivo index.js pois ele é o padrao que o react sempre usa.

import Routes from './routes';

function App() {
  return (
    <Routes/>
  );
}

export default App;
