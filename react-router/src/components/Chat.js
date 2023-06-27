import Message from "./Message"

function Chat({display, newMessage}) {
const fuckYou = display.map(message => <Message  key={message.chronoID} content={message.content} sent={message.sent}/>)


//console.log(display)
    return(
        <div className="chat">
            <ul>
                {display.map(message => <Message  key={message.chronoID} content={message.content} sent={message.sent}/>
                )}
            </ul>
            <form onSubmit={e=> {e.preventDefault()
                newMessage(e.target.message.value)}}>
                <input type="text" name="message"></input>
                <input type="submit"></input>
            </form>
        </div>
    );
}

export default Chat