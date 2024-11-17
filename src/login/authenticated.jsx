import React from 'react';
import { useNavigate } from 'react-router-dom';

// import './authenticated.css';

export function Authenticated(props) {
  const navigate = useNavigate();

  function logout() {
    console.log('Logging out');
    fetch(`/api/auth/logout`, {
      method: 'delete',
    })
      .catch(() => {
        // Logout failed. Assuming offline
      })
      .finally(() => {
        localStorage.removeItem('name');
        props.onLogout();
      });
  }

  return (
    <div>
      <div className='name'>{props.name}</div>
      <button variant='primary' onClick={() => navigate('/details')}>
        Details
      </button>
      <button variant='secondary' onClick={() => logout()}>
        Logout
      </button>
    </div>
  );
}
