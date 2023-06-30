import {NavLink, Link} from 'react-router-dom'

function Speaker({user, changeUser}) {


    return(<li key={user.id} identifier={user.id} speaker={user} onClick={e=>{
        console.log(user)
        changeUser(user)}}>
                                      <NavLink
                    to={`contacts/${user.id}`}
                    className={({ isActive, isPending }) =>
                    isActive
                    ? "active"
                    : isPending
                    ? "pending"
                    : ""
                  }>
                  <Link to={`contacts/${user.id}`}>
                    {user.name ? (
                      <>
                        {user.name}
                      </>
                    ) : (
                      <i>No Name</i>
                      )}{" "}
                  </Link>
                        </NavLink>
                </li>
                )
}

export default Speaker