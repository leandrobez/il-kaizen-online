import React, { createContext, Component } from 'react';

export const PageContext = createContext();
class PageContextProvider extends Component {
  state = {
    pages: [
      { name: '/', class: 'il-default' },
      { name: '/home', class: 'il-default' },
      { name: '/about', class: 'il-about' },
      { name: '/plans', class: 'il-plans' },
    ],
  };

  getClass = (location) => {
    const currentClass = this.state.pages.filter(
      (page) => page.name === location
    );
    if (currentClass.length) {
      return `il-background ${currentClass[0].class}`;
    }
    return 'il-no-background';
  };

  render() {
    return (
      <PageContext.Provider value={{ ...this.state, getClass: this.getClass }}>
        {this.props.children}
      </PageContext.Provider>
    );
  }
}

export default PageContextProvider;
