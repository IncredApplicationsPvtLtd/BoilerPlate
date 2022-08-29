export const addAdminToLocalStorage=(admin)=>{
    localStorage.setItem('admin',JSON.stringify(admin))
}
export const addTokenToLocalStorage=(token)=>{
    localStorage.setItem('token',JSON.stringify(token))
}

export const removeAdminFromLocalStorage=()=>{
    localStorage.removeItem('admin');
    localStorage.removeItem('token');
}

export const getAdminFromLocalStorage=()=>{
    const result=localStorage.getItem('admin');
    const data=result?JSON.parse(result):null;
    return data;
}

export const getTokenFromLocalStorgae=()=>{
    const result=localStorage.getItem('token');
    const token=result?JSON.parse(result):null;
    return token;
}