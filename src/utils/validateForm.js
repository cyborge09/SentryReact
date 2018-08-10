const validateForm = (email, password, type) => {
  const regularExpressionEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  if (email === '') {
    document.getElementById('email-error').innerHTML = 'email is empty';
    return 'Empty Email';
  } else {
    if (!regularExpressionEmail.test(String(email).toLowerCase())) {
      document.getElementById('email-error').innerHTML = 'not a valid email';
      return 'Not valid email';
    }
  }
  if (password === '') {
    document.getElementById('email-pass').innerHTML = 'password is empty';
    return 'Empty Password';
  } else if (password.length < 4 && type === 'signup') {
    document.getElementById('email-pass').innerHTML =
      'password lenght at least 4';
    return 'Password must be atleast lenght of 4';
  }

  return 'Valid';
};
export default validateForm;
