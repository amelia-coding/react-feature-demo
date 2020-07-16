import React, { Suspense } from 'react';
import { renderRoutes } from 'react-router-config';
import { Link, Route } from 'react-router-dom';
import './App.css';
import logo from './logo.svg';
import { routes } from './route/routes';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      </header>
      <Link to="/">首页</Link>
      <Link to="/cart">购物车</Link>
      <Link to="/table">表格</Link>
      <Link to="/counter">计数器</Link>
      <Suspense fallback={<div>loading</div>}>
        <Route
          path="/"
          // exact={true}
          render={(props) => {
            return (
              <div>
                <div>head</div>
                {renderRoutes(routes)}
              </div>
            );
          }}
        />
        {/* <Switch>{renderRoutes(routes)}</Switch> */}
      </Suspense>
      <div style={{ marginTop: 50, height: 100 }}>footer</div>
    </div>
  );
}

export default App;
