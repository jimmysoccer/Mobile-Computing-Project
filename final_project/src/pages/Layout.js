import { Outlet, Link } from "react-router-dom";
import './index.css'

const Layout = () => {

  function switchTab(index){
    window.location('/things')
  }

  return (
    <>
      <view className="tabBar">
        <view to={'/'} className='tab' onClick={()=>{
          switchTab(0)
        }}>Home</view>
        <view to={'/blogs'} className='tab'>Blogs</view>
        <view to={'/things'} className='tab'>Things</view>
        <Link to="/" className="tab">
          <a>Home</a>
          <view className="tab">Home</view>
        </Link>
        <Link to="/blogs" className="tab">Blogs</Link>
      </view>

      <Outlet />
    </>
  )
};

export default Layout;