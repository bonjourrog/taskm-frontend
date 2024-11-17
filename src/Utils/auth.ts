import { User } from "../Entity/user";

export const isAuthenticated = ():boolean=>{
    const token:string|null = localStorage.getItem("authToken");
    if(!token)return false;
    const payload: User = JSON.parse(atob(token.split('.')[1]));
    const isExpired: boolean = payload.exp * 1000 < Date.now();
    return !isExpired;
}
export const setAuthenticatedUser = ():User=>{
    const token: string | null = localStorage.getItem("authToken");
    if (token) {
        const payload: User = JSON.parse(atob(token.split('.')[1]));
        return payload
    }
    return {} as User;
}