import React from 'react';
import {useSelector} from 'react-redux';
import { Navigate} from 'react-router-dom';

const ProtectedRoute=(props)=>{
    //const navigate=useNavigate();
    const {admin}=useSelector((store)=>{
        return store.admin;
    })
    if(!admin){
        //navigate('/login');
       return <Navigate to='/login'/>;
        

    }
    return props.children;

}
export default ProtectedRoute;