export const getToken = ()=>{
    const tkn = sessionStorage.getItem('token') || localStorage.getItem('token')
    const token = JSON.parse(tkn);
    return token
}