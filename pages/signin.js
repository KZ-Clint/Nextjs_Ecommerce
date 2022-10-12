import Head from 'next/head'
import Link from 'next/link'
import { useState, useContext, useEffect } from 'react'
import { useLogin } from './hooks/useLoginHook'
import { DataContext } from '../store/GlobalState'
import { useRouter } from 'next/router'

export default function Signin ( {token} ) {

    const initialState = { email: '', password: '' }
    const [ userData, setUserData ] = useState(initialState)
    const {  email, password } = userData
    const {  Login, Error } = useLogin()
    const router = useRouter()

    const { state, dispatch} = useContext(DataContext)
    const { user } = state
    
    const handleChangeInput = (e) => {
       const { name, value } = e.target
       setUserData( { ...userData, [name]:value  } )
    }
  
    const handleSubmit = (e) => {
       e.preventDefault()
       Login(userData)
      
    }

    const removeCookie = () => {
        // Cookies.remove("token")
        fetch( '/api/logout', {
            method: "post",
            headers: {
               "content-type": "application/json"
            },
            body: JSON.stringify( {} )
        } )
     }

     useEffect( () => {
       if ( Object.keys(user).length !== 0 )
       router.push("/")
     },[user] )

  return (
         <>
            <Head>
                <title> Sign in Page </title>
            </Head>
            
            <form className='mx-auto my-4' style={{maxWidth: '500px' }} onSubmit={handleSubmit} >

                <div className="form-group">
                    <label htmlFor="exampleInputEmail1">Email address</label>
                    <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"
                     name="email" value={email} onChange={handleChangeInput} />
                    <small id="emailHelp" className="form-text text-muted">We&#39;ll never share your email with anyone else </small>
                </div>

    <p> { Error && Error } </p>
    <p> { user.user && user.user.name } </p>
    <p onClick={removeCookie}> REMOVE COOKIE {token.user && token.user.name} </p> 

                <div className="form-group">
                    <label htmlFor="exampleInputPassword1">Password</label>
                    <input type="password" className="form-control" id="exampleInputPassword1"
                     name="password" value={password} onChange={handleChangeInput} />
                </div>

                <button type="submit" className="btn btn-dark"> Login </button>
                <p> You don&apos;t have an account 
                    <Link href={"/register"}> 
                      <a  style={ {color: 'crimson' } }  > Register Now </a> 
                    </Link> 
                </p>
            </form>
            

         </>
  )
}

export function getServerSideProps ({req,res}) {
    let tokenReq= {}
    if(req.cookies.token){
        tokenReq=JSON.parse(req.cookies.token)
    }
    return {
        props: { token: tokenReq }
    }
 
 }