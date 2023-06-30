import React from 'react'
import './user.css'
import {NavLink, Link} from "react-router-dom"

function User({account, user, name, changeAccount}) {

    //const [isSelected, setIsSelected] = React.useState(false)
        return(
<li key={account.id} identifier={account.id} speaker={account} onClick={e=>{
        console.log(user)
        changeAccount(account)}}>
                                      <NavLink
                    to={`chat`}
                    className={({ isActive, isPending }) =>
                    isActive
                    ? "active"
                    : isPending
                    ? "pending"
                    : ""
                  }>
                  <Link to={`chat`}>
                    {account.name ? (
                      <>
                        {account.name}
                      </>
                    ) : (
                      <i>No Name</i>
                      )}{" "}
                  </Link>
                        </NavLink>
                </li>
        );
    }
    
export default User