  // useEffect( () => {
  //   const cartLocal = JSON.parse(localStorage.getItem('cart01'))
  //   if(cartLocal.length > 0 ) {
  //      let newArr = []
  //      const update = async () => {  
  //      for ( const item of cartLocal ) {
  //      const res = await axios.get( `http://localhost:5000/product/${item._id}`)
     
  //           console.log(item._id)
  //           const {_id, title, images, price, inStock, sold} = res.data
  //           console.log(res.data)
  //           if(inStock > 0) {
  //             console.log('gotten for statement')
  //             newArr.push( {
  //               _id, title, images, price, inStock, sold,
  //               quantity: item.quantity > inStock - sold ? 1 : item.quantity
  //             } )
  //             console.log(item.inStock)
  //           }        
  //      }
  //         dispatch( {type: 'ADD_CART', payload: newArr } )
  //     }
  //     update()
  //   }
  
  // },[] )

    // useEffect( () => {
  //   const cartLocal = JSON.parse(localStorage.getItem('cart01'))
  //   if( cartLocal && cartLocal.length > 0 ) {
  //      let newArr = []
       
  //      for ( const item of cartLocal ) {
  //      axios.get( `http://localhost:5000/product/${item._id}`)
  //      .then ( (res) => {
  //       console.log(item._id)
  //       const {_id, title, images, price, inStock} = res.data
  //       console.log(res.data)
  //       if(inStock > 0) {
  //         console.log('gotten for statement')
  //         newArr.push( {
  //           _id, title, images, price, inStock,
  //           quantity: item.quantity > inStock ? 1 : item.quantity
  //         } )
  //         console.log(item.quantity)
  //       }   
  //       dispatch( {type: 'ADD_CART', payload: newArr } )   
        
  //      })
       
  //      }     
  //   }
  // },[] )


  // {
  //   "create_time": "2022-09-22T10:50:51Z",
  //   "update_time": "2022-09-22T10:51:40Z",
  //   "id": "20A345668N935984H",
  //   "intent": "CAPTURE",
  //   "status": "COMPLETED",
  //   "payer": {
  //     "email_address": "ezeclinton3@gmail.com",
  //     "payer_id": "DMN85BESA8P5E",
  //     "address": {
  //       "country_code": "NG"
  //     },
  //     "name": {
  //       "given_name": "Ogbonna",
  //       "surname": "Clinton"
  //     }
  //   },
  //   "purchase_units": [
  //     {
  //       "reference_id": "default",
  //       "soft_descriptor": "PAYPAL *TEST STORE",
  //       "amount": {
  //         "value": "5.00",
  //         "currency_code": "USD"
  //       },
  //       "payee": {
  //         "email_address": "sb-sbhzo20960038@business.example.com",
  //         "merchant_id": "9SPKQF9CYVX6Y"
  //       },
  //       "shipping": {
  //         "name": {
  //           "full_name": "Ogbonna Clinton"
  //         },
  //         "address": {
  //           "address_line_1": "Wodi New Layout",
  //           "address_line_2": "Elelenwo",
  //           "admin_area_2": "Port Harcourt",
  //           "admin_area_1": "RV",
  //           "postal_code": "500102",
  //           "country_code": "NG"
  //         }
  //       },
  //       "payments": {
  //         "captures": [
  //           {
  //             "status": "COMPLETED",
  //             "id": "1UM97363NP5910443",
  //             "final_capture": true,
  //             "create_time": "2022-09-22T10:51:40Z",
  //             "update_time": "2022-09-22T10:51:40Z",
  //             "amount": {
  //               "value": "5.00",
  //               "currency_code": "USD"
  //             },
  //             "seller_protection": {
  //               "status": "ELIGIBLE",
  //               "dispute_categories": [
  //                 "ITEM_NOT_RECEIVED",
  //                 "UNAUTHORIZED_TRANSACTION"
  //               ]
  //             },
  //             "links": [
  //               {
  //                 "href": "https://api.sandbox.paypal.com/v2/payments/captures/1UM97363NP5910443",
  //                 "rel": "self",
  //                 "method": "GET",
  //                 "title": "GET"
  //               },
  //               {
  //                 "href": "https://api.sandbox.paypal.com/v2/payments/captures/1UM97363NP5910443/refund",
  //                 "rel": "refund",
  //                 "method": "POST",
  //                 "title": "POST"
  //               },
  //               {
  //                 "href": "https://api.sandbox.paypal.com/v2/checkout/orders/20A345668N935984H",
  //                 "rel": "up",
  //                 "method": "GET",
  //                 "title": "GET"
  //               }
  //             ]
  //           }
  //         ]
  //       }
  //     }
  //   ],
  //   "links": [
  //     {
  //       "href": "https://api.sandbox.paypal.com/v2/checkout/orders/20A345668N935984H",
  //       "rel": "self",
  //       "method": "GET",
  //       "title": "GET"
  //     }
  //   ]
  // }
  dateOfPayment: new Date().toISOString() 

  // const [aname, setAname] = useState('');
  // const [artists, setArtists] = useState([]);

  // const trial = () => {     
  //     setArtists([ ...artists,{ id: arrayId+=1, aname: aname }])
  //     setAname('')
  // }

  // <input value={aname} onChange={ e => setAname(e.target.value)}/>
  //           <button onClick={trial}>Add</button>
  //           <ul>
  //               {artists.map( (artist, index) => (
  //               <li key={index}>{artist.aname}</li>
  //               ))}
  //           </ul>
