import { User } from '../interfaces/User';
import { UserData } from '../interfaces/UserData';

const userPhoneNumberData = [
  {
    "email": "marina@kahvana.com",
    "phoneNumbers": [{
      type: "primary",
      value: "202-555-0105",
    }]
  },

  {
    "email": "kip@kahvana.com",
    "phoneNumbers": [{
      type: "primary",
      value: "202-555-0168",
    }]
  },

  {
    "email": "lorie@kahvana.com",
    "phoneNumbers": [{
      type: "primary",
      value: "202-555-0162",
    }]
  },

  {
    "email": "jasmin@kahvana.com",
    "phoneNumbers": [{
      type: "primary",
      value: "202-555-0168",
    }]
  },

  {
    "email": "emma@kahvana.com",
    "phoneNumbers": [{
      type: "primary", value: "202-555-0187",
    }]
  },

  {
    "email": "elvia@kahvana.com",
    "phoneNumbers": [{
      type: "primary",
      value: "202-555-0164",
    }]
  },

  {
    "email": "liliana@kahvana.com",
    "phoneNumbers": [{
      type: "primary", value: "202-555-0161",
    }]
  },

  {
    "email": "florencio@kahvana.com",
    "phoneNumbers": [{
      type: "primary", value: "202-555-0127",
    }]
  },

  {
    "email": "delores@kahvana.com",
    "phoneNumbers": [{
      type: "primary",
      value: "202-555-0143",
    }]
  }
]

const userEmailsData = [
  {
    "email": "delores@kahvana.com",
    "firstName": "Delores",
    "lastName": "Mind"
  },
  {
    "email": "lorie@kahvana.com",
    "firstName": "Lorie",
    "lastName": "Enak"
  },
  {
    "email": "emma@kahvana.com",
    "firstName": "Emma",
    "lastName": "Fisk"
  }]


const userData = userPhoneNumberData.map((phoneNumberUser) => {
  const matchingEmailUser = userEmailsData.find((emailUser) => emailUser.email === phoneNumberUser.email);

  if (matchingEmailUser) {
    return {
      ...matchingEmailUser,
      phoneNumbers: phoneNumberUser.phoneNumbers,
    };
  }

  return phoneNumberUser;
});



const users: User[] = createUserArray(userData);

export default users;




function createUserArray(userData: UserData[]): User[] {
  const userArray: User[] = [];

  userData.forEach((data, index) => {
    const user: User = {
      _id: String(index + 1),
      firstName: data.firstName || 'undefined',
      lastName: data.lastName || 'undefined',
      email: data.email,
      phoneNumbers: data.phoneNumbers || [],
    };

    userArray.push(user);
  });

  return userArray;
}