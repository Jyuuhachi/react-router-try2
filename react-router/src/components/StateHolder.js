import React from "react"

function StateHolder() {
    const [userList, setUserList] = React.useState([])
    const [displayMessages, setDisplayMessages] = React.useState([])
    const [user, setUser] = React.useState(1)
    const [chronoID, setChronoID] = React.useState(0)
    const [account, setAccount] = React.useState(2)
    React.useEffect(() => {fetch(URL).then(response=>response.json()).then(data => {setUserList(data)})}, [])
    //React.useEffect(() => {fetch(U;RL).then(response=>response.json()).then(data => {setUserList(data)
    //    renderMessages(1,2,data)})}, [])


    
    return(<div></div>)
}
export default StateHolder