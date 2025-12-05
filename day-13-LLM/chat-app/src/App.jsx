import React, { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';

const url = import.meta.env.VITE_BACKEND_URL;

const App = () => {

  const [question, setQuestion] = useState("");
  const [contents, setContents] = useState([]);

  const handleChange = (e) => {
    setQuestion(e.target.value);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${url}/chat`, {question:question});
      if(response.data.success===true){        
            apiCall() 
      }
      setQuestion("");

    } catch (error) {
      console.error("Error: ", error.message);
    }
  }

  const apiCall = async() => {

    const response = await axios.get(`${url}/chat`);
    
    if(response.data.success===true){      
      setContents(response.data.answer);  
    }    

  }

  useEffect(()=>{
    apiCall()
  },[])


  return (
    <div className="chat-container">
      <div className="messages">
        { contents &&
          contents.map((item, index)=>(
            <div className='item-box' key={index}>
               {item.role==="user" &&
                  <div className="user border rounded p-3">{item.content}</div>
                }
                
               {item.role==="assistant" && 
                <div className="assistant  border rounded p-3 bg-grey-200">{item.content}</div>
               }
               
            </div>
          ))
        }
       
      </div>

      <form onSubmit={handleSubmit} className='input-row d-flex align-items-center px-3'>
        <button className='add-btn' aria-label="Add">+</button>
        <input onChange={handleChange} value={question} className='form-control border-0 input-height' type="text" placeholder='Ask anything' />
        <button className='send-btn' aria-label="Send">→</button>
      </form>
    </div>
  )
}

export default App