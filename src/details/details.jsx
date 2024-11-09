import React from 'react';

export function Details(props) {
    return (
        <main>
            <div class="detailsDiv">
                <h1>Welcome {props.name}</h1>
                <h1>This is what we have gathered about you.</h1>
                <br />
            </div>
            <ul>
                <li>
                    <img src="images/globe.svg" width="50px"></img>
                    <div>Location: Provo</div>
                    <div>Source: Geolocation API</div>
                </li>
                <li>
                    <img src="images/browser.svg" width="50px"></img>
                    <div>Number of times logged into site: 20</div>
                    <div>Source: Our Database</div>
                </li>
                <li>
                    <img src="images/cookie.svg" width="50px"></img>
                    <div>Last Used Website: youtube.com</div>
                    <div>Source: Cookies</div>
                </li>
                <li>
                    <img src="images/search.svg" alt="" width="50px" />
                    <div>According to your cookies, you like Cats and go to BYU</div>
                    <div>Source: Cookies</div>
                </li>
            </ul>

        </main>
    );
}
