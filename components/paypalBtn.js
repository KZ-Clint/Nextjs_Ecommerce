import { useEffect, useRef, useContext } from "react"
import { DataContext } from '../store/GlobalState'
import axios from 'axios'
import { updateItem } from '../store/Actions'

export default function PaypalBtn ({ order }) {

    const refPaypalBtn = useRef()
    const { state, dispatch } = useContext(DataContext)
    const { user, orders } = state

    useEffect( () => {
        paypal.Buttons({
            // Sets up the transaction when a payment button is clicked
            createOrder: (data, actions) => {
              return actions.order.create({
                purchase_units: [{
                  amount: {
                    value: order.total // Can also reference a variable or function
                  }
                }]
              });
            },
            // Finalize the transaction after payer approval
            onApprove: (data, actions) => {
              return actions.order.capture().then(function(orderData) {
                console.log(orderData)
                 axios.patch( `http://localhost:5000/order/payment/${order._id}`,  { paymentId: orderData.payer.payer_id } ,{  headers: {
                  'Authorization': `Bearer ${user.access_token} `
                }} )
                 .then( (response) => {
                  console.log(response.data)

                  dispatch( updateItem(orders, order._id, {...order,
                    paid: true,
                    dateOfPayment: orderData.create_time,
                    paymentId: orderData.payer.payer_id, 
                    method: 'Paypal'
                    
                 }, 'ADD_ORDERS' ) )
                 
                  dispatch( {type: 'NOTIFY', payload: {success: response.data.msg } } )
                 } )
                 .catch( (error) => {
                   
                    return dispatch( {type: 'NOTIFY', payload: { error: "something went wrong" } } )
                    
                 } )
                // Successful capture! For dev/demo purposes:
                console.log('Capture result', orderData, JSON.stringify(orderData, null, 2));
                const transaction = orderData.purchase_units[0].payments.captures[0];
                alert(`Transaction ${transaction.status}: ${transaction.id}\n\nSee console for all available details`);
                // When ready to go live, remove the alert and show a success message within this page. For example:
                // const element = document.getElementById('paypal-button-container');
                // element.innerHTML = '<h3>Thank you for your payment!</h3>';
                // Or go to another URL:  actions.redirect('thank_you.html');
              });
            }
          }).render(refPaypalBtn.current);
    },[] )

    return (
        <>
          <div ref={refPaypalBtn} >
              
          </div>
        </>
    )
}