import React from 'react';
import './header.css';

export function Header() {
    return (
        <header>
            <h3>DiscoverMe</h3>
            <nav>
                <ul>
                    <li><a href="index.html">Login</a></li>
                    <li><a href="details.html">Details</a></li>
                </ul>
            </nav>
        </header>
    )
}