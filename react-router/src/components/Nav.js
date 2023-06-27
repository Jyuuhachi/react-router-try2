


function Nav ({list, nav, setUser, setAccount}) {

    
    if (nav === "userList") {
        return(
            <div className="userList">
                <ul>
                {list.map(item => <User name={item.name} key={item.id} setUser={setUser} nav={nav}/>)}
                </ul>
            </div>
        );
    }
    if (nav === "accountList") {
        return(
            <div className="accountList">
                <ul>
                {list.map(item => <User name={item.name} key={item.id} setAccount={setAccount} nav={nav}/>)}
                </ul>
            </div>
        );
    }
}