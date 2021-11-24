import React from 'react'
import { RootStateOrAny, useSelector } from "react-redux";
import { Redirect, RouteProps, Route } from 'react-router-dom'

export interface IProps {

}

export function PrivateRouter(props: RouteProps) {

    // Check Login

    const state = useSelector((state: RootStateOrAny) => state.user);
    if (!state.user) return <Redirect to="/SignIn" />;


    return (
        <Route {...props}>

        </Route>
    )
}
