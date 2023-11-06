export interface UserData {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
    phoneNumbers: {
      type: string;
      value: string;
    }[];
  }