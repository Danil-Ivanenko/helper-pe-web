import axios from 'axios';
//https://localhost:7131/api/
//https://1500-57-129-38-230.ngrok-free.app/api/
const baseURL ='https://1500-57-129-38-230.ngrok-free.app/api/';
const instance = axios.create({
    baseURL : baseURL
});

async function login(email, password){
    return instance.post('login',{
        email: email,
        password: password
    })
    .then(response => {
        if (response.status === 200) {
            localStorage.setItem('token', response.data.accessToken);
            localStorage.setItem('refreshToken', response.data.refreshToken);
            let role = JSON.parse(atob(response.data.accessToken.split('.')[1])).role;
            response.role = role;
            localStorage.setItem('role', role);
            return response; 
        }
        return response; 
    })
    .catch(error => {
        return error
    });

}

async function getFile(id){

    return instance.get('Avatar', {id}, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
        }

    })
    .then(response => {
        if (response.status === 200) {
            return response.data; 
        }
    })
    .catch(error => {
        if (error.response) {
            return(error.response.data)
        }
        else
        {
            console.log("Ошибка")
        }
    });
}





async function logout() {
    return instance.post(`logout`,  
    {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
        }
    })
    .then(response => {
        localStorage.removeItem('token')
        localStorage.removeItem('refreshToken')
        localStorage.removeItem('role')
        window.location.href = "/login"
    })
    .catch ( () => {
        localStorage.removeItem('token')
        localStorage.removeItem('refreshToken')
        localStorage.removeItem('role')
        window.location.href = "/login"
    })
}

async function getTeachers(){

    return instance.get('admin/teachers', {

        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}` 
        }
    })
    .then(response => {
        if (response.status === 200) {
            return response.data; 
        }
    })
    .catch(error => {
        if (error.response) {
            return(error.response.data)
        }
        else
        {
            console.log("Ошибка")
        }
    });
}

async function getCurators(){

    return instance.get('admin/curators', {

        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}` 
        }
    })
    .then(response => {
        if (response.status === 200) {
            return response.data; 
        }
    })
    .catch(error => {
        if (error.response) {
            return(error.response.data)
        }
        else
        {
            console.log("Ошибка")
        }
    });
}

async function refreshToken() {
    if (localStorage.getItem('token') == null)
    {
        return null
    }
    try {
        const response = await instance.post('refresh', {
            refreshToken: localStorage.getItem('refreshToken'),
        });


        if (response.status === 200) {
            localStorage.setItem('token', response.data.accessToken);
            localStorage.setItem('refreshToken', response.data.refreshToken);
            let role = JSON.parse(atob(response.data.accessToken.split('.')[1])).role;
            localStorage.setItem('role',role);
            return response.data.accessToken
        }
        return null
    } catch (error) {
        console.error("Ошибка при обновлении токена:", error.response?.data || error.message);
        return null;
    }
}


instance.interceptors.response.use(
    (response) => {
        return response;
    },
    async (error) => {
        const originalRequest = error.config;
        if (error.response.status === 401) {
            
            if (!originalRequest._retry && originalRequest.url !== "Auth/refresh") {
                originalRequest._retry = true;
    
                const newAccessToken = await refreshToken();

                if (!newAccessToken) {
                    console.log("Ошибка: Не удалось обновить токен!");
                    return Promise.reject(error);
                }
                originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
                return instance(originalRequest);
            }
        }

        return Promise.reject(error);
    }
);





export const peApi = {
    login : login,
    logout: logout,
    getFile: getFile,
    getTeachers: getTeachers,
    getCurators: getCurators
}