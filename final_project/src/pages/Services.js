import { useState,useEffect } from "react";
import { reactLocalStorage } from "reactjs-localstorage";

const Services = () => {
    // led on

    //led off
    //led blink
    //check temperature
    //check humidity
    //button check

    const serviceName = [
        'led on',
        'led off',
        'led blink',
        'check temperature',
        'check humidity',
        'button check'
    ]

    useEffect(() => {
        reactLocalStorage.set('serviceName',JSON.stringify(serviceName))
    }, [])
    


    function FIlter(){
        return(
            <div className="itemCard">
                <view style={{'width':'calc(100% / 6)'}}>Space ID</view>
                <view style={{'width':'calc(100% / 6)'}}>Thing ID</view>
                <view style={{'width':'calc(100% / 3)'}}>Name</view>
                <view style={{'width':'calc(100% / 6)'}}>Input 1</view>
                <view style={{'width':'calc(100% / 6)'}}>Input 2</view>
                <view style={{'width':'calc(100% / 6)'}}>Output</view>
            </div>
        )
    }
    function ServiceCard(){
        return(
            <>
                {serviceName.map((item,index)=>{
                    let output = 'string'
                    if(index==0||index==1||index==2){
                        output = 'N/A'
                    }
                    return(
                        <div className="itemCard">
                            <view style={{'width':'calc(100% / 6)'}}>{1}</view>
                            <view style={{'width':'calc(100% / 6)'}}>{index+1}</view>
                            <view style={{'width':'calc(100% / 3)'}}>{item}</view>
                            <view style={{'width':'calc(100% / 6)'}}>void</view>
                            <view style={{'width':'calc(100% / 6)'}}>void</view>
                            <view style={{'width':'calc(100% / 6)'}}>{output}</view>
                        </div>
                    )
                })}
            </>
        )
    }

    return (
        <>
            <h1>Services</h1>
            <FIlter></FIlter>
            <ServiceCard></ServiceCard>
        </>
    );
};
  
export default Services;