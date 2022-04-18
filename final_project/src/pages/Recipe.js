import { useState,useEffect } from "react";
import { reactLocalStorage } from "reactjs-localstorage";
import '../index.css'

const Recipes = () => {

    const [serviceA,setServiceA]=useState(JSON.parse(reactLocalStorage.get('serviceName'))[0])
    const [serviceB,setServiceB]=useState(JSON.parse(reactLocalStorage.get('serviceName'))[0])
    const [relationship,setRelationship]=useState('Control')
    const [serviceNumIndex,setServiceNumIndex]=useState(0)
    const serviceNum = [1,2]

    /*
        thing identity, service, thing language, relationship, entity identity.
    */
    function sendService(){
        let thingId=JSON.stringify('1')
        let service = JSON.stringify('service test') 
        let language = JSON.stringify('C++')
        let relationship = JSON.stringify('Control')
        let entityId = JSON.stringify('1')
        
        var xhttp = new XMLHttpRequest();
        xhttp.open("PUT", "http://192.168.0.28:8080/initialTweet");
        xhttp.setRequestHeader('Content-type', 'application/json; charset=utf-8');
        xhttp.send(thingId,service,language,relationship,entityId);
        console.log(xhttp)
    }

    return (
        <>
            <h1>Recipes</h1>
            <div className="selectCard">
                <view>how many services you choose</view>
                <select id="serviceNum" onChange={()=>{
                    let x = document.getElementById('serviceNum').value - 1
                    setServiceNumIndex(x)
                }}>
                    {
                        serviceNum.map((item,index)=>{
                            return(
                                <option value={item}>{item}</option>
                            )
                        })
                    }
                </select>
            </div>

            <div className={serviceNumIndex==0?"selectCard":'disappear'}>
                <view>which service you would like to choose</view>
                <select id="serviceIndex11" onChange={()=>{
                    let x = document.getElementById('serviceIndex11').value
                    setServiceA(x)
                }}>
                    {JSON.parse(reactLocalStorage.get('serviceName')).map((item,index)=>{
                        return(
                            <option value={item}>{item}</option>
                        )
                    })}
                </select>
            </div>

            <div className={serviceNumIndex==1?"selectCard":'disappear'}>
                <view>which service you would like to choose as service A</view>
                <select id="serviceIndex21" onChange={()=>{
                    let x = document.getElementById('serviceIndex21').value
                    setServiceA(x)
                }}>
                    {JSON.parse(reactLocalStorage.get('serviceName')).map((item,index)=>{
                        return(
                            <option value={item}>{item}</option>
                        )
                    })}
                </select>
            </div>
            <div className={serviceNumIndex==1?"selectCard":'disappear'}>
                <view>which service you would like to choose as service B</view>
                <select id="serviceIndex22" onChange={()=>{
                    let x = document.getElementById('serviceIndex22').value
                    setServiceB(x)
                }}>
                    {JSON.parse(reactLocalStorage.get('serviceName')).map((item,index)=>{
                        return(
                            <option value={item}>{item}</option>
                        )
                    })}
                </select>
            </div>

            {
                serviceNumIndex==1?
                <div className="selectCard">
                <view>which relationship you would like to choose</view>
                <select id="serviceRelationship" onChange={()=>{
                    let x = document.getElementById('serviceRelationship').value
                    setRelationship(x)
                }}>
                    <option value={'control'}>Control</option>
                    <option value={'drive'}>Drive</option>
                    <option value={'support'}>Support</option>
                    <option value={'extent'}>Extent</option>
                </select>
            </div>
                :
                ''
            }
            <div className="selectCard">
            <button style={{'width':'50%','margin':'auto'}} onClick={()=>{
                let list = JSON.parse(reactLocalStorage.get('app'))
                let data = {}
                if(serviceNumIndex==0){
                    data ={
                        serviceA: serviceA,
                        serviceB: 'N/A',
                        relationship: 'N/A',
                        status: 'Not Activated'
                    }
                }else{
                    data={
                        serviceA: serviceA,
                        serviceB: serviceB,
                        relationship: relationship,
                        status: 'Not Activated'
                    }
                }
                list.push(data)
                reactLocalStorage.set('app',JSON.stringify(list))
                console.log('recipe',list)
                sendService()
            }} >Finalize</button>
            <button style={{'width':'50%','margin':'auto'}} onClick={()=>{
                document.getElementById('serviceNum').value = 0
                document.getElementById('serviceIndex11').value = 0
                document.getElementById('serviceIndex21').value = 0
                document.getElementById('serviceIndex22').value = 0
                document.getElementById('serviceRelationship').value = ''

                setServiceNumIndex(0)
                setServiceA(JSON.parse(reactLocalStorage.get('serviceName'))[0])
                setServiceB(JSON.parse(reactLocalStorage.get('serviceName'))[0])
                setRelationship('Control')
            }} >
                clear
            </button>
            </div>
        </>
    );
};
  
  export default Recipes;