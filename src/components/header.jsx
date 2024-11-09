import React from 'react';
import { NavLink } from 'react-router-dom';
import './header.css';

export function Header() {
    //     <menu className='navbar-nav'>
    //       <li className='nav-item'>
    //         <NavLink className='nav-link' to=''>
    //           Login
    //         </NavLink>
    //       </li>
    //       {authState === AuthState.Authenticated && (
    //         <li className='nav-item'>
    //           <NavLink className='nav-link' to='play'>
    //             Play
    //           </NavLink>
    //         </li>
    //       )}
    //   {authState === AuthState.Authenticated && (
    //     <li className='nav-item'>
    //       <NavLink className='nav-link' to='scores'>
    //         Scores
    //       </NavLink>
    //     </li>
    //   )}
    //       <li className='nav-item'>
    // <NavLink className='nav-link' to='about'>
    //   About
    // </NavLink>
    //       </li>
    //     </menu>

    return (
        <header>
            <h3>DiscoverMe</h3>
            <nav>
                <ul>
                    <NavLink className='nav-link' to=''>
                        Login
                    </NavLink>

                    {/* {authState === AuthState.Authenticated && (
                        <li className='nav-item'>
                          <NavLink className='nav-link' to='scores'>
                            Scores
                          </NavLink>
                        </li>
                      )} */}
                    <NavLink className='nav-link' to='details'>
                        Details
                    </NavLink>
                </ul>
            </nav>
        </header>
    )
}