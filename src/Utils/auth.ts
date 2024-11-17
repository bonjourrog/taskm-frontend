export const isAuthenticated = ():boolean=>{
    const token:string|null = localStorage.getItem("authToken");
    if(!token)return false;
    const payload = JSON.parse(atob(token.split('.')[1]))
    const isExpired: boolean = payload.exp * 1000 < Date.now()
    return !isExpired;
}