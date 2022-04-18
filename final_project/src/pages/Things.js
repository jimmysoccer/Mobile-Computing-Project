import { useEffect } from "react/cjs/react.production.min";
import '../index.css'

const Things = () => {

    function getPi(){

    }
    /*
    useEffect(()=>{
        getPi()
    },[])
    */

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