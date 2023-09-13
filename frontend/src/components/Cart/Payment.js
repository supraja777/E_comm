import React, {Fragment, useEffect, useRef, useState} from 'react'
import CheckoutSteps from './CheckoutSteps'
import MetaData from '../layout/MetaData'
import { Typography } from '@material-ui/core'
import { useAlert } from 'react-alert'
import { useNavigate } from 'react-router-dom'
import { UseSelector, useDispatch, useSelector } from 'react-redux'
import {createOrder,clearErrors} from "../../actions/orderAction"
import "./Payment.css"
import CreditCardIcon from "@material-ui/icons/CreditCard"
import EventIcon from "@material-ui/icons/Event"
import VpnKeyIcon from "@material-ui/icons/VpnKey"



const Payment = () => {

    const orderInfo = JSON.parse(sessionStorage.getItem("orderInfo"))

    const dispatch = useDispatch();
    const navigate = useNavigate()
    const alert = useAlert();
    // const stripe = useStripe();
    // const elements = useElements();
    const payBtn = useRef(null)
    

    const [cardNumber, setCardNumber] = useState("")
    const [expiryDate, setExpiryDate] = useState("")
    const [cvcNumber, setCvcNumber] = useState("")



    const {shippingInfo, cartItems} = useSelector((state) => state.cart);
    const { user } = useSelector((state) => state.user);
    const { error } = useSelector((state) => state.newOrder);

    const order = {
        shippingInfo,
        orderItems: cartItems,
        itemsPrice: orderInfo.subtotal,
        taxprice: orderInfo.tax,
        shippingPrice: orderInfo.shippingCharges,
        totalPrice: orderInfo.totalPrice
    }

    const submitHandler = async(e) => {
        
        e.preventDefault();
        console.log("Submitting?")
        payBtn.current.disabled = true;
        
        console.log("Submitting?")
        dispatch(createOrder(order))

        navigate("/success")
    }

    useEffect (() => {
        if (error) {
            alert.error(error);
            dispatch(clearErrors())
        }
    }, [dispatch, error, alert])

  return (
    <Fragment>
        <MetaData title="Payment" />
        <CheckoutSteps activeStep={2}/>
        <div className='paymentContainer'>
            <form className='paymentForm' onSubmit={ (e) => submitHandler(e)}>
                <Typography>Card Info</Typography>
                <div>
                    <CreditCardIcon/>
                    <input
                    type="Number"
                    className='paymentInput'
                    placeholder='Enter Card Number'
                    required
                    value={cardNumber}
                    onChange={(e)=> setCardNumber(e.target.value)} 
                    />
                </div>
                <div>
                    <EventIcon/>
                    <input
                    type="Number"
                    className='paymentInput'
                    placeholder='Enter expiry date'
                    required
                    value={expiryDate}
                    onChange={(e)=> setExpiryDate(e.target.value)} 
                    />
                </div>
                <div>
                    <VpnKeyIcon/>
                    <input
                    type="text"
                    className='paymentInput'
                    placeholder='Enter CVC Number'
                    required
                    value={cvcNumber}
                    onChange={(e)=> setCvcNumber(e.target.value)} 
                    />
                </div>
                <input
                type='submit'
                value={`Pay - ₹${orderInfo && orderInfo.totalPrice}`}
                ref = {payBtn}
                className='paymentFormBtn'
                />

            </form>
        </div>
    </Fragment>
  )
}

export default Payment
