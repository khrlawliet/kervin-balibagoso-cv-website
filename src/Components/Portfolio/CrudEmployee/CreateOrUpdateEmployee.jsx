import React, { useState, useEffect } from 'react';
import { useHistory } from "react-router";
import EmployeeService from './EmployeeService';
import Button from '@material-ui/core/Button';
import './CreateOrUpdateEmployee.css';
import LoadingScreen from 'react-loading-screen';

const CreateOrUpdateEmployee = (props) => {

    const id = props.match.params.id;
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [emailId, setEmailId] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const history = useHistory();

    useEffect(() => {
        const initialLoad = (id) => {
            if (id === '_add') {
                setIsLoading(false);
                return;
            } else {
                EmployeeService.getEmployeeById(id)
                    .then(res => {
                        let employee = res.data;
                        setFirstName(employee.firstName);
                        setLastName(employee.lastName);
                        setEmailId(employee.emailId);
                        setIsLoading(false);
                    })
            }
        }
        initialLoad(id);
    }, [id]);


   
    const updateEmployee = (e) => {
        setIsLoading(prevState => !prevState);
        e.preventDefault();
        let employee = { firstName: firstName, lastName: lastName, emailId: emailId };
        if (id === '_add') {
            EmployeeService.createEmployee(employee).then(res => {
                setIsLoading(prevState => !prevState);
                history.push('/employees');
            });
        } else {
            EmployeeService.updateEmployee(employee, id)
                .then(res => {
                    setIsLoading(prevState => !prevState);
                    history.push('/employees');
                })
        }
    }

    const changeFirstNameHandler = (event) => {
        setFirstName(event.target.value);

    }

    const changeLastNameHandler = (event) => {
        setLastName(event.target.value);

    }

    const changeEmailHandler = (event) => {
        setEmailId(event.target.value);

    }

    const cancel = () => {
        history.push("/employees");
    }



    return (
        <LoadingScreen
            bgColor='#f1f1f1'
            loading={isLoading}
            spinnerColor='#9ee5f8'
            text='Please Wait...'
        >
            <div className="updateEmployee">
                {id === '_add' ? <h2> Add Employee</h2> : <h2>Update Employee</h2>}
                <div className="updateEmployee__card">
                    <div className="updateEmployee__cardBody">
                        <form action="submit">
                            <div className="updateEmployee__firstName">
                                <label>First Name: </label>
                                <input placeholder="First Name" name="firstName" className="form-control"
                                    value={firstName} onChange={changeFirstNameHandler} />

                            </div>
                            <div className="updateEmployee__lastName">
                                <label>Last Name: </label>
                                <input placeholder="Last Name" name="lastName" className="form-control"
                                    value={lastName} onChange={changeLastNameHandler} />

                            </div>
                            <div className="updateEmployee__emailId">
                                <label>Email Id: </label>
                                <input placeholder="Email Address" name="emailId" className="form-control"
                                    value={emailId} onChange={changeEmailHandler} />

                            </div>
                            <div className="btn__container">
                                <Button color="secondary" variant="contained" className="btn__cancel" onClick={cancel} style={{ marginLeft: "10px" }}>Cancel</Button>
                                <Button color="primary" variant="contained" className="btn__save" onClick={updateEmployee}>Save</Button>
                            </div>


                        </form>
                    </div>

                </div>
            </div>
        </LoadingScreen>
    )
}

export default CreateOrUpdateEmployee

