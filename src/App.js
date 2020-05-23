import React from 'react';
import { BrowserRouter as Router, Switch } from 'react-router-dom';

/* components */
import Header from './components/partials/Header';
import Footer from './components/partials/Footer';
import Ilustration from './components/partials/Ilustration';

/**Provider for page */
import PageContextProvider from './context/PageContext';
import Pages from './components/Pages';

function App() {
  return (
    <div className="il-app il-app--gradient__metal">
      <div className="il-container">
        <Router>
          <Header />
          <main>
            <div className="il-main il-container--wrapper">
              <PageContextProvider>
                <Switch>
                  <Ilustration />
                </Switch>
              </PageContextProvider>
              <Switch>
                <Pages />
              </Switch>
            </div>
          </main>
        </Router>
      </div>
      <Footer />
    </div>
  );
}

export default App;
