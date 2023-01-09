import React from 'react';

function FormGroup(props){
    return (
        <div className="form-group mb-3">
            <label htmlFor="props.htmlFor">{props.Label}</label>
            {props.children}
        </div>
    )
}

export default FormGroup;