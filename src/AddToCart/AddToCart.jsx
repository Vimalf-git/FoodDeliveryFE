
import React, { useContext, useEffect, useState } from 'react'
import { cardConData } from '../Context/CardContext'
import './AddToCart.css'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { Button, TextField } from '@mui/material';
import StripeCheckout from 'react-stripe-checkout';
import axios from 'axios';
import ApiService from '../Common/ApiService';
const AddToCart = () => {
    const { addToCartData,deleteAddCart ,getCartData} = useContext(cardConData);

    let totalAmount = 0;
    let deliveryAmount = 0;
    if (addToCartData.length > 0) {
        totalAmount = addToCartData.reduce((acc, cur) => {
            return parseInt(acc) + parseInt(cur.price)
        }, 0);
        deliveryAmount=5;
        console.log(totalAmount);

    }
    const [Product,setProduct]=useState([])
    const getProducts=()=>{
     if(addToCartData.length>0){
        let pro=addToCartData.map((e)=>e.foodName);
        setProduct(pro);
     }
        
    }
    const payment=async(token)=>{
        console.log("payment module");
        const body={
            token,
            addToCartData,
            totalbillAmt:totalAmount + deliveryAmount
        }
        try {
            let res= await ApiService.post('/paymenttoken',body);
            getCartData()
        } catch (error) {
            
        }
    }
    // let option={
    //     key:"",
    //     key_secret:"",
    //     amount:(totalAmount+deliveryAmount)*100,
    //     currency:"INR",
    //     name:"Food_Order",
    //     description:'your order dispatched sortly',
    //     handler:function(response){
    //         alert(response.razorpay_payment_id);
    //     },
    //     prefill:{
    //         name:"vimalraj",
    //         email:"selvamvimaldz1@gmail.com",
    //         contact:'9876543213'
    //     },
    //     notes:{
    //         address:'genight pvt'
    //     },theme:{
    //         color:"#3399cc"
    //     }
    // }
    // let pay=new window.Razorpay(option)
    // pay.open()

    console.log(addToCartData);
    useEffect(()=>{
        getCartData();
        getProducts();
    },[])
    return (
        <div className='addtocart'>
            <h2 className='heading'>CART</h2>
            <div className='addtocartsec-2'>

                <div className='addTocartSec'>
                    {addToCartData.length > 0 ? addToCartData.map((e,i) => {
                        return <div className='addcarrtbox'>
                            <div className='addcarrtbox-l'  >
                                <img className='cartImg' src={e.imageUrl} />
                                <h2>{e.foodName.toUpperCase()}</h2>
                            </div>
                            <div className='addcarrtbox-r'>
                                <p> RS {e.price}</p>
                                <div className='deleteCon' onClick={()=>deleteAddCart(e,i)}>
                                    <DeleteForeverIcon />
                                </div>
                            </div>
                        </div>
                    }
                    ) : <></>}
                    <div className='aountTotCon'>
                        <p className='amountsec'><span className='amountname'>SubTotal:</span><span className='amountCon'>RS-{totalAmount} </span></p>
                        <p className='amountsec'><span className='amountname'>Delivery:</span><span className='amountCon'>RS-{deliveryAmount} </span></p>
                        <p className='amountsec'><span className='amountname'>Total:   </span><span className='amountCon'>RS-{totalAmount + deliveryAmount}</span> </p>

                    </div>

                </div>

                <div className='checkoutCon'>
                    <TextField sx={{ m: 1, width: '30ch' }}
                        required id="outlined-basic" label="Phone"
                    />
                    <TextField sx={{ m: 1, width: '30ch' }}
                        required id="outlined-basic" label="Street address"
                    />
                    <TextField sx={{ m: 1, width: '30ch' }}
                        required id="outlined-basic" label="Postal Code"
                    />
                    <TextField sx={{ m: 1, width: '30ch' }}
                        required id="outlined-basic" label="City"
                    />
                    <StripeCheckout name='Food Order' amount={(totalAmount + deliveryAmount)*100} 
                    currency='INR' 
                    stripeKey='pk_test_51OfEMqSBn9kdrzehhvPlLeBfHyewvsPUpSvmb1vAqZ7mibwAICWy9Nrdt7VsPpW18XRPfSUlVN8uesxR72irseV400JHngeVM3'
                   token={payment}
                   >
                    <Button className='paybtn'disabled={totalAmount>0?false:true} >Pay Rs {totalAmount + deliveryAmount}</Button>
                    </StripeCheckout>
                </div>

            </div>

        </div>

    )
}

export default AddToCart