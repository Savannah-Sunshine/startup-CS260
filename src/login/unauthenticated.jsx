import React from 'react';

import { MessageDialog } from './messageDialog';
import './login.css';

export function Unauthenticated(props) {
  const [name, setName] = React.useState(props.name);
  const [password, setPassword] = React.useState('');
  const [displayError, setDisplayError] = React.useState(null);

  async function loginUser() {
    loginOrCreate(`/api/auth/login`);
  }

  async function createUser() {
    loginOrCreate(`/api/auth/create`);
  }

  async function loginOrCreate(endpoint) {
    const response = await fetch(endpoint, {
      method: 'post',
      body: JSON.stringify({ name: name, password: password }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    });
    if (response?.status === 200) {
      localStorage.setItem('name', name);
      props.onLogin(name);
    } else {
      const body = await response.json();
      setDisplayError(`⚠ Error: ${body.msg}`);
    }
  }

  return (
    <>
      <main>
        <h1>Login</h1>
        <div className='form'>
          <div className='inputs'>
            {/* I know the @ signdoesn't make sense for name, but I like it */}
            <div>@</div>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Joe Smith" />
          </div>
          <div>
            <div>🔒</div>
            <input type="password" onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
          </div>
          <div className='loginButtons'>
            <button onClick={() => loginUser()} disabled={!name || !password}>
              Login
            </button>
            <button onClick={() => createUser()} disabled={!name || !password}>
              Create Account
            </button>
          </div>
        </div>
      </main>

      {/* <MessageDialog message={displayError} onHide={() => setDisplayError(null)} /> */}
    </>
  );
}
