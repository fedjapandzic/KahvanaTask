export interface UserData {
    email: string;
    firstName?: string;
    lastName?: string;
    phoneNumbers: { type: string; value: string }[];
}