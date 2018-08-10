const validateForm = (email, password, type) => {
  const regularExpressionEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  if (email === '') {
    // alert("name field must be field");
    return 'Empty Email';
  } else {
    if (!regularExpressionEmail.test(String(email).toLowerCase())) {
      // alert('not valid email');
      return 'Not valid email';
    }
  }
  if (password === '') {
    return 'Empty Password';
  } else if (password.length < 4 && type === 'signup') {
    // alert('password must be atleast lenght of 4');
    return 'Password must be atleast lenght of 4';
  }

  return 'Valid';
};

export default validateForm;
