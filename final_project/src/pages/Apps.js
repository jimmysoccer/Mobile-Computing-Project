import { useState,useEffect } from "react";
import { reactLocalStorage } from "reactjs-localstorage";

const Apps = () => {

  const [appList,setAppList]=useState(JSON.parse(reactLocalStorage.get('app')))

  function FIlter(){
    return(
        <div className="itemCard" style={{'width':'90%'}}>
            <view style={{'width':'5%'}}>ID</view>
            <view style={{'width':'20%'}}>Name</view>
            <view style={{'width':'30%'}}>Service 1</view>
            <view style={{'width':'15%'}}>Relation</view>
            <view style={{'width':'30%'}}>Service 2</view>
            <view style={{'width':'30%'}}>Status</view>
            <view style={{'width':'30%'}}>Activate</view>
            <view style={{'width':'30%'}}>Stop</view>
            <view style={{'width':'30%'}}>Delete</view>
        </div>
    )
}

function activateApp(index){
  let data = JSON.parse(reactLocalStorage.get('app'))
  data[index].status = 'Activated'
  reactLocalStorage.set('app',JSON.stringify(data))
  setAppList(JSON.parse(reactLocalStorage.get('app')))
  //document.getElementById('status'+index).style.setProperty('color','#2ECC71')
  var xhttp = new XMLHttpRequest();
  xhttp.open("POST", "http://192.168.0.28:8080/activate");
  xhttp.setRequestHeader('Content-type', 'application/json; charset=utf-8');
  console.log('',appList)
  xhttp.send(appList.relationship+' '+appList.serviceA+' '+appList.serviceB);
  console.log(xhttp)
}

function stopApp(index){
  let data = JSON.parse(reactLocalStorage.get('app'))
  data[index].status = 'Stopped'
  reactLocalStorage.set('app',JSON.stringify(data))
  setAppList(JSON.parse(reactLocalStorage.get('app')))
  //document.getElementById('status'+index).style.setProperty('color','red')
  var xhttp = new XMLHttpRequest();
  xhttp.open("PUT", "http://192.168.0.29:8080/stop");
  xhttp.setRequestHeader('Content-type', 'application/json; charset=utf-8');
  xhttp.send();
  console.log(xhttp)
}

function deleteApp(index){
  let data = JSON.parse(reactLocalStorage.get('app'))
  data.splice(index,1)
  reactLocalStorage.set('app',JSON.stringify(data))
  setAppList(JSON.parse(reactLocalStorage.get('app')))
  //document.getElementById('status'+index).style.setProperty('color','black')
  var xhttp = new XMLHttpRequest();
  xhttp.open("DELETE", "http://192.168.0.28:8080/delAPP");
  xhttp.setRequestHeader('Content-type', 'application/json; charset=utf-8');
  xhttp.send(appList.appName);
  console.log(xhttp)
}

function save(){
  var xhttp = new XMLHttpRequest();
  xhttp.open("POST", "http://192.168.0.28:8080/saveAPP");
  xhttp.setRequestHeader('Content-type', 'application/json; charset=utf-8');
  xhttp.send(appList.appName,appList.relationship+' '+appList.serviceA+' '+appList.serviceB);
  console.log(xhttp)
}

function upload(){
  var xhttp = new XMLHttpRequest();
  xhttp.open("POST", "http://192.168.0.28:8080/uploadAPP");
  xhttp.setRequestHeader('Content-type', 'application/json; charset=utf-8');
  xhttp.send(appList.appName);
  console.log(xhttp)
}

function scan(){
  var xhttp = new XMLHttpRequest();
  xhttp.open("GET", "http://192.168.0.28:8080/scan");
  xhttp.setRequestHeader('Content-type', 'application/json; charset=utf-8');
  xhttp.send();
  console.log(xhttp)
}

useEffect(()=>{
  console.log('app repeat')
  for(let i=0;i<appList.length;i++){
    if(appList[i].status=='Activated'){
      document.getElementById('status'+i).style.setProperty('color','#2ECC71')
    }else if(appList[i].status=='Stopped'){
      document.getElementById('status'+i).style.setProperty('color','red')
    }else{
      document.getElementById('status'+i).style.setProperty('color','black')
    }
  }
})

    return (
      <>
        <h1>Apps</h1>
        <FIlter></FIlter>
        {appList.map((item,index)=>{
          return(
            <>
            <div className="itemCard" style={{'width':'90%'}}>
              <view style={{'width':'5%'}}>{index+1}</view>
              <view style={{'width':'20%'}}>{item.appName}</view>
              <view style={{'width':'30%'}}>{item.serviceA}</view>
              <view style={{'width':'15%'}}>{item.relationship}</view>
              <view style={{'width':'30%'}}>{item.serviceB}</view>
              <view id={"status"+index} style={{'width':'30%'}}>
                {item.status}
              </view>
              <view style={{'width':'30%'}}>
                <button style={{'width':'50%','margin':'auto'}} onClick={()=>{
                  activateApp(index)
                }}>Activate</button>
              </view>
              <view style={{'width':'30%'}}>
                <button style={{'width':'50%','margin':'auto'}} onClick={()=>{
                  stopApp(index)
                }}>Stop</button>
              </view>
              <view style={{'width':'30%'}}>
                <button style={{'width':'50%','margin':'auto'}} onClick={()=>{
                  deleteApp(index)
                }}>Delete</button>
              </view>
          </div>
            </>
          )
        })}
        <h1>App Manager</h1>
        <div className="selectCard" style={{'marginTop':'5px'}}>
          <button style={{'width':'50%','margin':'auto'}} onClick={()=>{
            save()
          }}>Save</button>
          <button style={{'width':'50%','margin':'auto'}} onClick={()=>{
            upload()
          }}>Upload</button>
          <input></input>
        </div>
        <div className="selectCard" style={{'marginTop':'5px'}}>
          <button style={{'width':'50%','margin':'auto'}} onClick={()=>{
            scan()
          }}>Scan</button>
        </div>
      </>
    );
  };
  
  export default Apps;