import { createSlice } from '@reduxjs/toolkit'
import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router'
import apiInstance from '../../api'
const [list, setList] = useState([])

const StudentId = localStorage.getItem('id')
useEffect(() => {
    const getId = async () => {
        await apiInstance.get("enrollments").then((res) => {
            setList(res.data.data.filter((el) => el.student === StudentId))
        });
    };
    getId()
}, [])
const initialState = [
    list
]

const postsSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {}
})

export default postsSlice.reducer