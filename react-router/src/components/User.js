

function User({name, setUser, setAccount, nav}) {

    if (nav === "accountList") {
        return(
            <div className="account">

            </div>
        );
    }
    if (nav === "userList") {
        return(
            <div className="user">
                
            </div>
        );
    }
}