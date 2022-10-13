import {useState, useContext} from 'react'
import axios from 'axios'
import { DataContext } from '../../store/GlobalState'
import baseUrl from '../../components/base/baseUrl'

export const useSignup = () => {
    const [ formErrors, setFormErrors ] = useState({})
    const [ Error, setError ] = useState(null)

    const { state, dispatch} = useContext(DataContext)

    const signUp =  (userData ) => {
        let errorObj =  validate(userData)
        if (Object.keys(errorObj).length === 0){
    
          axios.post( `${baseUrl}/user/signup`, userData)
          .then( (response) => {
            console.log(response.data)
            localStorage.setItem('user', JSON.stringify(response.data))
            dispatch({type: 'AUTH', payload: response.data } )
          } )
          .catch( (err) => {
            setError(err.response.data.error)
          } )
      } 
       else {
          setFormErrors(errorObj)
          console.log({errorObj})
          return errorObj
       }
    }

    const validate = (values) => {
        const errors = {}
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
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
        if(!values.email) {
            errors.email = "Email is required!"
        } else if (!regex.test(values.email)) {
            errors.email = " This is not  a valid email! "
        } else if (!values.email.includes('com') || !values.email.includes('gmail')  ) {
           errors.email = "Not a valid email"
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

      return { signUp, formErrors, Error }
}