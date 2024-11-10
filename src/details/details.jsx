import React from 'react';
import './details.css';

// Gets name from props
export function Details(props) {
    const [timesLoggedIn, setTimesLoggedIn] = React.useState([]);
    const [location, setLocation] = React.useState('');

    // This will be used to get data from the database (timesLoggedIn)
    React.useEffect(() => {
        const timesLoggedIn = localStorage.getItem('timesLoggedIn');
        if (timesLoggedIn) {
            setTimesLoggedIn(JSON.parse(timesLoggedIn));
        }
    }, []);

    // This will be used to call API
    React.useEffect(() => {
        // This will be an API call to get the location of the user
        // fetch('https://quote.cs260.click')
        //     .then((response) => response.json())
        //     .then((jsonResponse) => {
        //         console.log(jsonResponse);
        // });
        setLocation('Boston, MA');
    }, []);

    return (
        <main>
            <div className="detailsDiv">
                <h1>Welcome {props.name}</h1>
                <h1>This is what we have gathered about you.</h1>
                <br/>
            </div>
            <ul>
                <li>
                    <img src="images/globe.svg" width="50px"></img>
                    <div>Location: {location}</div>
                    <div> Source: Geolocation API </div>
                </li>
                <li>
                    <img src="images/browser.svg" width="50px"></img>
                    <div>
                        Number of times logged into site: {timesLoggedIn.find((name) => { return name === props.nam; })} 
                    </div>
                    <div> Source: Our Database </div>
                </li>
                {/* Todo: Can add these back if I need more coding fun */}
                {/* <li>
                    <img src="images/cookie.svg" width="50px"></img>
                    <div>Last Used Website: youtube.com</div>
                    <div>Source: Cookies</div>
                </li> */}
                {/* <li>
                    <img src="images/search.svg" alt="" width="50px" />
                    <div>According to your cookies, you like Cats and go to BYU</div>
                    <div>Source: Cookies</div>
                </li> */}
            </ul>

        </main>
    );
}
