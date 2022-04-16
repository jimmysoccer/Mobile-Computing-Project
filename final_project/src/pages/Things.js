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
            <div className="itemCard">
                <view>{1}</view>
                <view>{123}</view>
                <view>{192.168}</view>
                <view>{8080}</view>
            </div>
        )
    }
    
    function EntityFIlter(){
        return(
            <div className="itemCard">
                <view>Space ID</view>
                <view>Thing ID</view>
                <view>Entity ID</view>
                <view>Name</view>
                <view>Description</view>
            </div>
        )
    }
    function EntityCard(){
        return(
            <div className="itemCard">
                <view>{1}</view>
                <view>{123}</view>
                <view>{12}</view>
                <view>LED</view>
                <view>it's a red LED</view>
            </div>
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
            <RpiCard></RpiCard>
            <h2>Entity</h2>
            <EntityFIlter></EntityFIlter>
            <EntityCard></EntityCard>
            <EntityCard></EntityCard>
        </>
    );
  };
  
  export default Things;