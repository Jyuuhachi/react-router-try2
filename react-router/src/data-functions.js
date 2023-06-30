import React from "react"
export let userList = await initializeUsers()
export let displayList = await initializeDisplay()
export let displayMessages = []
export let user = 1
export let account = 2
export let chronoID = 0

export function stateHolder(request){
    /*
    const [userList, setUserList] = React.useState([])
    const [displayMessages, setDisplayMessages] = React.useState([])
    const [user, setUser] = React.useState(1)
    const [chronoID, setChronoID] = React.useState(0)
    const [account, setAccount] = React.useState(2)
    React.useEffect(() => {fetch(URL).then(response=>response.json()).then(data => {setUserList(data)
        renderMessages(1,2,data)})}, [])
        */

}

async function initializeUsers () {

   const response = await fetch('http://localhost:3000/data')
    const users = await response.json()

    return await users
}

async function initializeDisplay () {
    const data = userList.filter(item => {if (item.id === 1) {
        return false
    }
    else {
        return true
    }
})
}

export function sendDisplayList() {
    return displayList
}



export function chatSwitch(ID, nav) {
  const onegai = ID
    if (nav === "userList") {
      console.log("nav user list is triggering")
      console.log(nav)
      console.log(onegai)
      console.log(account)
      if(onegai === account) {
        console.log("I'm the if")
        console.log(user)
        console.log(account)
      }
      else {
      console.log("I'm the else")
      //setUser(onegai)
      user = onegai
      renderMessages(onegai, account, userList)
      }
    }
    if (nav === "accountList") {
      console.log("nav account list is triggering")
      console.log(nav)
      console.log(onegai)
      console.log(user)
      if(onegai === user) {
        console.log("I'm the if")
        console.log(user)
        console.log(account)
      }
      else {
      console.log("I'm the else")
      //setAccount(onegai)
      account = onegai
      renderMessages(user, onegai, userList)
      }
    }
}

export function changeUser (e) {
    let newID = e.target.parentNode.parentNode.getAttribute("identifier")
    console.log(user)
    user = newID
    console.log(user)
    renderContacts(newID)
}

export function renderContacts (contact=user) {
    displayMessages = userList.filter(item => {
        if (item.id === contact) {
            return false
        }
        else {
            return true
        }
    })
    return displayMessages
}

export function renderMessages(userID, accountID, data=userList) {
  let currentMessager
  const toSort = []
  const toDisplay = []
  //console.log(userID)
  //console.log(accountID)

    for (let i=0;i<data.length;i++) {
      if (data[i].id === userID) {
        currentMessager = data[i]
      }
    }
    //console.log(currentMessager)
    for (let x=0;x<currentMessager.messages.length;x++) {
      //console.log(currentMessager.messages[x])
      if (currentMessager.messages[x].id === accountID) {
        //console.log("sort if is triggering")
          toSort.push(currentMessager.messages[x])
      }
    }
  //console.log(toSort)
    for (let n=0;n<toSort.length;n++){
        if (toSort[n].chronoID === n) {
          //console.log(toSort[n])
          toDisplay.push(toSort[n])
        }
    }
    //setChronoID(toDisplay.length - 1)
    chronoID = (toDisplay.length - 1)
    //console.log(toSort)
    //console.log(toDisplay)
    //setDisplayMessages(toDisplay)
    displayMessages = toDisplay

    return(toDisplay)
}

export function newMessage(message) {
  const activeSpeaker = user
  const activeListener = account
  const newUserList = userList
  const sentMessage = {sent:true, content:message, chronoID:(chronoID+1), id:account}
  const recievedMessage = {sent:true, content:message, chronoID:(chronoID+1), id:user}
  let newSender
  let newReciever
  console.log(newUserList)
  console.log("I trigger at the start of newMessage")

  for (let i=0;i<newUserList.length;i++) {
      console.log("for loop adding sent message triggering")
      //console.log(newUserList[i])
      //console.log(activeSpeaker)

    if (newUserList[i].id === activeSpeaker) {

      console.log("newUserList is being updated for active speaker")
      newUserList[i].messages.push(sentMessage)
      //console.log(newUserList[i].messages)
      //console.log(sentMessage)
    }
  }
  for (let n=0;n<newUserList.length;n++) {
    console.log("for loop adding recieved message triggering")
    if (newUserList[n].id === activeListener) {
      newUserList[n].messages.push(recievedMessage)
    }
  }
  for (let l=0;l<newUserList.length;l++) {
    console.log("for loop for sending patched sender object triggering")
    if (newUserList[l].id === activeSpeaker) {
      newSender = newUserList[l].messages
    }
  }
  for (let p=0;p<newUserList.length;p++) {
    console.log("for loop for sending patched reciever object triggering")
    if (newUserList[p].id === activeListener) {
      newReciever = newUserList[p].messages
    }
  }
  fetch(`${URL}/${user.toString()}`, {method: "PATCH", headers:{
      "Content-Type":"application/json"
  },
  body: JSON.stringify({messages:newSender})
}).then(response=>response.json()).then(data=>console.log(data))
fetch(`${URL}/${account.toString()}`, {method: "PATCH", headers:{
  "Content-Type":"application/json"
  },
  body: JSON.stringify({messages:newReciever})
}).then(response=>response.json()).then(data=>console.log(data))
  //setUserList(newUserList)
  userList = newUserList
  console.log("I trigger at the end of newMessage")
  renderMessages(user, account)
}

