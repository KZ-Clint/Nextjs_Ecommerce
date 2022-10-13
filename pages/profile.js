import Head from 'next/head'
import {useState,useContext,useEffect}from 'react'
import { DataContext } from '../store/GlobalState'
import axios from 'axios'
import { ImageUpload } from '../authent/imageUpload'
import Link from 'next/link'
import baseUrl from '../components/base/baseUrl'

export default function Profile({ CUP, CN, CA })  {

    const initialState = { avatar: '', name: '', password: '', cf_password: '' }

    const [ data, setData ] = useState(initialState)
    const { avatar, name, password, cf_password } = data 

    const { state, dispatch } = useContext(DataContext)
    const { user, notify, orders } = state

    useEffect( () => {
        if( user.user ) {
           setData({ ...data, name: user.user.name })
        }
       
    },[user.user] )

    const handleChange = (e) => {
        const { name, value } = e.target
        setData( { ...data, [name]:value })
        dispatch( {type: 'NOTIFY', payload:{} } )
    }

    const validate = (values) => {
        const errors = {}
        const rege = /[^a-z]/i;
    
        if(!values.name) {
            errors.name = "Username is required!"
        }else if (values.name.length > 15 ) {
            errors.name = " Username must not be more than 15 letters "
        }else if (values.name.length < 2 ) {
            errors.name = " Username must not be less than 2 letters "
        }
        else if ( values.name.match(rege) ) {
            errors.name = " Invalid username "
        }
        if(!values.password) {
            errors.password = "Password is required!"
        } else if ( values.password.length < 8 ) {
            errors.password = " Password must be more than 4 letters "
        }
        else if(values.cf_password !== values.password ) {
            errors.password = "Password does not match!" 
         }
        return errors   
        
      }

    const handleUpdateProfile = async (e) => {
        e.preventDefault()
        let errorObj = validate(data)
        if (Object.keys(errorObj).length === 0){
           const res = await axios.patch(`${baseUrl}/user/`, data ,{  headers: {
            'Authorization': `Bearer ${user.access_token} `
          }} )
          console.log(res.data)
        //   localStorage.setItem('user', JSON.stringify(res.data))
        }
        else {
          console.log(errorObj)
          dispatch( { type: 'NOTIFY', payload: {error: errorObj.name}  } )
        }

        if( name !== user.user.name || avatar ) {
            updateInfor()
            // localStorage.setItem('user', JSON.stringify(user))
        }
    }

    const changeAvatar = (e) => {
        const file = e.target.files[0]
        if(!file) {
            return dispatch({ type: 'NOTIFY', payload: { error: 'File does not exist' } })
        }
        if(file.size > 1024 * 1024  ) //1mb 
         {
            return dispatch({ type: 'NOTIFY', payload: { error: ' The Largest image size is 1mb ' } })
        }
        if(file.type !== "image/jpeg" && file.type !== "image/png" ) {
            return dispatch({ type: 'NOTIFY', payload: { error: 'image format is incorrect' } })
        }

        //  console.log(file)   
        setData({...data, avatar: file})
    }
    
    const updateInfor = async () => {
        let media; 

        if(avatar) {
            media = await ImageUpload([avatar], CUP, CN, CA)
        }
        console.log({media})
        if( media || !avatar ) {
               const res = await axios.patch(`${baseUrl}/user/avatar`, { avatar : avatar ? media[0].url : user.user.avatar  }  ,{  headers: {
                 'Authorization': `Bearer ${user.access_token} `
               }} )
                console.log({change:res.data})
                localStorage.setItem('user', JSON.stringify( { email : user.email , 
                    refresh_token: user.refresh_token ,
                    access_token: user.access_token,
                     user: res.data } ))

                dispatch( { type: 'AUTH', payload: { email : user.email , 
                 refresh_token: user.refresh_token ,
                 access_token: user.access_token,
                  user: res.data }
                } )                        
                    
                    console.log('sgggggggggggggggggggggggggggggggg')
             }
        
        }


    return (
        <>
        {  Object.keys(user).length !== 0 ?

          <div className="profile_page">
             <Head>
                 <title> Profile </title>
             </Head>

             <section className="row text-secondary my-3">
             
                <div className="col-md-4">
                    <h3 className="text-center text-uppercase">
                         { user.user.role === 'user' ? 'User Profile' : 'Admin Profile' }
                    </h3>
                    <div className="avatar">
                        <img src={ avatar ? URL.createObjectURL(avatar) : user.user.avatar} alt="avatar" />
                        <span>
                            <i className="fas fa-camera"></i>
                            <p> Change </p>
                            <input type="file" name="file" id="file_up" 
                            accept="image/*" onChange={changeAvatar} />
                        </span>
                    </div> 
                    <div className="form-group" >
                        <label htmlFor="name" > Name </label>
                        <input type="text" name="name" id="name" value={name} className="form-control" placeholder="Your name" onChange={handleChange} />              
                    </div>
                    <div className="form-group" >
                        <label htmlFor="email"> Email </label>
                        <input type="email" name="email" id="email" defaultValue={user.user.email} className="form-control" disabled = {true} />              
                    </div>
                    <div className="form-group" >
                        <label htmlFor="password" > New password </label>
                        <input type="password" name="password" id="password" value={password} className="form-control" placeholder="Your new password" onChange={handleChange} />              
                    </div>
                    <div className="form-group" >
                        <label htmlFor="cf_password" > Confirm password </label>
                        <input type="password" name="cf_password" id="cf_password" value={cf_password} className="form-control" placeholder="Confirm new password" onChange={handleChange} />              
                    </div>

                    <button className="btn-btn-info" disabled={notify.loading} onClick={handleUpdateProfile} > Update </button>

                </div>

                <div className="col-md-8 table-responsive ">
                    <h3 className="text-uppercase" > Orders </h3>
                    <div className="my-3">
                        <table className="table-boarded table-hover w-100 text-uppercase"
                        style={{minWidth: '600px', cursor: 'pointer'}} >
                            <thead className="bg-light font-weight-bold" >
                                <tr>
                                    <td className="p-2"> id </td>
                                    <td className="p-2"> date </td>
                                    <td className="p-2"> total </td>
                                    <td className="p-2"> delivered </td>
                                    <td className="p-2"> paid </td>
                                </tr>
                            </thead>
                                <tbody>
                                    {
                                        orders.map( (order) => (
                                            <tr key={order._id} >
                                                <td className="p-2"> 
                                                   <Link href={`/order/${order._id}`} >
                                                       <a> {order._id} </a>
                                                   </Link>
                                                 </td>
                                                <td className="p-2"> { new Date(order.createdAt).toLocaleDateString() } </td>
                                                <td className="p-2"> ${order.total} </td>
                                                <td className="p-2"> {
                                                    order.delivered ? <i className="fas fa-check text-success"></i> 
                                                    : <i className="fas fa-times text-danger"></i>
                                                } </td>
                                                <td className="p-2"> 
                                                   {
                                                       order.paid ? <i className="fas fa-check text-success"></i> 
                                                       : <i className="fas fa-times text-danger"></i>
                                                   }
                                                 </td>
                                           </tr>
                                        ) )
                                    }
                                </tbody>

                        </table> 
                    </div> 
                </div>

                
             </section>
          </div>
         : <div></div>
        }
        </>
    )
}


export function getServerSideProps ({req,res}) {
    let CLOUD_UPDATE_PRESET = process.env.CLOUD_UPDATE_PRESET
    let CLOUD_NAME  = process.env.CLOUD_NAME
    let CLOUD_API = process.env.CLOUD_API
    return {
        props: { CUP : CLOUD_UPDATE_PRESET,
                 CN :  CLOUD_NAME,
                 CA : CLOUD_API  
        }
    }
 
 }