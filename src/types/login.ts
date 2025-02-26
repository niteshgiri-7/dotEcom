export interface IloginForm {
 email:string;
 password:string;
}

export interface ISignUpFormValues {
    name: string;
    email: string;
    password: string;
    dob: string;
    photo: File | string;
    gender: 'male' | 'female' | 'other';
  }

interface User extends ISignUpFormValues{
  role:"admin"|"user"
}

  export interface ILoginResponse{
    success:true;
    message:string;
    user:User
  }