import React from 'react';
import './details.css';
import globeImg from './globe.svg';
import browserImg from './browser.svg';
import { UserEvent, UserNotifier } from './UserEventMessage';
import { Users } from './Users';

// Gets name from props
export function Details(props) {
    const [timesLoggedIn, setTimesLoggedIn] = React.useState('');
    const [location, setLocation] = React.useState('');


    // This will be used to get data from the API
    React.useEffect(() => {
        const fetchLocation = async () => {
            // const response = await fetch('/api/getLocation');
            const response = 200;
            if (!response.ok) {
                console.log('Error fetching location');
                setLocation('Unknown');
                return;
            }
            const data = await response.json();
            if (!data.location) {
                // Deals with errors
                setLocation('Unknown');
                return;
            }
            console.log('Location:', data.location);
            setLocation(data.location);
        };
        fetchLocation();
    }, []);

    // Let other players know that a user has logged in
    React.useEffect(() => {
        UserNotifier.broadcastEvent(props.name, UserEvent.System, { msg: 'logged in' });
    }, [props.name]);

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
                const data = JSON.parse(text).logins
                console.log("Times Logged In:", data);

                if (data < 0)
                    setTimesLoggedIn('Unknown')
                else
                    setTimesLoggedIn(data);

            })
            .catch((error) => {
                // console.log("Error fetching times logged in. Using default value.");
                // console.log(error);
                setTimesLoggedIn('Unknown');
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
                    </div>
                    <div> Source: Our Database </div>
                </li>
            </ul>   
            <Users userName={props.name} />
        </main>
    );
}
