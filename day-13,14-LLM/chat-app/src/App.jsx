import React, { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';

const url = import.meta.env.VITE_BACKEND_URL;

const App = () => {

  const [question, setQuestion] = useState("");
  const [questionShow, setQuestionShow] = useState("");
  const [answer, setAnswer] = useState("");
  const [source, setSource] = useState([]);
  const[showSources, setShowSources] = useState(false);

  const handleChange = (e) => {
    setQuestion(e.target.value);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setQuestionShow(question);

      const response = await axios.post(`${url}/chat`, { question: question });

      if (response.data.success === true) {
        setAnswer( (response.data.answer.result))
        setSource([response.data.answer.sources])
      }
      setQuestion("");

    } catch (error) {
      console.error("Error: ", error.message);
    }
  }

  const apiCall = async () => {

    const response = await axios.get(`${url}/chat`);

    if (response.data.success === true) {
      setContents(response.data.answer);
    }

  }

  const handleShowSource = ()=>{
    if(showSources===true) setShowSources(false)
      else setShowSources(true)
  }

  useEffect(() => {
    // apiCall()

  }, [])


  return (
    <div className="chat-container">
      <div className="messages">
        {questionShow && answer &&

          <div className='item-box'>
            { questionShow &&
              <div className="user border rounded p-3"> {questionShow}</div>}
            { answer &&
              <div className="assistant  border rounded p-3 bg-grey-200">
                {answer}

                <div>
                  source:
                {
                  source[0] &&
                  source[0].map((ele,idx)=>(
                    <span key={idx} className='source-id' onClick={handleShowSource}>
                      {ele.id},

                      { showSources &&
                        <>
                        <p className='source-text'>{ele.text}</p>
                        <p>---------------------------------------------------------------------                        </p>
                        </>
                      } 
                    </span>
                    
                  ))
                }
                </div>
              </div>}

              
          </div>

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