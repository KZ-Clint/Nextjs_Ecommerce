import React, { useContext, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { DataContext } from '../store/GlobalState'

export default function NavBar () {

    const router = useRouter()
    const { state, dispatch } = useContext(DataContext)
    const { user, cart } = state



    const isActive = (r) => {
        if ( r === router.pathname ) {
            return " active"
        } else {
            return ""
        }
    }

    const handleLogout = () => {
//REMOVE COOKIES, IT WORKED /////////////////////////////////////
        // fetch( '/api/logout', {
        //     method: "post",
        //     headers: {
        //        "content-type": "application/json"
        //     },
        //     body: JSON.stringify( {} )
        // } )
        dispatch({type: 'AUTH', payload: {} })
        dispatch({ type:'ADD_CART', payload:[]})
        localStorage.removeItem('cart01')
        localStorage.removeItem('user')
       return router.push('/signin')
    }

    const adminRouter = () => {
        return (
            <>
              <Link href="/users" >
                <a className="dropdown-item"> Users </a>
              </Link>  
              <Link href="/create" >
                <a className="dropdown-item"> Products </a>
              </Link> 
              <Link href="/categories" >
                <a className="dropdown-item"> categories </a>
              </Link>  
            </>
        )   
    }

    const loggedRouter = () => {
        return (
            <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                <img src={user.user.avatar} alt={user.user.avatar} 
                style={ {
                    borderRadius: '50%', width: '30px', height: '30px',
                    transform: 'translateY(-3px)', marginRight: '3px'
                } }  />
                {user.user.name}
                </a>
                <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                 <Link href="/profile" >
                    <a className="dropdown-item"> Profie </a>
                 </Link>   
                 {
                    user.user.role === 'admin' && adminRouter()
                 }
                 <div className="dropdown-divider">
                    
                 </div>
                <button className="dropdown-item" onClick={handleLogout}> Log Out </button>
            </div>
       </li>
        )  
    }
   
    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <Link href={"/"} >
                   <a className="navbar-brand" href="#"> DEV AT </a>
                </Link>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse justify-content-end " id="navbarNavDropdown">
                <ul className="navbar-nav p-1 ">
                        <li className="nav-item">
                            <Link href={"/cart"} >
                              <a className={"nav-link" + isActive('/cart') }>
                                 <i className="fa-solid fa-cart-shopping position-relative">
                                    <span className="position-absolute" style={{padding: '3px 6px', background: '#ed143dc2', borderRadius: '50px', top: '-10px', right: '-10px',  color: 'white', fontSize:'14px' }} >
                                     {cart.length} </span>
                                 </i> Cart 
                              </a>
                            </Link>
                        </li>

                        {  
                            Object.keys(user).length === 0  ? 
                             <li className="nav-item">
                                <Link href={"/signin"} >
                                    <a className={"nav-link" + isActive('/signin') }>
                                        <i className="fa-solid fa-user"></i> Sign In 
                                    </a>
                                </Link>
                             </li> : loggedRouter()
                        }

                    </ul>
                </div>
        </nav>  
                    
     </>             
    )
}