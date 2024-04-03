import axios from 'axios';
import Router from 'next/router';
import Link from 'next/link';
import { SyntheticEvent } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 

const RegisterPage = () => {
  const toastMessage = (errorMessage: string) => {
    toast.error(errorMessage, { position: 'top-right', closeOnClick: true });
  };
  
  const registerUser = async (e: SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { uname, email, password, cpassword } = e.currentTarget;

    const data = {
      name: uname.value,
      email: email.value,
      password: password.value,
      cpassword: cpassword.value,
    };

    try {
      await axios.post('/api/auth/register', data);
      Router.push('/app');
    } catch (err: any) {
      toastMessage(err.response.data.error);
      console.error('Error during register:', err.response.data.error);
      password.value = '';
      cpassword.value = '';
    }
  };

  return (
    <div className='flex items-center justify-center min-h-screen'>
      <div className='bg-primary border border-accent py-8 px-6 rounded-lg max-w-md w-full'>
        <h1 className='text-2xl font-bold leading-tight tracking-tight text-center mb-6'>
          Create an account
        </h1>
        <form className='space-y-4' onSubmit={registerUser}>
          <div>
            <label htmlFor='uname' className='block mb-2 text-sm font-medium'>Name</label>
            <input type='text' name='uname' id='uname' className='border border-accent rounded-lg block w-full p-2.5 focus:outline-accent placeholder:text-text-secondary bg-primary' placeholder='John Doe' />
          </div>
          <div>
            <label htmlFor='email' className='block mb-2 text-sm font-medium'>Email</label>
            <input type='text' name='email' id='email' className='border border-accent rounded-lg block w-full p-2.5 focus:outline-accent placeholder:text-text-secondary bg-primary' placeholder='john.doe@gmail.com' />
          </div>
          <div className='flex flex-col md:flex-row md:space-x-4'>
            <div className='w-full md:w-1/2'>
              <label htmlFor='password' className='block mb-2 text-sm font-medium'>Password</label>
              <input type='password' name='password' id='password' placeholder='••••••••' className='border border-accent rounded-lg block w-full p-2.5 focus:outline-accent placeholder:text-text-secondary bg-primary' />
            </div>
            <div className='w-full md:w-1/2'>
              <label htmlFor='cpassword' className='block mb-2 text-sm font-medium'>Confirm password</label>
              <input type='password' name='cpassword' id='cpassword' placeholder='••••••••' className='border border-accent rounded-lg block w-full p-2.5 focus:outline-accent placeholder:text-text-secondary bg-primary' />
            </div>
          </div>
          <button type='submit' className='border border-accent hover:bg-accent font-medium rounded-lg text-sm px-5 py-3 text-center w-full'>Sign up</button>
          <p className='text-sm font-light text-text-secondary text-center'>
            Already have an account? <Link href='/'>Sign in</Link>
          </p>
        </form>
      </div >
      <ToastContainer position="top-right" /> 
    </div >
  );
};

export default RegisterPage;
