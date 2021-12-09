import React from 'react';
import { Navigate, useLocation } from 'react-router';

const PrivetRoute = (user) => {

    let location = useLocation();
    console.log(user);
    if (!user.userLogin.email) {

        return <Navigate to="/create" state={{ from: location }} />;
    }

    return user.children;
};

export default PrivetRoute;