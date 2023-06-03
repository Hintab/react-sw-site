import React, { Component } from 'react';

export class FetchData extends Component {

    // This state variable stores the employee data.
    state = {
        employees: []
    };

    // This function is called when the component is mounted.
    componentDidMount() {
        // Fetch the employee data from the API.
        fetch('api/Employees')
            .then((results) => {
                // Convert the JSON data to an object.
                return results.json();
            })
            .then((data) => {
                // Set the state to the employee data.
                this.setState({ employees: data });
            });
    }

    // This function renders the component.
    render() {
        // Check if the employee data is available.
        if (this.state.employees) {
            // Render a list of employee names.
            console.log(this.state.employees)
            return (
                <main>
                    {
                        this.state.employees.map((employee) => (
                            <h3>{employee.name}</h3>
                        ))
                    }
                    {
                        this.state.employees.map((employee) => (
                             <h3>{employee.id}</h3>
                        ))

                    }
                </main>
            );
        } else {
            // Render a loading message.
            return (
                <div>Loading...</div>
            );
        }
    }
}

export default FetchData;
