import React from 'react';
import {useState, useEffect} from 'react';
import "../App.css";
import {MdClose} from 'react-icons/md';
import { UserData } from '../types/UserData';

const NewUserForm: React.FC<{
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSelectChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  handleClose: () => void;
  handleEditSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  editUserData: UserData | null;

}> = ({ handleSubmit, handleInputChange, handleSelectChange, handleClose, editUserData, handleEditSubmit }) => {
  
  
  return(
      <div className='addContainer'>
        <form onSubmit={editUserData ? handleEditSubmit : handleSubmit}>
          <div className='close-btn' onClick={handleClose}><MdClose/></div>
          <div className='form-group'>
          <label htmlFor="firstName">First name: </label>
          <input type='text' className='form-control' id='first-name' name='firstName' defaultValue={editUserData?.firstName}  onChange={handleInputChange} required/>
          </div>
          
          <div className='form-group'>
          <label htmlFor="lastName">Last name: </label>
          <input type='text' className='form-control' id='last-name' name='lastName' defaultValue={editUserData?.lastName} onChange={handleInputChange} required/>
          </div>

          <div className='form-group'>
          <label htmlFor="email">Email: </label>
          <input type='email' className='form-control' id='email' name='email' defaultValue={editUserData?.email} onChange={handleInputChange} required/>
          </div>

          <div className='form-group'>
          <label htmlFor="phoneNumberType">Phone number type: </label>
          <select className='form-control' id='phone-number-type' name='phoneNumbers.type' defaultValue={editUserData?.phoneNumbers[0].type} onChange={handleSelectChange} required>
            <option disabled hidden>Choose here</option>
            <option value='primary' >Primary</option>
            <option value='secondary'>Secondary</option>
          </select>

          <label htmlFor="phoneNumber">Phone number: </label>
          <input type='text' className='form-control' id='phone-number' name='phoneNumbers.value' defaultValue={editUserData?.phoneNumbers[0].value} onChange={handleInputChange} required/>
          </div>

          <div className='form-group'>
          <button type='submit' className='btn btn-success submit-button form-control'>{editUserData ? "Edit" : "Submit"}</button>
          </div>
          
        </form>
      </div>
  )
}

export default NewUserForm