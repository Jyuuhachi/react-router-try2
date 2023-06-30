import {useLoaderData} from "react-router-dom"
import Message from "./Message"
import {renderMessages, newMessage} from '../data-functions'



function Chat({user, account, userList, changeChronoID, newMessage}) {
        let currentMessager
        const toSort = []
        const toDisplay = []
        for (let i=0;i<userList.length;i++) {
          if (userList[i].id === user) {
            currentMessager = userList[i]
            }
          }
          for (let x=0;x<currentMessager.messages.length;x++) {
            //console.log(currentMessager.messages[x])
            if (currentMessager.messages[x].id === account) {
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
          changeChronoID(toDisplay.length - 1)
          //console.log(toSort)
          //console.log(toDisplay)

return(
    <div className="chat">
            <ul>
            {toDisplay.map(message => <Message  key={message.chronoID} content={message.content} sent={message.sent}/>
            )}
            </ul>
            <form onSubmit={e=> {e.preventDefault() 
              newMessage(e.target.message.value)
              e.target.reset()}}>
                <input type="text" name="message"></input>
                <input type="submit" value="Send"></input>
            </form>
        </div>
    );
}

export default Chat