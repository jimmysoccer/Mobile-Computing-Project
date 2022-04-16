import { useState,useEffect } from "react";
import '../index.css'

const Recipes = () => {
    const [serviceNum,setServiceNum]=useState(1)
    const [serviceA,setServiceA]=useState('SA')
    const [serviceB,setServiceB]=useState('SB')
    const [relationship,setRelationship]=useState('')
    const [input1,setInput1]=useState('input1')
    const [input2,setInput2]=useState('')
    const [output,setOutput]=useState('')

    function getService(){

    }

    function ChooseRelationship(){
        return(
            <div className="selectCard">
                <view>which relationship you would like to choose</view>
                <select id="serviceRelationship" onChange={()=>{
                    let x = document.getElementById('serviceRelationship').value
                    setRelationship(x)
                }}>
                    <option value={'control'}>Control</option>
                    <option value={'drive'}>Drive</option>
                    <option value={'subsume'}>Subsume</option>
                    <option value={'compete'}>Compete</option>
                </select>
            </div>
        )
    }

    function ChooseOutput(){

    }


    return (
        <>
            <h1>Recipes</h1>
            <div className="selectCard">
                <view>how many services you choose</view>
                <select id="serviceNum" onChange={()=>{
                    let x = document.getElementById('serviceNum').value
                    setServiceNum(x)
                }}>
                    <option value={1}>1</option>
                    <option value={2}>2</option>
                </select>
            </div>

            <div className={serviceNum==1?"selectCard":'disappear'}>
                <view>which service you would like to choose</view>
                <select id="serviceIndex11" onChange={()=>{
                    let x = document.getElementById('serviceIndex11').value
                    setServiceA(x)
                }}>
                    <option value={'service1'}>service1</option>
                    <option value={'service2'}>service2</option>
                </select>
            </div>

            <div className={serviceNum==2?"selectCard":'disappear'}>
                    <view>which service you would like to choose as service A</view>
                    <select id="serviceIndex21" onChange={()=>{
                        let x = document.getElementById('serviceIndex21').value
                        setServiceA(x)
                    }}>
                        <option value={'service1'}>service1</option>
                        <option value={'service2'}>service2</option>
                    </select>
                </div>
                <div className={serviceNum==2?"selectCard":'disappear'}>
                    <view>which service you would like to choose as service B</view>
                    <select id="serviceIndex22" onChange={()=>{
                        let x = document.getElementById('serviceIndex22').value
                        setServiceB(x)
                    }}>
                        <option value={'service1'}>service1</option>
                        <option value={'service2'}>service2</option>
                    </select>
                </div>

            {
                serviceNum==2?
                <ChooseRelationship></ChooseRelationship>
                :
                ''
            }

            <div className="selectCard">
                <view>Type your input1</view>
                <input type='text' onChange={(e)=>{
                    console.log('input1',e.target.value)
                    setInput1(e.target.value)
                }} ></input>
            </div>

            <div className="selectCard">
                <view>Type your input2</view>
                <input type='text' onChange={(e)=>{
                    console.log('input2',e.target.value)
                    setInput2(e.target.value)
                }} ></input>
            </div>
        </>
    );
};
  
  export default Recipes;