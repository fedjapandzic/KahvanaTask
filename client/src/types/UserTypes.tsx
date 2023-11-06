export interface UserTypes {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
    phoneNumbers: {
      type: string;
      value: string;
    }[];
  }