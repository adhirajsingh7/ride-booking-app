interface IUserProfile {
  _id?: string;
  avatar?: string;
  username: string;
  email: string;
  password: string;
  full_name: string;
  created_at?: string;
  updated_at?: string;
}

interface ILoginForm {
  email: string;
  password: string;
}

interface FormInputProps {
  name: string;
  control: any;
  label: string;
  type?: string;
  setValue?: any;
  options?: any;
  error?: any;
}
