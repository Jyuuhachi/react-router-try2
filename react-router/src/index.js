import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Navigation from './Navigation';
import Nav from './components/Nav'
import reportWebVitals from './reportWebVitals';
import Contacts, {loader as contactLoader} from './components/Contacts'
import Chat, {loader as chatLoader} from './components/Chat'
import ErrorPage from './components/error-page'
import DefaultPage from './components/default-page'
import {createBrowserRouter, RouterProvider, BrowserRouter, Routes, Route} from "react-router-dom"
const URL = "http://localhost:3000/data"

export default function App () {

  const [userList, setUserList] = React.useState([])
  const [displayMessages, setDisplayMessages] = React.useState([])
  const [user, setUser] = React.useState(1)
  const [chronoID, setChronoID] = React.useState(0)
  const [account, setAccount] = React.useState(2)
  const [currentSpeaker, setCurrentSpeaker] = React.useState({})


  function extractStates() {
    const allStates = {Userlist:userList, Displaymessages:displayMessages, User:user, ChronoID:chronoID, Account:account}
    const allSets = {setuserlist:setUserList, setdisplaymessages:setDisplayMessages, setuser:setUser, setchronoid:setChronoID, setaccount:setAccount}
    return([allStates, allSets])
  }
  
  function chatSwitch(ID, nav) {
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
        setUser(onegai)
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
        setAccount(onegai)
        renderMessages(user, onegai, userList)
        }
      }
  }
  
  React.useEffect(() => {fetch(URL).then(response=>response.json()).then(data => {setUserList(data)
     renderMessages(1,2,data)})}, [])
  
  const navUserList = userList.map(item => ({name:item.name, id:item.id}))
  const navAccountList = userList.map(item => ({name:item.name, id:item.id}))
  
  function findCurrentSpeaker(userID, accountID, data) {
    console.log(userID)
    console.log(data.length)
    let currentMessager
    for (let i=0;i<data.length;i++) {
      if (data[i].id === userID) {
        currentMessager = data[i]
        console.log(data[i])
        setCurrentSpeaker(data[i])
        }
      }
      console.log(currentMessager)
      return (currentMessager)
  }

  function addUser(contact){
    fetch(URL,{
      method:"POST",
      headers:{
        "Content-Type": "application/json"
      },
      body: JSON.stringify(contact)
    })
    .then(res=>res.json())
    .then(newContact=>setUserList([...userList, newContact]))

  }

  function renderMessages(userID=user, accountID=account, data=userList) {
    console.log(userID)
    console.log(accountID)
    console.log(data)
    const currentMessager = findCurrentSpeaker(userID, accountID, data)
    const toSort = []
    const toDisplay = []
    //console.log(userID)
    //console.log(accountID)
    console.log(currentMessager)
    console.log(currentSpeaker)
    /*
    for (let i=0;i<data.length;i++) {
      if (data[i].id === userID) {
        currentMessager = data[i]
        setCurrentSpeaker(currentMessager)
        }
      } */


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
      setChronoID(toDisplay.length - 1)
      //console.log(toSort)
      //console.log(toDisplay)
      setDisplayMessages(toDisplay)
  }

  function changeUser (speaker) {
    const newID = speaker.id
    console.log(user)
    displayChat(speaker, true)
    setUser(newID)
  }

  function changeAccount (listener) {
    const newAccount = listener.id
    displayChat(listener, false)
    setAccount(newAccount)
  }
  
  function displayChat(contact, isSpeaker) {
    const toSort = []
    const toDisplay = []
    console.log(contact)
    for (let x=0;x<contact.messages.length;x++) {
      //console.log(currentMessager.messages[x])
      if (contact.messages[x].id === (isSpeaker ? account:user)) {
        //console.log("sort if is triggering")
          toSort.push(contact.messages[x])
      }
    }
  //console.log(toSort)
    for (let n=0;n<toSort.length;n++){
        if (toSort[n].chronoID === n) {
          //console.log(toSort[n])
          toDisplay.push(toSort[n])
        }
    }
    setChronoID(toDisplay.length - 1)
    //console.log(toSort)
    //console.log(toDisplay)
    setDisplayMessages(toDisplay)
  }

  function changeChronoID (length) {
    setChronoID(length)
  }

  function newMessage(message) {
    const activeSpeaker = user
    const activeListener = account
    const newUserList = userList
    const sentMessage = {sent:true, content:message, chronoID:(chronoID+1), id:account}
    const recievedMessage = {sent:false, content:message, chronoID:(chronoID+1), id:user}
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
  }).then(response=>response.json()).then(data=>displayChat(data, true))
  fetch(`${URL}/${account.toString()}`, {method: "PATCH", headers:{
    "Content-Type":"application/json"
    },
    body: JSON.stringify({messages:newReciever})
  }).then(response=>response.json()).then(data=>console.log(data))
    setUserList(newUserList)
    console.log("I trigger at the end of newMessage")
  }


  return (
    <BrowserRouter>
    <Routes>
    <Route path="/" element={<Navigation changeUser={changeUser} userList={userList} addUser={addUser}/>}>
      <Route index element={<DefaultPage/>}/>
      <Route path="contacts/:contactID" element={<Contacts userList={userList} user={user} changeAccount={changeAccount}/>}/>
      <Route path="contacts/:contactID/chat" element={<Chat  userList={userList} user={user} account={account} changeChronoID={changeChronoID} newMessage={newMessage}/>}/>
    </Route>
    </Routes>
    </BrowserRouter>
  )
}


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
