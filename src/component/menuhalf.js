import cloudicon from '../sources/assets/Cloud_Download.png';
import calendar from '../sources/assets/Calendar_Days.png';
import users from '../sources/assets/Users.png';
import logout from '../sources/assets/logout.png';
import settings from '../sources/assets/settings_icon.png';
import help from '../sources/assets/help_icon.png';
import { Link, NavLink } from 'react-router-dom';

const Menuhalf = () => {
    return ( 
        <div className="bg-light j">
        <div className='d-flex whitetext w-100 py-2 greenerbackground justify-content-around align-items-center'>
          <img src={cloudicon} style={{height: "25px"}} className='mx-2' alt="" />  <h5>DashBoard</h5> <span className='btn btn-sm mx-2' style={{backgroundColor: "#7BB66D", color: "#f2f2f2"}}>New</span>
        </div>
        <div className='g mt-3'>
            <div className="d-flex align-items-center ">
              
                
                 <img   src={calendar} alt="" />
            <NavLink to="customerbook">
                  <span>Booking Directory</span>
            
            </NavLink>
            </div>
            <div className='d-flex  align-items-center'>
                <img src={calendar} alt="" /> <NavLink to="carlisting"> <span>Car Listing</span></NavLink>
            </div>
            <div className='d-flex align-items-center'>
                <img src={users} alt="" /> <span>
                    <NavLink to="notification">
                    Notification </NavLink> </span>
            </div>
        
       
        <div className='mt-5 d-flex align-items-center align-items-center'>
                <img src={settings} alt="" /> <span>Settings</span>
            </div>
        <div className=' d-flex align-items-center align-items-center'>
                <img src={help} alt="" /> <span>Help</span>
            </div>
        <div className='d-flex align-items-center align-items-center'>
                <img src={logout} alt="" /> <span>Logout</span>
            </div>

        </div>
    </div>
     );
}
 
export default Menuhalf;