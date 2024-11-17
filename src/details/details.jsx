import React from 'react';
import './details.css';
import globeImg from './globe.svg';
import browserImg from './browser.svg';

const API_KEY = "53223ad299892d91f4522431b448d102"; // Replace with your actual IPStack API key
const API_URL = `https://api.ipstack.com/check?access_key=${API_KEY}`;

// Gets name from props
export function Details(props) {
    const [timesLoggedIn, setTimesLoggedIn] = React.useState(0);
    const [location, setLocation] = React.useState('');

    // This will be used to get data from the API
    React.useEffect(() => {
        const fetchLocation = async () => {
            // Use IPStack API to get location
            const response = await fetch(API_URL);
            if (!response.ok) {
                // console.log(response);
                setLocation('Unknown');
            }
            const data = await response.json();

            // Extract city and region_code
            const location = {
                city: data.city,
                region_code: data.region_code
            };
            console.log("Location:", location);
            setLocation(`${location.city}, ${location.region_code}`);
        };
        fetchLocation();
    }, []);

    // This will be used to get data from the DB
    React.useEffect(() => {

        fetch('/api/getUserLogins', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name: props.name })
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error(response.toString());
                }
                return response.text(); // Get the response as text
            })
            .then((text) => {
                const data = JSON.parse(text)
                // console.log("Times Logged In:", data);
                setTimesLoggedIn(data.logins);
            })
            .catch((error) => {
                // console.log("Error fetching times logged in. Using default value.");
                // console.log(error);
                setTimesLoggedIn(5);
            });
    }, []);


    return (
        <main>
            <div className="detailsDiv">
                <h1>Welcome {props.name}</h1>
                <h1>This is what we have gathered about you.</h1>
                <br />
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
