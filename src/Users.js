import React, { useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { CircularProgress, Container } from '@mui/material';
const Users = () => {
    const [isLoad, setIsLoad] = useState(true)
    const [user, setUser] = useState([])
    useEffect(() => {
        fetch('http://localhost:5656/registration')
            .then(res => res.json())
            .then(data => {
                setUser(data)
                setIsLoad(false)
            })
    }, [])
    return (
        <Container sx={{mt:20}}>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 550 }} aria-label="simple table">
                    <TableHead>
                        <TableRow >
                            <TableCell align="right">Name</TableCell>
                            <TableCell align="right">Email</TableCell>
                            <TableCell align="right">Gender</TableCell>
                            <TableCell align="right">Death of Birth</TableCell>
                            <TableCell align="right">Register Date</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {user?.map((row) => (isLoad ? <CircularProgress /> :
                            <TableRow
                                key={row._id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    {row.FullName}
                                </TableCell>
                                <TableCell align="right">{row.email}</TableCell>
                                <TableCell align="right">{row.gender}</TableCell>
                                <TableCell align="right">{new Date(row.deathOfBirth).toDateString()}</TableCell>
                                <TableCell align="right">{new Date(row.registerDate).toDateString()}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Container>
    );
};

export default Users;