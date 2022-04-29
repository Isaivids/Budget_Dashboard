import React, { useEffect, useState } from 'react';
import { service } from '../services/service';

const AppPanel = () => {

const [state, setState] = useState({ total : [] , budget : []});
const [input, setInput] = useState({budget : 
    {
        type: "",
        desc: "",
        amount:"",
        date:"",
        id:""
    },
    total: {balance: ""}
})


useEffect(() => {
    async function fetchData() {
        const balresponse = await service.getBalance();
        const budgetresponse = await service.getBudget();
        setState({...state, total: balresponse.data , budget: budgetresponse.data});
    }
    fetchData();
}, [])  

const handleDelete = async (budgetId) => {
    try {
      let deleteBudget = await service.deleteBudget(budgetId);
      let budgetresponse = await service.getBudget();
      setState({ ...state,budget: budgetresponse.data});
    } catch (error) {
      console.log(error.message);
    }
  };

const handleChange =(event)=> {
setInput({
    ...input,
    budget: {
    ...input.budget,
    [event.target.name]: event.target.value,
    },
});
}

let handleSubmit = async (e) =>{
    e.preventDefault();
    try{
      let createresponse = await service.createBudget(input.budget) ;
      console.log(state.total.balance);
      let budgetresponse = await service.getBudget();
      setState({...state,budget: budgetresponse.data});
      e.target.reset(); 
      setInput({
        budget: {
        [e.target.name]: null,
        },
    });
    }
    catch(error){
      console.log(error.message);
    }
}
    
let {total, budget} = state;

  return (
    <div>
        <h3>{total}</h3>
        <form onSubmit={handleSubmit}>
            <div onChange={handleChange} >
            <input type="radio" value="Expense" name="type"/>Expense
            <input type="radio" value="Income"name="type"/>Income
            </div>
            <input type="text" name='desc' value={input.desc} onChange={handleChange} placeholder='Enter the reason '/>
            <input type="number" name='amount' value={input.amount} onChange={handleChange} placeholder='Enter amount'/>
            <input type="date" name='date' value={input.date} onChange={handleChange} placeholder='Enter Date'/>
            <button>Submit</button>
        </form>
        {budget.map((detail)=>{
            return(
                <div key={detail.id}>
                    <p>{detail.desc} - {detail.type} - {detail.amount} - {detail.date} - <button onClick={()=>handleDelete(detail.id)}>Delete</button></p>
                </div>
            )
        })}
    </div>
  )
}

export default AppPanel