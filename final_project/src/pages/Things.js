import '../index.css'
import { useState,useEffect } from "react";

const Things = () => {

    function getThingId(){
        var xhttp = new XMLHttpRequest();
        xhttp.open("GET", "http://192.168.0.28:8080/getThingID");
        xhttp.setRequestHeader('Content-type', 'application/json; charset=utf-8');
        xhttp.send();
        console.log(xhttp)
    }

    function getIpAddress(){
        var xhttp = new XMLHttpRequest();
        xhttp.open("GET", "http://192.168.0.28:8080/getIPAddr");
        xhttp.setRequestHeader('Content-type', 'application/json; charset=utf-8');
        xhttp.send();
        console.log(xhttp)
    }

    useEffect(() => {
        console.log('things tab')
      getThingId()
      getIpAddress()
    }, [])
    

    function RpiFilter(){
        return(
            <>
                <view>Space ID</view>
                <view>Thing ID</view>
                <view>IP address</view>
                <view>Port</view>
            </>
        )
    }
    function RpiCard(){
        return(
            <>
                <div className="itemCard">
                    <view>1</view>
                    <view>1</view>
                    <view>100.64.15.41</view>
                    <view>8080</view>
                </div>
            </>
        )
    }

    return (
        <>
            <h1>Things</h1>
            <h2>RPi</h2>
            <div className="itemCard">
                <RpiFilter></RpiFilter>
            </div>
            <RpiCard></RpiCard>
        </>
    );
  };
  
  export default Things;