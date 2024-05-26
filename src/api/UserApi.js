import axios from 'axios';
import { RootUrl } from './RootUrl';

const rootURL = RootUrl() + '/user';

export const registerUSer = async (data) => {
    const response = await axios.post(`${rootURL}/register`,data,{
        headers :{
            "Content-Type": "multipart/form-data"
        },
    });
    return response;
};

export const loginAixos = async(data)=>{
    const response = await axios.post(`${rootURL}/login`, data);

    return response;
}

export const getUserList = async(data)=>{
    const response = await axios.get(`${rootURL}/list`);
    return response.data;
}