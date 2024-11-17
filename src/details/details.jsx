import React from 'react';
import './details.css';
import globeImg from './globe.svg';
import browserImg from './browser.svg';

// Gets name from props
export function Details(props) {
    const [timesLoggedIn, setTimesLoggedIn] = React.useState(0);
    const [location, setLocation] = React.useState('');

    // This will be used to get data from the API/DB (timesLoggedIn)
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
                    <img src={globeImg} width="50px"></img>
                    <div>Location: {location}</div>
                    <div> Source: Geolocation API </div>
                </li>
                <li>
                    <img src={browserImg} width="50px"></img>
                    <div>
                        Number of times logged into site: {timesLoggedIn}
                        {/* {timesLoggedIn.find((name) => { return name === props.nam; })}  */}
                    </div>
                    <div> Source: Our Database </div>
                </li>


                
                {/* Todo: Can add these back if I need more coding fun */}
                {/* <li>
                    <img src="public/cookie.svg" width="50px"></img>
                    <div>Last Used Website: youtube.com</div>
                    <div>Source: Cookies</div>
                </li> */}
                {/* <li>
                    <img src="public/search.svg" alt="" width="50px" />
                    <div>According to your cookies, you like Cats and go to BYU</div>
                    <div>Source: Cookies</div>
                </li> */}
            </ul>

        </main>
    );
}
