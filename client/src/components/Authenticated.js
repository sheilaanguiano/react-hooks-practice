import React, { useContext } from 'react';
import Context from '../Context';

/* the useContext hook takes the context object as an argument and returns the current context  */


export default () => {
  let context = useContext(Context.Context);
  const authUser = context.authenticatedUser;
  return (
  <div className="bounds">
    <div className="grid-100">
      <h1>{authUser.name} is authenticated!</h1>
      <p>Your username is {authUser.username}.</p>
    </div>
  </div>
  );
}