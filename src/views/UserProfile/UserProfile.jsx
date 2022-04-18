import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const UserProfile = () => {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.userReducer.user);


    useEffect(()=>{
        
    },[])

    return <div>UserProfile</div>;
};

export default UserProfile;
