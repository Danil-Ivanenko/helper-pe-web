import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import adminstyles from '../csses/admin.module.css'
import Sidebar from '../components/Sidebar';
import styles from '../csses/sidebar.css'
import arrowLogo from '../icons/arrow.svg'
import {loadTeachersThunkCreator, loadCuratorsThunkCreator,  loadFacultiesThunkCreator} from '../reducers/teachers-reducer'
import TeacherCuratorCard from '../components/teacherCuratorCard'
function AdminUsersPage() {
    
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };
    const dispatch = useDispatch();
    const employeeState = useSelector(state => state.teachersReducer);
    
    useEffect(() => {
      dispatch(loadTeachersThunkCreator());
      dispatch(loadCuratorsThunkCreator());
      dispatch(loadFacultiesThunkCreator());
    }, [dispatch]);
    
    const [activeSection, setActiveSection] = useState("teacher");
    const toggleSection = () => {
        setActiveSection((prevSection) => {
            if (prevSection === 'teacher'  ) {  
                return 'curator';
            } else if (prevSection === 'curator' ) {
                return 'teacher';
            } else {
                return prevSection; 
            }
        });
    };
    
    const getWorkOrStudyStyle = (section) => {
        return {
          cursor: 'pointer',
          color: activeSection === section ? 'blue' : 'black', 

          boxShadow: activeSection === section ? `  0 1px blue` : 'none'
        };
      };


    console.log(employeeState)
    return (

    <div className="app-container">

        <div className="header" > 
            <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
            <p className={`headerName ${isSidebarOpen ? 'shifted' : ''}`}>Кураторы</p>
            
        </div>
         <div className={`main-content ${isSidebarOpen ? 'shifted' : ''}`} style={{gap : "15px"}}>
            <p className='mainName'>Кураторы</p>

                <p className='workOrStudy' onClick={toggleSection} >
                   <span   style={getWorkOrStudyStyle('teacher')}> Учителя </span >
                    <span  style={getWorkOrStudyStyle('curator')}>  Кураторы </span >
                </p>
            
                {activeSection === 'teacher' && (
                        <> 

                        { Array.isArray(employeeState?.teachers) ? (
                                employeeState.teachers.filter(teacher => teacher.role === "Teacher").map((teacher, index) => (
                                
                                    
                                    <TeacherCuratorCard userState={teacher} key={index}  allFaculties={employeeState?.faculties}/>
                                
                                
                                ))
                            ) : ("")}
                            
                        </>
                    )}
                
                {activeSection === 'curator' && (
                        <> 

                        { Array.isArray(employeeState?.curators) ? (
                                employeeState.curators.map((curator, index) => (
                                
                                    
                                    <TeacherCuratorCard userState={curator} key={index}  allFaculties={employeeState?.faculties}/>
                                
                                
                                ))
                            ) : ("")}
                            
                        </>
                    )}
                    

        </div>
        
    </div>
    );
}
  
  export default AdminUsersPage;