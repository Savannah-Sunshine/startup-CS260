import React from 'react';

// import Button from 'react-bootstrap/Button';
// import Modal from 'react-bootstrap/Modal';

export function MessageDialog(props) {
  return (
    <modal {...props} show={props.message} centered>
      modal todo
      {/* <modal.Body>{props.message}</modal.Body>
      <modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </modal.Footer> */}
    </modal>
  );
}
