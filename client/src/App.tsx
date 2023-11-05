import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import './App.css';
import {MdClose, MdDelete, MdEdit} from 'react-icons/md';
import {useState, useEffect} from 'react';
import axios from 'axios';

axios.defaults.baseURL = "http://localhost:8080"

interface UserData {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumbers: [{
    type: string;
    value: string;
  }];
}


function App() {
  const [addSection, setAddSection] = useState(false)
  const [formData,setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumbers: [{
      type: "primary",
      value: ""
    }]
    
  })
  const [dataList,setDataList] = useState<UserData[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 5;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) =>{
    const {value,name} = e.target

    if (name.startsWith("phoneNumbers.")) {
      const field = name.replace("phoneNumbers.","");
      setFormData((prev) => ({
        ...prev,
        phoneNumbers: prev.phoneNumbers.map((phoneNumber, index) => {
          if(index === 0){
            return { ...phoneNumber, [field]: value};
          }
          return phoneNumber;
        })
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
        phoneNumbers: prev.phoneNumbers.map((phoneNumber, index) => {
          if (index === 0) {
            return { ...phoneNumber, type: value };
          }
          return phoneNumber;
        })
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
   
  };
  const getFetchData = async()=>{
    const response = await axios.get("/users")
    console.log("Return fetched data:")
    console.log(response)
    setDataList(response.data)
  
  }

  const handleSubmit = async(e: React.FormEvent<HTMLFormElement>)=>{
    e.preventDefault()
    const response = await axios.post("/users", formData)
    console.log(response)
    if(response.statusText === "Created"){
      setAddSection(false)
    }
    getFetchData()

  }


  useEffect(()=>{
    getFetchData()
  }, []);

const handleDelete = async (id:string) => {
  await axios.delete("/users/"+id)
  getFetchData()
  alert("User deleted")  
}

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = dataList.slice(indexOfFirstUser, indexOfLastUser);

  return (
    <div className='container'>
      <button type='button' className='btn btn-info' onClick={()=>setAddSection(true)}>Add User</button>


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

      <div className='container'>
      <table className="table">
  <thead>
    <tr>
      <th scope="col">ID</th>
      <th scope="col">First Name</th>
      <th scope="col">Last Name</th>
      <th scope="col">Email</th>
      <th scope="col">Phone Number(s)</th>
      <th scope='col'>Edit/Delete</th>
    </tr>
  </thead>
  <tbody>
    {
      currentUsers.map((el) =>{
        return(
          <tr key={el._id}>
            <td>{el._id}</td>
            <td>{el.firstName}</td>
            <td>{el.lastName}</td>
            <td>{el.email}</td>
            <td>
              {el.phoneNumbers.map((phoneNumber, index)=>(
                <div key={index}>
                  Type: {phoneNumber.type} <br/> Number: {phoneNumber.value}
                </div>
              ))}
            </td>
            <td>
              <ul className='list-inline m-0'>
                <li className='list-inline-item'>
                  <button className="btn btn-success btn-sm rounded-0" title="Edit"><MdEdit/></button>
                </li>
                <li className="list-inline-item">
                  <button className="btn btn-danger btn-sm rounded-0" title="Delete" onClick={()=>handleDelete(el._id)}><MdDelete/></button>
                </li>

              </ul>
            </td>
          </tr>
        )
      })
    }
  </tbody>
</table>
<div className='pagination'>
<button id='prev-button' className='btn btn-secondary' onClick={()=>setCurrentPage(currentPage-1)} disabled={currentPage===1}>
      Previous
    </button>
    <button id='next-button' className='btn btn-secondary' onClick={()=>setCurrentPage(currentPage+1)} disabled={indexOfLastUser >= dataList.length}>
      Next
    </button>
    
</div>
      </div>
      

    </div>
  );
}

export default App;
