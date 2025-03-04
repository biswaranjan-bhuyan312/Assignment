import React, { useContext, useEffect, useState } from 'react'
import './Home.css'
import { CoinContext } from '../../context/Coincontext';

function Home() {

    const {allcoin, currency} = useContext(CoinContext);
    const [ displayCoin, setDisplayCoin] = useState([]);
    const [input, setInput] = useState('');

    const inputHandler = (event)=>{
        setInput(event.target.value);
    }

    useEffect(()=>{
        setDisplayCoin(allcoin);
    },[allcoin])
  return (
    <div className='home'>
        <div className='hero'>
            <h1>Largest <br/>Crypto Market Place</h1>
            <p>Welcome to the world's Largest cryptocurrency market place. Sign Up to explore more About Cryptos</p>
            <form>
                <input onChange={inputHandler} value={input} type="text" placeholder='search fro crypto...' required/>
                <button type='submit'>search</button>
            </form>
        </div>
        <div className='crypto-table'>
            <div className='table-layout'>
                <p>#</p>
                <p>Coin</p>
                <p>Price</p>
                <p style={{textAlign: "center"}}>24h change</p>
                <p className='market-cap'>Market Cap</p>
            </div>
            {
                displayCoin.slice(0,10).map((item,index)=>(
                    <div className="table-layout" key={index}>
                        <p>{item.market_cap_rank}</p>
                        <div>
                            <img src={item.image} alt=""/>
                            <p>{item.name + "-" + item.Symbol}</p>
                        </div>
                        <p>{currency.Symbol} {item.current_price.toLocaleString()}</p>
                        <p className={item.price_change_percentage_24h>0?"green":"red"}>
                            {Math.floor(item.price_change_percentage_24h*100)/100}
                        </p>
                        <p className='market-cap'>{currency.Symbol}{item.market_cap.toLocaleString()}</p>
                    </div>
                ))
            }
        </div>
    </div>
  )
}

export default Home;