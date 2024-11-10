import React from 'react';
import { NavLink } from 'react-router-dom';
import { AuthState } from '../login/authState';
import './header.css';

export function Header(authState, logout) {

    return (
        <header>
            <h3>DiscoverMe</h3>
            <nav>
                <ul>
                    {/* Only appears if logged out */}
                    {authState === AuthState.Authenticated && (
                        <NavLink className='nav-link' to='' onClick={logout}>
                            Logout
                        </NavLink>
                    )}

                    {/* Debug, goes to login */}
                    <NavLink className='nav-link' to='' onClick={logout}>
                        login pg
                    </NavLink>

                </ul>
            </nav>
        </header>
    )
}