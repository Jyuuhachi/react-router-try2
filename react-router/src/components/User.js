import React from 'react'
import './user.css'
function User({name, setUser, setAccount, nav, eventHandler, myID}) {

    const [isSelected, setIsSelected] = React.useState(false)
    if (nav === "accountList") {
        return(
            <div className={isSelected ? "selected":"not-selected"} identifier={myID} onClick={e=>{eventHandler(myID, nav)
            setIsSelected(selected => !selected)}}>
                <p>{name}</p>
            </div>
        );
    }
    if (nav === "userList") {
        return(
            <div className={isSelected ? "selected":"not-selected"} identifier={myID} onClick={e=>{eventHandler(myID, nav)
                setIsSelected(selected => !selected)}}>
                <p>{name}</p>
            </div>
        );
    }
}

export default User