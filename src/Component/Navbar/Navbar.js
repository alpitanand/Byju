import React from 'react'
import Style from './Navbar.module.scss'
import Manager from './manager.png'

class Navbar extends React.Component{
    state={

    }
    render(){
        return(
          <>
          <nav className={Style.navigation}>
             <div>
                <img src={Manager}></img>
                <span>Job board</span>
             </div>
             <ul>
                 <li>
                    <span>Home</span>
                 </li>
             </ul>
          </nav>
          </>
        )
    }
}

export default Navbar