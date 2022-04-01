const USRER_KEY = 'user_key'

export default {
    saveUser(user){
        localStorage.setItem(USRER_KEY,JSON.stringify(user))
    },
    getUser(){
        return JSON.parse(localStorage.getItem(USRER_KEY) || "{}")
    },
    removeUser(){
        localStorage.removeItem(USRER_KEY)
    }
}