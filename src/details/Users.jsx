import React from 'react';

import { UserEvent, UserNotifier } from './UserEventMessage';
import './Users.css';

export function Users(props) {
    const userName = props.userName;

    const [events, setEvent] = React.useState([]);

    React.useEffect(() => {
        UserNotifier.addHandler(handleUserEvent);

        return () => {
            UserNotifier.removeHandler(handleUserEvent);
        };
    });

    function handleUserEvent(event) {
        setEvent([...events, event]);
    }

    function createMessageArray() {
        const messageArray = [];
        for (const [i, event] of events.entries()) {
            let message = 'unknown';

            if (event.type === UserEvent.System) {
                message = ' ' + event.value.msg;
            }

            messageArray.push(
                <div key={i} className='event'>
                    <span className={'player-event'}>{event.from.split('@')[0]}</span>
                    {message}
                </div>
            );
        }
        return messageArray;
    }

    function loggedInBoard() {
        const usersLoggedIn = [];
        for (const [i, event] of events.entries()) {
            console.log('event', event);
            console.log('event.from', event.from);
            if (event.type === UserEvent.System && event.value.msg === 'logged in') {
                usersLoggedIn.push(
                    <div key={i}>
                        {event.from}
                    </div>
                );
            }
        }
        return usersLoggedIn;
    }


    return (
        <>
            <div className='online'>
                Users Online:
                <div className='user-name'>{userName}</div>
                <div id='logged-in'>{loggedInBoard()}</div>
            </div>
            <div className='activity'>
                Activity Feed:
                <div id='user-messages'>{createMessageArray()}</div>
            </div>
        </>
    );
}
