

function Chat({display}) {


    return(
        <div className="chat">
            <ul>
                {display.map(message => {
                    <li key={message.id}>
                        <p>{message.content}</p>
                    </li>
                })}
            </ul>
            <form>
            <input type="text" name="text" value={text} onChange={setText}/>
            <input type="submit" value="Send" />
            </form>
        </div>
    );
}