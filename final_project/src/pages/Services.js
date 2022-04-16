const Services = () => {
    function getService(){

    }
    function FIlter(){
        return(
            <div className="itemCard">
                <view>Space ID</view>
                <view>Thing ID</view>
                <view>Name</view>
                <view>Input 1</view>
                <view>Input 2</view>
                <view>Output</view>
            </div>
        )
    }
    function ServiceCard(){
        return(
            <div className="itemCard">
                <view style={{'width':'calc(100% / 6)'}}>{1}</view>
                <view style={{'width':'calc(100% / 6)'}}>{123}</view>
                <view style={{'width':'calc(100% / 6)'}}>LED</view>
                <view style={{'width':'calc(100% / 6)'}}>void</view>
                <view style={{'width':'calc(100% / 6)'}}>void</view>
                <view style={{'width':'calc(100% / 6)'}}>LED_Status-Test</view>
            </div>
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