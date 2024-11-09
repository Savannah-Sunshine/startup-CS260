import React from 'react';

import { Unauthenticated } from './unauthenticated';
import { Authenticated } from './authenticated';
import { AuthState } from './authState';


export function Login({ name, authState, onAuthChange }) {
    console.log('Login', name, authState.Unknown, authState.Authenticated, authState.Unauthenticated)
    return (
        <div> 
        {/* If authState is known, display DiscoverMe */}
        {/* {authState !== AuthState.Unknown && <h1>Join DiscoverMe</h1>} */}
        {/* If authenticated */}
        {authState === AuthState.Authenticated && (
          <Authenticated name={name} onLogout={() => onAuthChange(name, AuthState.Unauthenticated)} />
        )}
        {authState === AuthState.Unauthenticated && (
          <Unauthenticated
            userName={name}
            onLogin={(loginName) => {
              onAuthChange(loginName, AuthState.Authenticated);
            }}
          />
        )}
      </div>
    )
}