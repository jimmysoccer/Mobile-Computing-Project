const Relationships = () => {
    function Filter(){
        return(
            <div className="itemCard">
                <view style={{'width':'50%'}}>Name</view>
                <view style={{'width':'50%'}}>Description</view>
            </div>
        )
    }
    function RelationshipCard(){
        return(
            <>
                <div className="itemCard">
                    <view style={{'width':'50%'}}>Control</view>
                    <view style={{'width':'50%'}}>If A then B</view>
                </div>
                <div className="itemCard">
                    <view style={{'width':'50%'}}>Drive</view>
                    <view style={{'width':'50%'}}>Use A todo B</view>
                </div>
                <div className="itemCard">
                    <view style={{'width':'50%'}}>Contest</view>
                    <view style={{'width':'50%'}}>A or B</view>
                </div>
                <div className="itemCard">
                    <view style={{'width':'50%'}}>Subsume</view>
                    <view style={{'width':'50%'}}>A includes B</view>
                </div>
            </>
        )
    }
    return (
        <>
            <h1>Relationships</h1>
            <Filter></Filter>
            <RelationshipCard ></RelationshipCard>
        </>
    );
  };
  
  export default Relationships;