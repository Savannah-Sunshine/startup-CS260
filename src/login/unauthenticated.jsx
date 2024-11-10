import React from 'react';

import { MessageDialog } from './messageDialog';
import './login.css';

export function Unauthenticated(props) {
  const [name, setName] = React.useState(props.name);
  const [password, setPassword] = React.useState('');
  const [displayError, setDisplayError] = React.useState(null);

  async function loginUser() {
    localStorage.setItem('name', name);
    props.onLogin(name);
  }

  async function createUser() {
    localStorage.setItem('name', name);
    props.onLogin(name);
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
