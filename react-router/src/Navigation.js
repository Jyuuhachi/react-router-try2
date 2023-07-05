import logo from './logo.svg';
import React from 'react';
import Nav from './components/Nav'
import Chat from './components/Chat'
import Speaker from './components/Speaker'
import { Outlet, Link, useLoaderData, Form, redirect, NavLink, useNavigation } from "react-router-dom";

const URL = "http://localhost:3000/data"



function Navigation({changeUser, userList, addUser}) {


  return (
    <div>
      <div className="userForm">
      <form onSubmit={e=> {e.preventDefault() 
              addUser({name:e.target.newUser.value, messages:[]})
              e.target.reset()}}>
                <input type="text" name="newUser"></input>
                <input type="submit" value="Add Contact"></input>
            </form>
      </div>
    <div className="userList">
      <ul className="avi">
    {userList.map(item => (
      <Speaker user={item} changeUser={changeUser}/>
              ))}
              </ul>
    </div>
    <div className="display-area">
        <Outlet />
    </div>
    </div>
  );
}

export default Navigation;