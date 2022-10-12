import Head from 'next/Head'
import { useState, useEffect, useContext } from 'react'
import { DataContext } from '../../store/GlobalState'
import { updateItem } from '../../store/Actions'
import {useRouter} from 'next/router'
import axios from 'axios'




export default function DetailOrder () {

    const router = useRouter()
    const {id} = router.query

    const {state, dispatch} = useContext(DataContext)
    const {user, users} = state

    const [ editUser, setEditUser ] = useState([])
    const [ checkAdmin, setCheckAdmin ] = useState(false)
    const [ num , setNum ] = useState(0)

    useEffect( () => {
       users.forEach( (user) => {
         if( user._id === id ) {
            setEditUser(user)
            setCheckAdmin( user.role === 'admin' ? true : false )
         } } )
         
    },[users] )

    const handleCheck = () => {
       setCheckAdmin(!checkAdmin)
       console.log(editUser._id)
       setNum( num + 1 )
    }

    const handleSubmit = async () => {
        let role = checkAdmin? 'admin' : 'user'
        if( num % 2 !== 0 ) {
            dispatch({type: 'NOTIFY', payload: {loading: true} })
            try{
               const res = await axios.patch(`http://localhost:5000/user/users/adminusers/${editUser._id}`,  {role}  , {  headers: {
                  'Authorization': `Bearer ${user.access_token} `
              }} )
              console.log(res.data)
              dispatch({type: 'NOTIFY', payload: {loading: false} })
              dispatch({type: 'NOTIFY', payload: {success: res.data.msg} })
              dispatch(updateItem( users, editUser._id, {
                ...editUser, role
              }, 'ADD_USERS' ) )
            } catch (error) {
               dispatch({type: 'NOTIFY', payload: {loading: false} })
               dispatch({type: 'NOTIFY', payload: {error: error.response.data} })
            }
        }

    }
    
    return(
        <>
        <div className=" edit_user my-3 " >
            <Head>
              <title> Edit User </title> 
            </Head>

           <div  >
              <button className="btn btn-dark" onClick={ () => { router.back() } } >
                  <i className="fas fa-long-arrow-alt-left" aria-hidden={true} ></i> Go back
              </button>
           </div>

           <div className="col-md-4 mx-auto my-4" >
              <h2 className='text-uppercase text-secondary'> Edit User </h2>
              <div className="form-group">
                 <label htmlFor="name" className="d-block" > Name </label>
                 <input type="text" id="name" defaultValue={editUser.name} disabled />
              </div>
              <div className="form-group">
                 <label htmlFor="email" className="d-block" > Email </label>
                 <input type="email" id="email" defaultValue={editUser.email} disabled />
              </div>
              <div className="form-group">
                 <input type="checkbox" id="isAdmin" checked={checkAdmin} 
                 style={{width: '20px', height: '20px' }}
                 onChange={handleCheck} />
                 <label htmlFor="isAdmin" style={{transform: 'translate(4px, -3px)' }} > isAdmin </label>
              </div>

              <button className="btn btn-dark" onClick={ handleSubmit } > Update </button>

              {/* <button className="btn btn-dark" onClick={ () => { handleSubmit(editUser._id) }  } > Update </button> */}
           </div>

        </div>
        
        </>
    )
}