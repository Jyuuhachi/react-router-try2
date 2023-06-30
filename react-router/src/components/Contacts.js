import User from "./User"
import { Form, useLoaderData } from "react-router-dom";


function Contacts ({user, userList, changeAccount}) {
const data = userList
//console.log(userList)
//console.log(data)
let contactList = userList.filter(item => {

//console.log(item.id)
//console.log(user)
    if(item.id === user) {
       return false
    }
    else {
        return true
    }
})
//console.log(contactList)
    
        return(
            <div className="userList">
                <p>proving that something works</p>
                <ul>
                {contactList.map(item => <User name={item.name} key={item.id} changeAccount={changeAccount} user={user} account={item}/>)}
                </ul>
            </div>
        );
    }

export default Contacts