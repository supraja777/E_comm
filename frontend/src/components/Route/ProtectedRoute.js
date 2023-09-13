import React, { Fragment } from 'react'
import { useSelector } from 'react-redux'
import {Navigate, Route, Outlet, useOutlet} from "react-router-dom"
import Loader from '../layout/Loader/Loader'

const ProtectedRoute = ({isAdmin,component:  Component, ...rest}) => {
    const {loading, isAuthenticated, user} = useSelector((state)=>state.user)
    const outlet = useOutlet()
  return (
        <Fragment>
            {/* {!loading && (
                <Route
                {...rest}
                render ={(props)=>{
                    if (!isAuthenticated) {
                        return <Navigate to="/login"/>
                    }
                    return <Component {...props}/>
                }}
                />
            )} */}
            {/* {console.log("Logging in PR")}
            {console.log(isAuthenticated)} */}
            {loading === false && (
                <Outlet
                {...rest}
                render = {(props) => {
                    if (isAuthenticated === false) {
                        return <Navigate to ="/login"/>
                    }

                    if (isAdmin === true && user.role!== "admin") {
                        return <Navigate to ="/login"/>
                    }
                    return <Component {...props}/>
                }}
                />
            )}
            {/* {!loading && !isAuthenticated ? <Navigate to="/login"/>  : <Outlet/>} */}
        </Fragment>
  )
}

export default ProtectedRoute
