import React from 'react';
import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom';
// import { Login } from './login/login';
import { Header } from './components/header';
import { Footer } from './components/footer';
import { Details } from './details/details';
// import { AuthState } from './login/authState';

function App() {
  // const [userName, setUserName] = React.useState(localStorage.getItem('userName') || '');
  // const currentAuthState = userName ? AuthState.Authenticated : AuthState.Unauthenticated;
  // const [authState, setAuthState] = React.useState(currentAuthState);

  return (
    <BrowserRouter>
      <Header></Header>
        {/* <header className='container-fluid'>
          <nav className='navbar fixed-top navbar-dark'>
            <div className='navbar-brand'>
              Simon<sup>&reg;</sup>
            </div>
            <menu className='navbar-nav'>
              <li className='nav-item'>
                <NavLink className='nav-link' to=''>
                  Login
                </NavLink>
              </li>
              {authState === AuthState.Authenticated && (
                <li className='nav-item'>
                  <NavLink className='nav-link' to='play'>
                    Play
                  </NavLink>
                </li>
              )}
              {authState === AuthState.Authenticated && (
                <li className='nav-item'>
                  <NavLink className='nav-link' to='scores'>
                    Scores
                  </NavLink>
                </li>
              )}
              <li className='nav-item'>
                <NavLink className='nav-link' to='about'>
                  About
                </NavLink>
              </li>
            </menu>
          </nav>
        </header> */}

        {/* <Routes>
          <Route
            path='/'
            element={
              <Login
                userName={userName}
                authState={authState}
                onAuthChange={(userName, authState) => {
                  setAuthState(authState);
                  setUserName(userName);
                }}
              />
            }
            exact
          />
          <Route path='/details' element={<Details name={Name} />} />
          <Route path='*' element={<NotFound />} />
        </Routes> */}

        {/* <footer className='bg-dark text-dark text-muted'>
          <div className='container-fluid'>
            <span className='text-reset'>Author Name(s)</span>
            <a className='text-reset' href='https://github.com/webprogramming260/simon-react'>
              Source
            </a>
          </div>
        </footer> */}
        <Footer></Footer>
    </BrowserRouter>
  );
}

function NotFound() {
  return <main className='container-fluid bg-secondary text-center'>404: Return to sender. Address unknown.</main>;
}

export default App;
