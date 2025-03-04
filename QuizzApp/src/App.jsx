import React from "react"
import Quizz from "./components/Quizz/Quizz"
import Home from "./components/LandingPage/Home"

function App() {
  console.log("Home is rendering");

  return (
    <>
      <div>
        {/* <Quizz/> */}
        <Home/>
      </div>
    </>
  )
}

export default App
