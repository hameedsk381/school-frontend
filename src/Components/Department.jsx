import { Container, Typography } from '@mui/material'

import React from 'react'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllUsers } from '../actions/userActions';

const Department = () => {
    
    const dispatch = useDispatch();
    const loginstate = useSelector((state) => state.getAllUsersReducer);
    const { loading, error ,users} = loginstate;
   
    useEffect(() => {
     
      dispatch(getAllUsers())
    }, []);
  return (
    <Container>
    {users.map(item=>(
        <Typography>{item.department}</Typography>
    ))}
    </Container>
  )
}

export default Department