import React from 'react';
import { StripeProvider } from 'react-stripe-elements'

import { Navbar, Sidebar, Footer } from './components';
import Routes from './routes';

const App = () => {
  return (
    <div className="container">
      <Navbar />
      <Sidebar />
      <StripeProvider apiKey="pk_test_jHnlCXdlJJf0KQk5xvXChCxa">
        <Routes />
      </StripeProvider>
      <div className="foot">
      <Footer className="footer" />
      </div>
    </div>
  );
};

export default App;
