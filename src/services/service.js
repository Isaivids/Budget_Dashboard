import axios from "axios";

export class service{
    static dbURL = `http://localhost:9000`;

    static getBalance (){
        let dataURL = `${this.dbURL}/total`;
        return axios.get(dataURL);
    }
    static getBudget (){
        let dataURL = `${this.dbURL}/budget`;
        return axios.get(dataURL);
    }
    static deleteBudget (budgetId){
        let dataURL = `${this.dbURL}/budget/${budgetId}`;
        return axios.delete(dataURL);
    }
    static createBudget (budget){
        let dataURL = `${this.dbURL}/budget`;
        return axios.post(dataURL, budget);
    }

}  