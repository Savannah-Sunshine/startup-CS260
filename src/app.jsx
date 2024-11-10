import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Login } from './login/login';
import { Header } from './components/header';
import { Footer } from './components/footer';
import { Details } from './details/details';
import { AuthState } from './login/authState';

function App() {
  const [name, setName] = React.useState(localStorage.getItem('name') || '');
  const currentAuthState = name ? AuthState.Authenticated : AuthState.Unauthenticated;
  const [authState, setAuthState] = React.useState(currentAuthState);

  console.log('app authState', authState);

  return (
    <BrowserRouter>
      <Header isAuthenticated={authState === AuthState.Authenticated} onLogout={() => {
        localStorage.removeItem('name');
        setAuthState(AuthState.Unauthenticated);
        setName('');
      }
      } />

      <Routes>
        {/* <Route path='/' element={<Login />} /> */}
        <Route
          path='/'
          element={
            <Login
              name={name}
              authState={authState}
              onAuthChange={(name, authState) => {
                setAuthState(authState);
                setName(name);
              }}
            />
          }
          exact
        />
        <Route path='/details' element={
          <Details name={name}/>
        }
        />
        <Route path='*' element={<NotFound />} />
      </Routes>
      <Footer></Footer>
    </BrowserRouter>
  );
}

function NotFound() {
  return <main className='container-fluid bg-secondary text-center'>404: Return to sender. Address unknown.</main>;
}

export default App;
