import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Sidebar from '../components/Sidebar';
import FacultyTableCard from '../components/facultyTableCard';
import {loadCuratorFacultiesThunkCreator } from '../reducers/curator-reducer'

function TablesPage() {
    
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };
    const dispatch = useDispatch();
    const curatorFacultiesReducer = useSelector(state => state.curatorFacultiesReducer);
    
    useEffect(() => {
      dispatch(loadCuratorFacultiesThunkCreator());
    }, [dispatch]);
    

    return (

    <div className="app-container">

        <div className="header" > 
            <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
            <p className={`headerName ${isSidebarOpen ? 'shifted' : ''}`}>Таблицы</p>
            
        </div>
         <div className={`main-content ${isSidebarOpen ? 'shifted' : ''}`} style={{gap : "15px"}}>
            <p className='mainName'>Таблицы</p>

                { Array.isArray(curatorFacultiesReducer?.faculties) ? (
                        curatorFacultiesReducer?.faculties.map((faculty, index) => (
                            
                            <FacultyTableCard  faculty={faculty} key={index}/>
                        ))
                    ) : ("")}
            
                    
        </div>
        
    </div>
    );
}
  
  export default TablesPage;