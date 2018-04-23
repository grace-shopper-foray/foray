import React from 'react';

import { Navbar, Sidebar, Footer } from './components';
import Routes from './routes';

const App = () => {
  return (
    <div className="container">
      <Navbar />
      <Sidebar />
      <Routes />
      <Footer className="footer"/>
    </div>
  );
};

export default App;
