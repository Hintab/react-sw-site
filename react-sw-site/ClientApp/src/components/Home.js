import React, { Component } from 'react';
import image from '../images/20210502_153941.jpg';

export class Home extends Component {
    static displayName = Home.name;

    render() {
        return (
            <div className="d-flex flex-column align-items-center justify-content-center">
                <h1 className="text-center mb-4">Super Dope Social Worker Website</h1>
                <div className="text-center">
                    <img src={image} alt="Super Dope Social Worker" style={{ maxWidth: '40%', height: 'auto' }} />
                </div>
            </div>
        );
    }
}
