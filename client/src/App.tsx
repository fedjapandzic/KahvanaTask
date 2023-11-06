import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import './App.css';
import {MdClose, MdDelete, MdEdit} from 'react-icons/md';
import {useState, useEffect} from 'react';
import axios from 'axios';
import NewUserForm from './components/NewUserForm';
import { UserData } from './types/UserData';

axios.defaults.baseURL = "http://localhost:8080"




function App() {
  const [addSection, setAddSection] = useState(false)
  const [editSection, setEditSection] = useState(false)
  const [uniqueUserData, setUniqueUserData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumbers: [{
      type: "primary",
      value: ""
    }]
  })

  const [formData,setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumbers: [{
      type: "primary",
      value: ""
    }]
  })
  const [editUserData,setEditUserData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumbers: [{
      type: "",
      value: ""
    }],
    _id: ""
  })

  const [dataList,setDataList] = useState<UserData[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 5;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) =>{
    const {value,name} = e.target

    if (name.startsWith("phoneNumbers.")) {
      setFormData((prev) => ({
        ...prev,
        phoneNumbers: [{ ...prev.phoneNumbers[0], value: value}]
      }));
    } else {
      setFormData((prev)=>{
        return{
          ...prev,
          [name] : value
        }
      })
    }
    if(editUserData){
      if (name.startsWith("phoneNumbers.")) {
        setUniqueUserData((prev) => ({
          ...prev,
          phoneNumbers: [{ ...prev.phoneNumbers[0], value: value}]
        }));
      } else {
        setUniqueUserData((prev)=>{
          return{
            ...prev,
            [name] : value
          }
        })
      }
    }

  }

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
      const { value, name } = e.target;

    if (name === "phoneNumbers.type") {
      setFormData((prev) => ({
        ...prev,
        phoneNumbers: [{...prev.phoneNumbers[0], type: value}]
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
    if(editUserData){
      if (name === "phoneNumbers.type") {
        setUniqueUserData((prev) => ({
          ...prev,
          phoneNumbers: [{...prev.phoneNumbers[0], type: value}]
        }));
      } else {
        setUniqueUserData((prev) => ({
          ...prev,
          [name]: value,
        }));
      }
    } 
   
  };
  const handleGetAll = async()=>{
    const response = await axios.get("/users")
    console.log("Fetched data:")
    console.log(response)
    setDataList(response.data)
  }

  const handleSubmit = async(e: React.FormEvent<HTMLFormElement>)=>{
    e.preventDefault()
    const response = await axios.post("/users", formData)
    console.log(response)
    if(response.statusText === "Created"){
      setAddSection(false)
      alert("User added")
    }
    handleGetAll()
  }

  const handleDelete = async (id:string) => {
    await axios.delete("/users/"+id)
    handleGetAll()
    alert("User deleted")  
  }

  const handleEdit = (user: UserData) => {
    setEditUserData(user);
    setUniqueUserData(user);
    setEditSection(true);
  }

  const handleEditSubmit =async (e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("OVO JE USER DATA \/")
      console.log(editUserData)
      
      const userId = editUserData?._id; 
      await axios.put("/users/" + userId , uniqueUserData);
      setEditSection(false);
      handleGetAll();
      console.log("OVO JE UNIQUE DATA \/")
      console.log(uniqueUserData)
    
  }

  


  useEffect(()=>{
    handleGetAll()
    // console.log(editUserData)
  }, [editUserData]);



  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = dataList.slice(indexOfFirstUser, indexOfLastUser);

  return (
    <div className='container'>
      <button type='button' className='btn btn-info' onClick={()=>setAddSection(true)}>Add User</button>


      {
        addSection && (
          <NewUserForm
          handleSubmit={handleSubmit}
          handleInputChange={handleInputChange}
          handleSelectChange={handleSelectChange}
          handleClose={()=>setAddSection(false)}
          editUserData={null}
          handleEditSubmit={()=>{}}
          
          />
        )
      }

      {
        editSection && (
          <NewUserForm
          handleSubmit={()=>{}}
          handleInputChange={handleInputChange}
          handleSelectChange={handleSelectChange}
          handleClose={()=>setEditSection(false)}
          editUserData={editUserData}
          handleEditSubmit={handleEditSubmit}
          
          />
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
                  <button className="btn btn-success btn-sm rounded-0" title="Edit" onClick={()=> handleEdit(el)}><MdEdit/></button>
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
