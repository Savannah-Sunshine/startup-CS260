import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
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

        <Routes>
          <Route path='/' element={<>hi</>} />
          {/* <Route
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
          /> */}
          <Route path='/details' element={<Details/>} />
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
