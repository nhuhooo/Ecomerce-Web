export const setToken = (token)=>{
    localStorage.setItem("token", token)
}
export const setUser = (user)=>{
    localStorage.setItem("user", JSON.stringify(user))
}
export const getToken = ()=>{
    return localStorage.getItem("token")
}
export const getUser = ()=>{
    return JSON.parse(localStorage.getItem("user"))
}
function parseJwt (token) {
    try {
        var base64Url = token.split('.')[1];
        var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));

    return JSON.parse(jsonPayload);
    } catch (error) {
        
    }
    return {}
    
}
export const isLogined = ()=>{
    const token = getToken();
  
    if (token === null || token === undefined || token === "")
        return false
    const obj = parseJwt(token)
    const exp = obj.exp ? obj.exp : 0
    return (Date.now() < +(exp * 1000))

}