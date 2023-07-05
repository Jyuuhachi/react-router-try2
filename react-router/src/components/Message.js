

function Message ({content, sent}) {


    return(
        <li className="message">
            <p className={sent ? "sent":"recieved"}>{content}</p>
        </li>
    )
}
export default Message