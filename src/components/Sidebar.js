import React, { useState, useEffect} from 'react';
import logoutLogo from '../icons/logoutBtn.svg'

// import userIcon from '../icons/User.svg';
// import adminIcon from '../icons/Administrator.svg';
// import eventsIcon from '../icons/Events.svg';
// import servicesIcon from '../icons/Services.svg';
// import certificateIcon from '../icons/Сertificate.svg';

// import userIconBlue from '../icons/UserBlue.svg';
// import adminIconBlue from '../icons/AdministratorBlue.svg';
// import eventsIconBlue from '../icons/EventsBlue.svg';
// import servicesIconBlue from '../icons/ServicesBlue.svg';
// import certificateIconBlue from '../icons/СertificateBlue.svg';
import teacherLogo from '../icons/teacher.svg'
import menuIcon from '../icons/menu.svg';
import arrow from '../icons/arrow.svg';
import studentLogo from '../icons/student.svg'
// import {useSelector, useDispatch} from 'react-redux'
// import {loadProfileThunkCreator} from '../reducers/sidebar-reducer';
// import {loadPhotoThunkCreator} from '../reducers/sidebar-reducer';
import { useLocation, Link } from 'react-router-dom';
import { peApi } from '../Api/peApi'
import '../csses/profile.css'
function Sidebar({ isOpen, toggleSidebar }) {

    // var state = useSelector((state) => state.sidebarReducer);
    // const dispatch = useDispatch();
    // useEffect(() => {
    //     const fetchData = async () => {
    //         await dispatch(loadProfileThunkCreator());
    //     };
    //     fetchData();
    // }, [dispatch]);

    // useEffect(() => {
    //     if (state.profile?.avatar?.id) {
    //         dispatch(loadPhotoThunkCreator(state.profile.avatar.id));
    //     }
    // }, [dispatch, state.profile.avatar]);
    

    const [rotation, setRotation] = useState(0);
    const handleArrowClick = () => {
        setRotation((prevRotation) => prevRotation + 180); 
    };

      const location = useLocation();
     const isActive = (path) => {
        return location.pathname.startsWith(path);
    };

    return (
        <div>
            

            <img src={menuIcon}  onClick={toggleSidebar} className='smallScreen'/>
            <div className={`sidebar ${isOpen ? 'open' : 'closed'}`} style={{padding : "0px", paddingTop : "20px"}}>

                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '50px', marginLeft: "12px" }}>
                    <div />
                    <div> </div>
                    <img src={arrow} alt="Arrow"                
                    onClick={() => {
                        handleArrowClick(); 
                        toggleSidebar();  

                    }}
                    style={{ transform: `rotate(${rotation}deg)` }}
                    />
                    
                </div>

                <div className={`sidebarEl ${isActive('/admin') ? 'choosed' : ''}`} ><a href='/admin' className='sidebarHref'> <p className='menu-el'> <img src={teacherLogo} /> <span>Учителя</span></p> </a></div>
                <div className={`sidebarEl ${isActive('/teacher') ? 'choosed' : ''}`} ><a href='/teacher' className='sidebarHref'> <p className='menu-el'> <img src={studentLogo} /> <span>Студенты</span></p> </a></div>
                {/* <div className={`sidebarEl ${isActive('/profile') ? 'choosed' : ''} `  }  ><a href='/profile' className='sidebarHref'> <p className='menu-el'> <img src={isActive('/profile') ? userIconBlue : userIcon} alt="User" /> <span>{t("profile")}</span></p> </a></div>

                
                <div className={`sidebarEl ${isActive('/events') ? 'choosed' : ''}`} ><a href='/events' className='sidebarHref'> <p className='menu-el'> <img src={isActive('/events') ? eventsIconBlue : eventsIcon} alt="events" /> <span>{t("events")}</span></p> </a></div> */}
                
                 <div onClick={async () => peApi.logout()}  className="sidebarEl" style={{cursor : "pointer"}} > <a className='sidebarHref'> <p className='menu-el'> <img src={logoutLogo} style={{marginLeft : "8px"}} alt="events" /> <span>Выйти</span> </p> </a>  </div>
    
                
            </div>
        </div>
    );
}

export default Sidebar;