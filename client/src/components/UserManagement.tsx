import { useState, useEffect } from 'react';
import axios from 'axios';
import { UserTypes } from '../types/UserTypes';

axios.defaults.baseURL = "http://localhost:8080";

export function UserManagement() {

    const [dataList,setDataList] = useState<UserTypes[]>([]);
    const [editSection, setEditSection] = useState(false)
    const [addSection, setAddSection] = useState(false)

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
      const handleGetAll = async()=>{
        const response = await axios.get("/users")
        console.log("Fetched data:")
        console.log(response)
        setDataList(response.data)
      }
    
      
    
      const handleDelete = async (id:string) => {
        await axios.delete("/users/"+id)
        handleGetAll()
        alert("User deleted")  
      }
    
      const handleEdit = (user: UserTypes) => {
        setEditUserData(user);
        setUniqueUserData(user);
        setEditSection(true);
      }
      useEffect(()=>{
        handleGetAll()
        // console.log(editUserData)
      }, [editUserData]);

      return {
        setDataList,
        dataList,
        setEditSection,
        editSection,
        setAddSection,
        addSection,
        uniqueUserData,
        formData,
        editUserData,
        handleInputChange,
        handleSelectChange,
        handleSubmit,
        handleEditSubmit,
        handleGetAll,
        handleDelete,
        handleEdit
      }
}