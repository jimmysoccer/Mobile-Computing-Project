import { useState,useEffect } from "react";
import '../index.css';

function Example() {
    /*
    var xhttp = new XMLHttpRequest();
    xhttp.open("PUT", "http://100.64.11.225:8080/bpm/");
    xhttp.setRequestHeader('Content-type', 'application/json; charset=utf-8');
    xhttp.send(1);
    console.log(xhttp)
    const [calculation,setCalculation]=useState(1);
    */
  }

const Home = () => {
    const [statusTitle,setStatusTitle]=useState('waitting for command')

    function connect(){

        setStatusTitle('connected')
        document.getElementById('statusBar').style.setProperty('color','#2ECC71 ')
    }
    function disconnect(){
        setStatusTitle('disconnected')
        document.getElementById('statusBar').style.setProperty('color','red')
    }
    function pauseConnection(){
        setStatusTitle('connection is paused')
        document.getElementById('statusBar').style.setProperty('color','#F4D03F')
    }
    function resumeConnection(){
        setStatusTitle('connection is resumed')
        document.getElementById('statusBar').style.setProperty('color','#2ECC71 ')
    }

  return (
      <>
        <h1>Home</h1>
        <div className="commandMenu">
            <view onClick={()=>{connect()}}>Connect</view>
            <view onClick={()=>{disconnect()}}>Disconnect</view>
            <view onClick={()=>{pauseConnection()}}>Pause connection</view>
            <view onClick={()=>{resumeConnection()}}>Resume connection</view>
        </div>
        <div id='statusBar' className="statusBar">
            {statusTitle}
        </div>
      </>);
};

export default Home;