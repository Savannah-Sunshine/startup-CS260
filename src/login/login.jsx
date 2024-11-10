import React from 'react';

import { Unauthenticated } from './unauthenticated';
import { Authenticated } from './authenticated';
import { AuthState } from './authState';
import { Details } from '../details/details';


export function Login({ name, authState, onAuthChange }) {
    return (
        <div>
            {/* If authenticated */}
            {authState === AuthState.Authenticated && (
                <Details name={name} />
            )}
            {/* Else login */}
            {authState === AuthState.Unauthenticated && (
                <Unauthenticated
                    name={name}
                    onLogin={(loginName) => {
                        onAuthChange(loginName, AuthState.Authenticated);
                    }}
                />
            )}
            {/* Otherwise display error */}
            {authState === AuthState.Unknown && <h1>You are neither unauthenticated nor authenticated. Tough luck</h1>}
        </div>
    )
}