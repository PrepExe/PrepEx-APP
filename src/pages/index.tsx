import axios from 'axios';
import Router from 'next/router';
import { SyntheticEvent } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const LoginPage = () => {
  const toastMessage = (errorMessage: string) => {
    toast.error(errorMessage, { position: 'top-right', closeOnClick: true });
  };

  const authenticateUser = async (e: SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { email, password } = e.currentTarget;

    const data = {
      email: email.value,
      password: password.value,
    };

    try {
      await axios.post('/api/auth/login', data);
      Router.push('/app');
    } catch (err: any) {
      toastMessage(err.response.data.error);
      console.error('Error during login:', err.response.data.error);
      password.value = '';
    }
  };

  return (
    <div className='flex items-center justify-center min-h-screen'>
      <div className='bg-primary border border-accent py-8 px-6 rounded-lg max-w-md w-full'>
        <h1 className='text-2xl font-bold leading-tight tracking-tight text-center mb-6'>
          Sign in to your account
        </h1>
        <form className='space-y-4' onSubmit={authenticateUser}>
          <div>
            <label htmlFor='email' className='block mb-2 text-sm font-medium'>Email</label>
            <input type='text' name='email' id='email' className='border border-accent rounded-lg block w-full p-2.5 focus:outline-accent placeholder:text-text-secondary bg-primary' placeholder='john.doe@gmail.com' />
          </div>
          <div>
            <label htmlFor='password' className='block mb-2 text-sm font-medium'>Password</label>
            <input type='password' name='password' id='password' placeholder='••••••••' className='border border-accent rounded-lg block w-full p-2.5 focus:outline-accent placeholder:text-text-secondary bg-primary' />
          </div>
          <button className='border border-accent hover:bg-accent font-medium rounded-lg text-sm px-5 py-3 text-center w-full md:w-auto'>Sign in</button>
          <p className='text-sm font-light text-text-secondary text-center'>
            Don&apos;t have an account yet? <a href='register' className='font-medium text-text hover:underline'>Sign up</a>
          </p>
        </form>
      </div>
      <ToastContainer position='top-right' />
    </div>
  );
};

export default LoginPage;
