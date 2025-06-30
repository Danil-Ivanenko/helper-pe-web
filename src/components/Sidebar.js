import React, { useState, useEffect} from 'react';
import logoutLogo from '../icons/logoutBtn.svg'

import teacherLogo from '../icons/teacher.svg'
import menuIcon from '../icons/menu.svg';
import arrow from '../icons/arrow.svg';
import studentLogo from '../icons/student.svg'
import downloadLogo from '../icons/download.svg'

import { useLocation, Link } from 'react-router-dom';
import { peApi } from '../Api/peApi'
import '../csses/profile.css'
function Sidebar({ isOpen, toggleSidebar }) {


    const role = localStorage.getItem('role')
    
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

                {role === "Admin" && ( <div className={`sidebarEl ${isActive('/admin') ? 'choosed' : ''}`} ><a href='/admin' className='sidebarHref'> <p className='menu-el'> <img src={teacherLogo} /> <span>Учителя</span></p> </a></div> )}
                
                {role === "Curator" && ( <div className={`sidebarEl ${isActive('/curator') ? 'choosed' : ''}`} ><a href='/curator' className='sidebarHref'> <p className='menu-el'> <img src={studentLogo} /> <span>Спорторги</span></p> </a></div>)}
                {role === "Curator" && ( <div className={`sidebarEl ${isActive('/tables') ? 'choosed' : ''}`} ><a href='/tables' className='sidebarHref'> <p className='menu-el'> <img src={downloadLogo} /> <span> Таблицы </span></p> </a></div>)}

                 <div onClick={async () => peApi.logout()}  className="sidebarEl" style={{cursor : "pointer"}} > <a className='sidebarHref'> <p className='menu-el'> <img src={logoutLogo} style={{marginLeft : "8px"}} alt="events" /> <span>Выйти</span> </p> </a>  </div>
    
                
            </div>
        </div>
    );
}

export default Sidebar;