import React from 'react';
import SearchComponent from './micro-frontends/search/SearchComponent';
import EmployeeListComponent from './micro-frontends/employee-list/EmployeeListComponent';
import EmployeeDetailComponent from './micro-frontends/employee-detail/EmployeeDetailComponent';
import './App.css';

const App: React.FC = () => {
  return (
    <div className="app">
      <header className="app-header">
        <h1>Employee Directory</h1>
        <p className="app-subtitle">A micro frontend application</p>
      </header>
      
      <main className="app-content">
        <div className="app-layout">
          <div className="app-sidebar">
            <SearchComponent />
          </div>
          
          <div className="app-main">
            <EmployeeListComponent />
            <EmployeeDetailComponent />
          </div>
        </div>
      </main>
      
      <footer className="app-footer">
        <p>&copy; {new Date().getFullYear()} Employee Directory - React TypeScript Micro Frontend Demo</p>
      </footer>
    </div>
  );
};

export default App;
