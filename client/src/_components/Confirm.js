import '../css/confirm.css'

import React from 'react'


function Confirm(props) {
    return (
        <div className="custom-confirm">
            <h1>You want to {props.msg} this?</h1>
            <button onClick={props.onClose}>No</button>
            <button onClick={props.onConfirm}>
                Yes, {props.msg} it!
            </button>
        </div>
    )
}

export default Confirm