import React, { useState, useContext } from 'react';
import Context from '../Context';
import { Link, useHistory } from 'react-router-dom';
import Form from './Form';

export default function UserSignUp() {
  //Instance of history to get the value returned from a call to the useHistory hook
  const context = useContext(Context.Context);
  let history = useHistory();

  const [name, setName] = useState('');
  const [username, setUser] = useState('');
  const [password, setPass] = useState('');
  const [errors, setErrors] = useState([]);


  const change = (event) => {
    const value = event.target.value;
    switch (event.target.name) {
      case "name":
        setName(value);
        break;
      case "username":
        setUser(value);
        break;
      case "password":
        setPass(value);
        break;
      default:
        return;
    }
  }

  const submit = () => {

    
    // Create user
    const user = {
      name,
      username,
      password,
    };

    context.data.createUser(user)
      .then( errors => {
        if (errors.length) {
          setErrors(errors);
        } else {
          context.actions.signIn(username, password)
            .then(() => {
              history.push('/authenticated');    
            });
        }
      })
      .catch((err) => {
        console.log(err);
        history.push('/error');
      });
  
  }

  const  cancel = () => {
    history.push('/');
  }

    return (
      <div className="bounds">
        <div className="grid-33 centered signin">
          <h1>Sign Up</h1>
          <Form 
            cancel={cancel}
            errors={errors}
            submit={submit}
            submitButtonText="Sign Up"
            elements={() => (
              <React.Fragment>
                <input 
                  id="name" 
                  name="name" 
                  type="text"
                  value={name} 
                  onChange={change} 
                  placeholder="Name" />
                <input 
                  id="username" 
                  name="username" 
                  type="text"
                  value={username} 
                  onChange={change} 
                  placeholder="User Name" />
                <input 
                  id="password" 
                  name="password"
                  type="password"
                  value={password} 
                  onChange={change} 
                  placeholder="Password" />
              </React.Fragment>
            )} />
          <p>
            Already have a user account? <Link to="/signin">Click here</Link> to sign in!
          </p>
        </div>
      </div>
    );
}
