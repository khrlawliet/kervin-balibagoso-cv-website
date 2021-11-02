import React, { useState, useEffect } from 'react';
import EmployeeService from './EmployeeService';
import './ListEmployee.css';
import { useHistory } from "react-router";
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import LoadingScreen from 'react-loading-screen';

const ListEmployee = () => {

    const [employees, setEmployees] = useState([]);
    const [search, setSearch] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const history = useHistory();




    useEffect(() => {
        EmployeeService.getEmployees()
            .then(res => {
                setEmployees(res.data);
                setIsLoading(false);
            })
    }, [isLoading])


    const viewEmployee = (id) => {
        history.push(`/view-employee/${id}`);
    }

    const deleteEmployee = (id) => {
        EmployeeService.deleteEmployee(id)
            .then(res => {
                setEmployees(employees.filter(emp => emp.id !== id))
            })
    }

    const editEmployee = (id) => {
        history.push(`/add-employee/${id}`);
    }

    const addEmployee = (id) => {
        history.push(`/add-employee/_add`);
    }

    const searchEmployee = (event) => {
        let keyword = event.target.value;
        setSearch(keyword);
    }


    let filteredEmployees = employees.filter(
        employee => {
            return employee.firstName.toLowerCase().indexOf(search) !== -1
                || employee.lastName.toLowerCase().indexOf(search) !== -1;
        }
    )

    const StyledTableRow = withStyles((theme) => ({
        root: {
            '&:nth-of-type(odd)': {
                backgroundColor: theme.palette.action.hover,
            },
        },
    }))(TableRow);

    const StyledTableCell = withStyles((theme) => ({
        head: {
            backgroundColor: theme.palette.common.black,
            color: theme.palette.common.white,
        },
        body: {
            fontSize: 14,
        },
    }))(TableCell);

    return (
        <LoadingScreen
            loading={isLoading}
            bgColor='#f1f1f1'
            spinnerColor='#9ee5f8'
            text='Please Wait...'
        >
            <div className="listEmployee">
                <h1>Employee List</h1>
                <hr />
                <div className="listEmployee__content">
                    <input placeholder="Search..." name="Search" className="listEmployee__search"
                        onChange={(e) => searchEmployee(e)} value={search}></input>
                </div>
                <TableContainer component={Paper}>
                    <Table className="table__bot" aria-label="customized table">
                        <TableHead>
                            <TableRow>
                                <StyledTableCell align="center">Firstname</StyledTableCell>
                                <StyledTableCell align="center">Lastname</StyledTableCell>
                                <StyledTableCell align="center">Email</StyledTableCell>
                                <StyledTableCell align="center">Action</StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {filteredEmployees.map((
                                employee =>
                                    <StyledTableRow key={employee.id}>

                                        <StyledTableCell align="center">{employee.firstName}</StyledTableCell>
                                        <StyledTableCell align="center">{employee.lastName}</StyledTableCell>
                                        <StyledTableCell align="center">{employee.emailId}</StyledTableCell>
                                        <StyledTableCell align="right">
                                            <div className="listEmployee__btn">
                                                <Button color="primary" variant="contained" onClick={() => editEmployee(employee.id)} className="btn__update">Update</Button>
                                                <Button color="secondary" variant="contained" style={{ marginLeft: '10px' }} onClick={() => deleteEmployee(employee.id)} className="btn__delete">Delete</Button>
                                                <Button color="default" variant="contained" style={{ marginLeft: '10px' }} onClick={() => viewEmployee(employee.id)} className="btn__view">View Details</Button>
                                            </div>
                                        </StyledTableCell>
                                    </StyledTableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                <div className="btnAdd">
                    <Button color="default" variant="contained" onClick={() => window.open('https://spring-boot-employee-backend.herokuapp.com/swagger-ui/#/')}>View API Documentation</Button>
                    <Button color="primary" variant="contained" onClick={addEmployee}>Add Employee</Button>
                </div>


            </div>
        </LoadingScreen>
    )
}

export default ListEmployee
