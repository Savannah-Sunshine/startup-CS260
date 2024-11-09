import React from 'react';
import './login.css';

export function Login() {
    return (
        <main>
            <h1>Login to DiscoverMe</h1>
            <form method="get" action="details.html">
                <div>
                    <div>@</div>
                    <input type="text" placeholder="Joe Smith" />
                </div>
                <div>
                    <div>🔒</div>
                    <input type="password" placeholder="password" />
                </div>
                <button type="submit">Login</button>
                <button type="submit">Create Account</button>
            </form>
        </main>
    )
}