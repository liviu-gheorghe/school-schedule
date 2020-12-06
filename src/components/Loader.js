import React from 'react';
import {Spinner} from 'react-bootstrap';
import './Loader.css';
const Loader = () => {
    return (
        <div className="w-100 text-center my-4">
            <Spinner animation="grow" className="mx-2 Spinner"/>
            <Spinner animation="grow" className="mx-2 Spinner"/>
            <Spinner animation="grow" className="mx-2 Spinner"/>
        </div>
    );
}
export default Loader;