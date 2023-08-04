import React, { useState } from 'react'


function SignUp() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    function handleSubmit(e){
        e.preventDefault();
        console.log('Username: ', username);
        console.log('Password: ', password);
    }
  return (
    <form onSubmit={handleSubmit}>
        <h2>Sign Up</h2>
        <input
        type = "text"
        />

    </form>
  )
}

export default SignUp