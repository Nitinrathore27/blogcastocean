import conf from "../conf/conf";
import { Client, Account, ID } from "appwrite";

export class AuthService{
    client = new Client();
    account;

    constructor(){
        this.client
                .setEndpoint(conf.appwriteUrl)
                .setProject(conf.appwriteProjectId);
        this.account = new Account(this.client);
    }

    async createAccount({email, password, name}){
        try {
            const userAccount = await this.account.create(ID.unique(), email, password, name)
            if(userAccount) {
                // call method for login
                return this.login({email, password})
            }
            else{
                return userAccount
            }
        } catch (error) {
            throw error ;
        }
    }

    async login({email, password}){
        try {
            return this.account.createEmailSession(email, password)
        } catch (error) {
            throw error;
        }
    }

    async getCurrentuser(){
        try {
            return this.account.get();
        } catch (error) {
            throw error;
        }
    }
    async logout(){
        try {
            return this.account.deleteSessions()
        } catch (error) {
            throw error;
        } 
    }
}

const authService = new AuthService();

export default authService

