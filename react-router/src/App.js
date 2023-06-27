import logo from './logo.svg';
import React from 'react';
import Nav from './components/Nav'
import Chat from './components/Chat'
import Form from './components/Form'
import './App.css';

function App() {

  const [userList, setUserList] = React.useState([])
  const [displayMessages, setDisplayMessages] = React.useState([])
  const [user, setUser] = React.useState(0)
  const [chronoID, setChronoID] = React.useState(0)
  const [account, setAccount] = React.useState(0)

  React.useEffect(() => {fetch(URL).then(response=>response.json()).then(data => setUserList)}, [])

  const navUserList = userList.map(item => ({name:item.name, id:item.id}))
  const navAccountList = userList.map(item => ({name:item.name, id:item.id}))
  
  function renderMessages() {
    const toSort = []
    const toDisplay = []

      for (i=0;i<userList.length;i++) {
        if (userList[i].id === user) {
          for (x=0;x<userList[i].messages.length;x++) {
            if (userList[i].messages[x].id === account) {
                toSort.push(userList[i].messages[x])
            }
          }
        }
      }
      for (i=0;i<toSort.length;i++){
          if (toSort[i].chronoID === i) {
            toDisplay.push(toSort[i])
          }
      }
      setChronoID(toDisplay.length - 1)
      setDisplayMessages(toDisplay)
  }

  return (
    <div>
    <div className="accountList">
      <Nav list={navAccountList} nav="accountList" setAccount={setAccount} eventHandler={renderMessages}/>
    </div>
    <div className="userList">
      <Nav list={navUserList} nav="userList" setUser={setUser} eventHandler={renderMessages}/>
    </div>
    <div className="chat">
      <Chat display={displayMessages} />
    </div>
    </div>
  );
}

export default App;
