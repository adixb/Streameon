import React from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SignupToast = () => {
  const notify = () => {
    toast.success("Signup successful!"); // Display success toast
  };

  return (
    <div>
      <button onClick={notify}>Notify!</button>
    </div>
  );
};

export default SignupToast;
