import {useState, useContext} from 'react'
import axios from 'axios'
import { DataContext } from '../../store/GlobalState'
import Cookies from 'js-cookie'

export const useLogin = () => {
    const [ Error, setError ] = useState(null)

    const { state, dispatch} = useContext(DataContext)
  

    const Login =  (userData ) => {
        dispatch({type: 'NOTIFY', payload: {loading : true} })
    
          axios.post( 'http://localhost:5000/user/login', userData
        //   {
        //     headers: {
        //         'Authorization': `Bearer ${user.token} `
        //       }
        //   } 
          )
          .then( (response) => {
            console.log(response.data)
            dispatch({type: 'NOTIFY', payload: {loading : false} })
            localStorage.setItem('user', JSON.stringify(response.data))
            dispatch({type: 'AUTH', payload: response.data })  
            // Cookies.set( "token", JSON.stringify(response.data), { expires : 1/24 }  )
            // fetch( '/api/login', {
            //     method: "post",
            //     headers: {
            //        "content-type": "application/json"
            //     },
            //     body: JSON.stringify( { token : response.data } )
            // } )
            axios.post("/api/login",{
             token: response.data   
            })
          } )
          .catch( (error) => {
            dispatch({type: 'NOTIFY', payload: {loading : false} })
            setError(error.response.data.error)
            console.log({error})
          } )
      

    }


      return { Login,  Error }
}

