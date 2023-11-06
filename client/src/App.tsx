import 'bootstrap/dist/css/bootstrap.css';
import './App.css';
import {useState, useEffect} from 'react';
import UserForm from './components/UserForm';
import { UserManagement } from './components/UserManagement';
import UserTable from './components/UserTable';

function App() {
  const {
      dataList,
      setEditSection,
      editSection,
      setAddSection,
      addSection,
      editUserData,
      handleInputChange,
      handleSelectChange,
      handleSubmit,
      handleEditSubmit,
      handleDelete,
      handleEdit
  } = UserManagement();


  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 5;
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = dataList.slice(indexOfFirstUser, indexOfLastUser);

  return (
    <div className='container'>
      <button type='button' className='btn btn-info' onClick={()=>setAddSection(true)}>Add User</button>


      {
        addSection && (
          <UserForm
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
          <UserForm
          handleSubmit={()=>{}}
          handleInputChange={handleInputChange}
          handleSelectChange={handleSelectChange}
          handleClose={()=>setEditSection(false)}
          editUserData={editUserData}
          handleEditSubmit={handleEditSubmit}
          
          />
        )
      }

      <UserTable
        currentUsers={currentUsers}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        indexOfLastUser={indexOfLastUser}
        dataList={dataList}
      />
      

    </div>
  );
}

export default App;
