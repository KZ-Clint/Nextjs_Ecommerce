import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { useState, useContext, useEffect } from 'react'
import { useSignup } from './hooks/useSignupHook'
import { DataContext } from '../store/GlobalState'
import { useRouter } from 'next/router'


export default function Register () {

  const initialState = { name: '', email: '', password: '', cf_password: '' }
  const [ userData, setUserData ] = useState(initialState)
  const { name, email, password, cf_password } = userData
  const { signUp, formErrors, Error } = useSignup()
  const router = useRouter()

  const { state, dispatch  } = useContext(DataContext)
  const { user } = state

  
  const handleChangeInput = (e) => {
     const { name, value } = e.target
     setUserData( { ...userData, [name]:value  } )
    //  dispatch({type: 'NOTIFY', payload: {} })
  }

  const handleSubmit = (e) => {
     e.preventDefault()
     dispatch({type: 'NOTIFY', payload: {loading : true} })
     const errorObj = signUp(userData)
    
    if (errorObj){
        console.log({errorObj})
        dispatch({type: 'NOTIFY', payload: {error : errorObj.name} })
    } else {
        dispatch({type: 'NOTIFY', payload: {success : 'OK'} })
    }
  }

  useEffect( () => {
    if ( Object.keys(user).length !== 0 )
    router.push("/")
  },[user] )

  return (
         <>
             <Head>
                <title> Register Page </title>
            </Head>
            
            <form className='mx-auto my-4' style={{maxWidth: '500px' }} onSubmit={handleSubmit} >

                <div className="form-group">
                    <label htmlFor="name"> Name </label>
                    <input type="text" className="form-control" id="name" name="name" value={name} onChange={handleChangeInput} />
                </div>
                  <p> {Error} </p> 
                 <p> { formErrors && formErrors.password} </p>
                <div className="form-group">
                    <label htmlFor="exampleInputEmail1">Email address</label>
                    <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" name="email" value={email} onChange={handleChangeInput} />
                    <small id="emailHelp" className="form-text text-muted">We&#39;ll never share your email with anyone else.</small>
                </div>

                <div className="form-group">
                    <label htmlFor="exampleInputPassword1">Password</label>
                    <input type="password" className="form-control" id="exampleInputPassword1" name="password" value={password} onChange={handleChangeInput} />
                </div>

                <div className="form-group">
                    <label htmlFor="exampleInputPassword2"> Confirm Password</label>
                    <input type="password" className="form-control" id="exampleInputPassword2" name="cf_password" value={cf_password} onChange={handleChangeInput} />
                </div>

                

                <button type="submit" className="btn btn-dark"> Register </button>
                <p> Already have an account? 
                    <Link href={"/signin"}> 
                      <a  style={ {color: 'crimson' } }  > Login Now </a> 
                    </Link> 
                </p>
            </form>
         </>
  )
}