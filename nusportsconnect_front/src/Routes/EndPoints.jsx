import React from "react"
import {BrowserRouter, Routes, Route} from "react-router-dom"
import Login from "../Components/Login/Login"

function EndPoints(){

    return (
        <BrowserRouter>
            <Routes>
                <Route exact path="/" element={<Login/>}/>
            </Routes>
        </BrowserRouter>
    )

}

export default EndPoints;