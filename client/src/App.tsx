import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import './App.css';
import {MdClose} from 'react-icons/md';
import {useState} from 'react';
import axios from 'axios';

axios.defaults.baseURL = "http://localhost:8080"

function App() {
  const [addSection, setAddSection] = useState(false)
  const [formData,setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumbers: {
      type: "primary",
      value: ""
    }
    
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) =>{
    const {value,name} = e.target

    if (name.startsWith("phoneNumbers.")) {
      setFormData((prev) => ({
        ...prev,
        phoneNumbers: {
          ...prev.phoneNumbers,
          [name.replace("phoneNumbers.", "")]: value
        }
      }));
    } else {
      setFormData((prev)=>{
        return{
          ...prev,
          [name] : value
        }
      })
    }
    
  }

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { value, name } = e.target;

    if (name === "phoneNumbers.type") {
      setFormData((prev) => ({
        ...prev,
        phoneNumbers: {
          ...prev.phoneNumbers,
          type: value
        }
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
   
  };

  const handleSubmit = async(e: React.FormEvent<HTMLFormElement>)=>{
    e.preventDefault()
    const data = axios.post("/users", formData)
    console.log(data)
  }

  return (
    <div className='container'>
      <button type='button' className='btn btn-info' onClick={()=>setAddSection(true)}>+</button>


      {
        addSection && (
          <div className='addContainer'>
        <form onSubmit={handleSubmit}>
          <div className='close-btn' onClick={()=>setAddSection(false)}><MdClose/></div>
          <div className='form-group'>
          <label htmlFor="firstName">First name: </label>
          <input type='text' className='form-control' id='first-name' name='firstName' onChange={handleInputChange} required/>
          </div>
          
          <div className='form-group'>
          <label htmlFor="lastName">Last name: </label>
          <input type='text' className='form-control' id='last-name' name='lastName' onChange={handleInputChange} required/>
          </div>

          <div className='form-group'>
          <label htmlFor="email">Email: </label>
          <input type='email' className='form-control' id='email' name='email' onChange={handleInputChange} required/>
          </div>

          <div className='form-group'>
          <label htmlFor="phoneNumberType">Phone number type: </label>
          <select className='form-control' id='phone-number-type' name='phoneNumbers.type' onChange={handleSelectChange} required>
            <option disabled hidden>Choose here</option>
            <option value='primary' >Primary</option>
            <option value='secondary'>Secondary</option>
          </select>

          <label htmlFor="phoneNumber">Phone number: </label>
          <input type='text' className='form-control' id='phone-number' name='phoneNumbers.value' onChange={handleInputChange} required/>
          </div>

          <div className='form-group'>
          <button type='submit' className='btn btn-success submit-button form-control'>Submit</button>
          </div>
          
        </form>
      </div>
        )
      }
      

    </div>
  );
}

export default App;
