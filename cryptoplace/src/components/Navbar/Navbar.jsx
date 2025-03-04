import React, { useContext } from 'react'
import './Navbar.css'
import logo from '../../assets/logo1.png'
import arrow_icon from '../../assets/arrow_icon.png'
import { CoinContext } from '../../context/Coincontext'

function Navbar() {
  const{setCurrency} = useContext(CoinContext)

  const currencyHandler = (event)=>{
    switch (event.target.value){
      case"usd":{
        setCurrency({name: "usd",Symbol:"$"})
        break;
      }
      case"eur":{
        setCurrency({name: "eur",Symbol:"€"})
        break;
      }
      case"inr":{
        setCurrency({name: "inr",Symbol:"₹"})
        break;
      }
      default :{
        setCurrency({name: "usd", Symbol:"$"})
        break;
      }
    }
  }
  return (
    <div className='navbar'>
        <img src={logo} alt="" className='logo'/>
        <ul>
            <li>Home</li>
            <li>features</li>
            <li>pricing</li>
            <li>Blog</li>
        </ul>
        <div className='nav-right'>
            <select onChange={currencyHandler}>
                <option value="usd">USD</option>
                <option value="uro">eur</option>
                <option value="inr">INR</option>
            </select>
            <button className='btn'>Sign Up<img src={arrow_icon} alt='' className='arrow'/></button>
        </div>
    </div>
  )
}

export default Navbar