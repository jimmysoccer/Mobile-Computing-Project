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
        'led blink'
    ]

    const [reverseServiceName,setReverse] = useState([])


    function getServiceName(){
        var xhttp = new XMLHttpRequest();
        xhttp.open("GET", "http://192.168.0.28:8080/getServiceName");
        xhttp.setRequestHeader('Content-type', 'application/json; charset=utf-8');
        xhttp.send();
        console.log('get service name',xhttp)
        //setServiceName(xhttp.response)
    }

    useEffect(() => {
        reactLocalStorage.set('serviceName',JSON.stringify(serviceName))
        getServiceName()
        let temp = []
        for(let i=serviceName.length-1;i>=0;i--){
            temp.push(serviceName[i])
        }
        setReverse(temp)
        console.log('reverse',reverseServiceName,serviceName)
    }, [])

    const [ascendingOrder,setAscendingOrder]=useState(true)
    
    function filterByThingId(){
        if(ascendingOrder){
            setAscendingOrder(false)
        }else{
            setAscendingOrder(true)
        }
        console.log('ascend order',ascendingOrder)
    }

    function FIlter(){
        return(
            <div className="itemCard">
                <view style={{'width':'calc(100% / 6)'}}>Space ID</view>
                <view style={{'width':'calc(100% / 6)', 'cursor':'pointer'}} onClick={()=>{
                    filterByThingId()
                }}>Thing ID</view>
                <view style={{'width':'calc(100% / 3)', 'cursor':'pointer'}} onClick={()=>{

                }}>Name</view>
                <view style={{'width':'calc(100% / 6)'}}>Input 1</view>
                <view style={{'width':'calc(100% / 6)'}}>Input 2</view>
                <view style={{'width':'calc(100% / 6)'}}>Output</view>
            </div>
        )
    }
    function ServiceCard(){
        return(
            <>
            {
                ascendingOrder?
                serviceName.map((item,index)=>{
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
                }):
                reverseServiceName.map((item,index)=>{
                    let output = 'N/A'
                    if(index==0||index==1||index==2){
                        output = 'string'
                    }
                    return(
                        <div className="itemCard">
                            <view style={{'width':'calc(100% / 6)'}}>{1}</view>
                            <view style={{'width':'calc(100% / 6)'}}>{reverseServiceName.length-index}</view>
                            <view style={{'width':'calc(100% / 3)'}}>{item}</view>
                            <view style={{'width':'calc(100% / 6)'}}>void</view>
                            <view style={{'width':'calc(100% / 6)'}}>void</view>
                            <view style={{'width':'calc(100% / 6)'}}>{output}</view>
                        </div>
                    )
                })
            }
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