import React from "react";
function Form({addUser}){
    const [userContact, setUserContact]= React.useState({
        id:0,
        name: "",
        messages: []
    })

    function handleFormData(e){
        setUserContact({...userContact, [e.target.name]: e.target.value})
    }
    function handleSubmit(e){
        e.preventDefault()
        addUser(userContact)
        e.target.reset()
    }

    return(
        <div className="form">
            <h2>Add Users</h2>
            <form onSubmit={handleSubmit}>
          <input onChange={handleFormData} type="text" name="name" placeholder="Username" />
          <button type="submit">Add User</button>
        </form>
      </div>
    )
}
export default Form;