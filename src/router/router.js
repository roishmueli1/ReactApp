import React from 'react';
import { Route } from 'react-router-dom';
import BooksList from '../Components/BooksList';
import ByName from "../Components/ByName";
import Header from "../Header";

const ReactRouter =()=>{
    return (
        <React.Fragment>
            <Header/>
            <Route exact path="/" component={BooksList}/>
            <Route path="/ByName" component={ByName}/>
            
        </React.Fragment>
        );}

export default ReactRouter;

