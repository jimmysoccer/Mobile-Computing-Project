import { useState,useEffect } from "react";
import '../index.css';
import {reactLocalStorage} from 'reactjs-localstorage';

const Home = () => {
    const [statusTitle,setStatusTitle]=useState('waitting for command')

    useEffect(()=>{
        reactLocalStorage.set('app',JSON.stringify([]))
        console.log('initiate',JSON.parse(reactLocalStorage.get('app')))
    },[])

    function connect(){
        setTimeout(() => {
            document.getElementById('statusBar').style.setProperty('color','#2ECC71 ')
            setStatusTitle('connected')
        }, 2000);
        setStatusTitle('connecting...')
        document.getElementById('statusBar').style.setProperty('color','#F4D03F ')
        
        var xhttp = new XMLHttpRequest();
        xhttp.open("GET", "http://100.64.11.225:8080/getStatus");
        xhttp.setRequestHeader('Content-type', 'application/json; charset=utf-8');
        xhttp.send();
        console.log(xhttp)
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
        let data = [{
            id: 1,
            name: 'thing 1'
        },{
            id:2,
            name: 'thing 2'
        }]
        reactLocalStorage.set('thingId',JSON.stringify(data))
    }

    

  return (
      <>
        <h1>Home</h1>
        <div className="commandMenu">
            <view onClick={()=>{connect()}}>Connect</view>
        </div>
        <div id='statusBar' className="statusBar">
            {statusTitle}
        </div>
      </>
    );
};

export default Home;