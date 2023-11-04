import 'bootstrap/dist/css/bootstrap.css';
import './App.css';
import {MdClose} from 'react-icons/md'

function App() {
  return (
    <div className='container'>
      <button type='button' className='btn btn-info'>+</button>

      <div className='addContainer'>
        <form>
          <div className='close-btn'><MdClose/></div>
          <div className='form-group'>
          <label htmlFor="firstName">First name: </label>
          <input type='text' className='form-control' id='first-name' name='firstName'/>
          </div>
          
          <div className='form-group'>
          <label htmlFor="lastName">Last name: </label>
          <input type='text' className='form-control' id='last-name' name='lastName'/>
          </div>

          <div className='form-group'>
          <label htmlFor="email">email: </label>
          <input type='email' className='form-control' id='email' name='email'/>
          </div>

          <div className='form-group'>
          <label htmlFor="phoneNumberType">Phone number type: </label>
          <select className='form-control' id='phone-number-type' name='phoneNumberType'>
            <option value='primary'>Primary</option>
            <option value='secondary'>Secondary</option>
          </select>

          <label htmlFor="phoneNumber">Phone number: </label>
          <input type='text' className='form-control' id='phone-number' name='phoneNumber'/>
          </div>

          <div className='form-group'>
          <button type='submit' className='btn btn-success submit-button form-control'>Submit</button>
          </div>
          
        </form>
      </div>

    </div>
  );
}

export default App;
