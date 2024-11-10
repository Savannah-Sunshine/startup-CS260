import React from 'react';
import { NavLink } from 'react-router-dom';
import './header.css';


// Props
// isAuthenticated : boolean 
// onLogout: function
export function Header(props) { 

    return (
        <header>
            <h3>DiscoverMe</h3>
            <nav>
                <ul>
                    {/* Only appears if logged in */}
                    {props.isAuthenticated && (
                        <NavLink className='nav-link' to='' onClick={props.onLogout}>
                            Logout
                        </NavLink>
                    )}
                </ul>
            </nav>
        </header>
    )
}