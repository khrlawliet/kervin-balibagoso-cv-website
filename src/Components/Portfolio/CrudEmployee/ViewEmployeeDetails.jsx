import React, { useState, useEffect } from 'react';
import './ViewEmployeeDetails.css';
import EmployeeService from './EmployeeService';
import { withStyles } from '@material-ui/core/styles';
import { useHistory } from "react-router";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import LoadingScreen from 'react-loading-screen';


const ViewEmployeeDetails = (props) => {

    const id = props.match.params.id;
    const [tasks, setTasks] = useState([]);
    const [employee, setEmployee] = useState({});    
    const [selectedTask, setSelectedTask] = useState({});
    const [showDialog, setShowDialog] = useState(false);
    const [modalClassName, setModalClassName] = useState("");
    const [taskName, setTaskName] = useState("");
    const [duration, setDuration] = useState(0);
    const [description, setDescription] = useState("");
    const [title, setTitle] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const history = useHistory();


    useEffect(() => {
        setSelectedTask({ 'taskName': '', 'hourDuration': 0, 'description': '' })
        setModalClassName("modal__close");
    }, [])


    const displayModal = (task) => {
        setSelectedTask(task);
        setTaskName(task ? task.taskName : "");
        setDuration(task ? task.hourDuration : "");
        setDescription(task ? task.description : "");
        setTitle(task ? "Update Task" : "Add Task")
        setShowDialog(true);
        setModalClassName("project__modal");

    }

    const closeDialog = () => {
        setModalClassName("modal__close");
    }

    useEffect(() => {
        EmployeeService.getEmployeeById(id)
            .then(res => {
                setEmployee(res.data);
            })

    }, [id])

    useEffect(() => {
        EmployeeService.getEmployeeTasks(id)
            .then(result => {
                setTasks(result.data.content);
                setIsLoading(false);
            })
    }, [modalClassName, id])

    const changeTaskNameHandler = (e) => {
        setTaskName(e.target.value);
    }

    const changeTaskDescriptionHandler = (e) => {
        setDescription(e.target.value);
    }

    const changeTaskDurationHandler = (e) => {
        setDuration(e.target.value);
    }

    const saveEmployeeTask = (e) => {
        setIsLoading(prevState => !prevState);
        let task = { taskName: taskName, hourDuration: duration, description: description }
        console.log('employee => ' + JSON.stringify(task));
        if (selectedTask) {
            EmployeeService.updateEmployeeTask(employee.id, selectedTask.id, task)
                .then(() => {
                    closeDialog();
                })
        } else {
            EmployeeService.createEmployeeTask(employee.id, task)
                .then(() => {
                    closeDialog();
                })
        }

    }

    const deleteEmployeeTask = (id) => {
        EmployeeService.deleteEmployeeTask(employee.id, id)
            .then(() => {
                setTasks(tasks.filter(task => task.id !== id))
            })
    }


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
            bgColor='#f1f1f1'
            loading={isLoading}
            spinnerColor='#9ee5f8'
            text='Please Wait...'
        >
            <div className="employeeDetails">
                <div className="employeeDetails__header">
                    <h1>Employee Details</h1>
                    <Button color="default" variant="contained" onClick={() => history.push('/employees')}>back</Button>
                </div>

                <hr />
                <div className="employeeDetails__content">
                    <div>
                        Name : {employee.firstName}{' '}{employee.lastName}
                        <br />
                Email Address : {employee.emailId}
                    </div>
                    <div className="employeeDetails__tasks">
                        <br />
                        <br />
                        <h1>Tasks</h1>
                        <TableContainer component={Paper}>
                            <Table aria-label="customized table">
                                <TableHead>
                                    <TableRow>
                                        <StyledTableCell align="center">Task Name</StyledTableCell>
                                        <StyledTableCell align="center">Duration(Hour)</StyledTableCell>
                                        <StyledTableCell align="center">Description</StyledTableCell>
                                        <StyledTableCell align="center">Action</StyledTableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {
                                        tasks.map(
                                            task =>
                                                <StyledTableRow key={task.id}>
                                                    <StyledTableCell align="center">{task.taskName}</StyledTableCell>
                                                    <StyledTableCell align="center">{task.hourDuration}</StyledTableCell>
                                                    <StyledTableCell align="center">{task.description}</StyledTableCell>
                                                    <StyledTableCell align="center">
                                                        <div className="employeeDetails_btn">
                                                            <Button color="primary" variant="contained" className="btn__update" onClick={() => displayModal(task)}>Update</Button>
                                                            <Button color="secondary" variant="contained" style={{ marginLeft: '10px' }} className="btn__delete" onClick={() => deleteEmployeeTask(task.id)} >Delete</Button>
                                                        </div>
                                                    </StyledTableCell>
                                                </StyledTableRow>
                                        )
                                    }
                                </TableBody>
                            </Table>
                        </TableContainer>
                        <div className="btnAdd">
                            <Button color="primary" variant="contained" onClick={() => displayModal(null)}>Add Task</Button>
                        </div>

                        {
                            showDialog ?
                                <div className={modalClassName}>
                                    <div className="taskmodal__content">
                                        <div className="modal__header">
                                            <span className="close" onClick={closeDialog}>&times;</span>
                                            <h1>{title}</h1>
                                        </div>
                                        <div className="taskmodal__body">
                                            <form action="submit">
                                                <div className="updateTask__taskName">
                                                    <label>Task Name: </label>
                                                    <input placeholder="Task Name"
                                                        value={taskName} onChange={changeTaskNameHandler} />

                                                </div>
                                                <div className="updateTask__lastName">
                                                    <label>Duration: </label>

                                                    <input placeholder="Hour Duration" type="number"
                                                        value={duration} onChange={changeTaskDurationHandler} />

                                                </div>
                                                <div className="updateTask__description">
                                                    <label>Description: </label>
                                                    <input placeholder="Description"
                                                        value={description} onChange={changeTaskDescriptionHandler} />

                                                </div>
                                                <div className="btn__container">
                                                    <Button color="primary" variant="contained" onClick={saveEmployeeTask} className="btn__save" >Save</Button>
                                                    <Button color="secondary" variant="contained" className="btn__cancel" onClick={closeDialog}>Cancel</Button>
                                                </div>


                                            </form>
                                        </div>
                                    </div>
                                </div>
                                : null
                        }


                    </div>
                </div>
            </div>
        </LoadingScreen>
    )
}

export default ViewEmployeeDetails
