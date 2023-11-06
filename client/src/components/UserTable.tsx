import React from 'react';
import { MdDelete, MdEdit } from 'react-icons/md';
import { UserTypes } from '../types/UserTypes';

interface UserTableProps {
  currentUsers: UserTypes[];
  handleEdit: (user: UserTypes) => void;
  handleDelete: (id: string) => void;
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  indexOfLastUser: number;
  dataList: UserTypes[];
}

const UserTable: React.FC<UserTableProps> = ({
  currentUsers,
  handleEdit,
  handleDelete,
  currentPage,
  setCurrentPage,
  indexOfLastUser,
  dataList,
}) => {
  return (
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
  );
};

export default UserTable;
