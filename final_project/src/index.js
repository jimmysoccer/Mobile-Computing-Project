import React, { useState } from "react";
import ReactDOM from 'react-dom';
import Home from "../src/pages/Home";
import Things from '../src/pages/Things'
import Services from '../src/pages/Services'
import Relationships from '../src/pages/Relationships'
import Apps from '../src/pages/Apps'
import Recipes from "./pages/Recipe";
import './index.css'

const HOME_PAGE = 0
const THINGS_PAGE = 1
const SERVICES = 2
const RELATIONSHIPS = 3
const APPS = 4 
const RECIPE = 5

export default function App() {
    const [currentTab,setCurrentTab]=useState(0)

    function Tab(){
        if(currentTab===HOME_PAGE){
            return <Home></Home>
        }else if(currentTab===THINGS_PAGE){
            return <Things></Things>
        }else if(currentTab===SERVICES){
            return <Services></Services>
        }else if(currentTab===RELATIONSHIPS){
            return <Relationships></Relationships>
        }else if(currentTab===APPS){
            return <Apps></Apps>
        }else if(currentTab === RECIPE){
            return <Recipes></Recipes>
        }
        else{
            return <Home></Home>
        }
    }
return (
    <>
    <view className="tabBar">
        <view className={currentTab===HOME_PAGE?"clicked":''} onClick={()=>{setCurrentTab(HOME_PAGE)}}>Home</view>
        <view className={currentTab===THINGS_PAGE?"clicked":''} onClick={()=>{setCurrentTab(THINGS_PAGE)}} >Things</view>
        <view className={currentTab===SERVICES?"clicked":''} onClick={()=>{setCurrentTab(SERVICES)}}>Services</view>
        <view className={currentTab===RELATIONSHIPS?"clicked":''} onClick={()=>{setCurrentTab(RELATIONSHIPS)}}>Relationships</view>
        <view className={currentTab===RECIPE?"clicked":''} onClick={()=>{setCurrentTab(RECIPE)}}>Recipes</view>
        <view className={currentTab===APPS?"clicked":''} onClick={()=>{setCurrentTab(APPS)}}>Apps</view>
    </view>
    <Tab></Tab>
    </>
);
}
  
  ReactDOM.render(<App />, document.getElementById("root"));