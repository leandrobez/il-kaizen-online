import React from 'react';
import { BrowserRouter as Router, Switch } from 'react-router-dom';
import Header from './components/partials/Header';
import Ilustration from './components/partials/Ilustration';
/**Provider for page */
import PageContextProvider from './context/PageContext';
import Pages from './components/Pages';

function App() {
  return (
    <div className="il-app">
      <div className="il-container">
        <Router>
          <Header />
          <main>
            <PageContextProvider>
              <Switch>
                <Ilustration />
              </Switch>
            </PageContextProvider>
            <div className="il-container--wrapper">
              <Switch>
                <Pages />
              </Switch>
            </div>
          </main>
          <footer className="il-footer">footer</footer>
        </Router>
      </div>
    </div>
  );
}

export default App;
