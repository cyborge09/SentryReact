const validateForm = (email, password, type) => {
  const regularExpressionEmail = /^(([^<>(\]\\.,;:\s@"]+(\.[^<>()\]\\.,;:\s@"]+)*)|(".+"))@(([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  // const regularExpressionEmail = /^(([^<>(\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  if (email === '') {
    return false;
  } else {
    if (!regularExpressionEmail.test(String(email).toLowerCase())) {
      return false;
    }
  }
  if (password === '') {
    return false;
  } else if (password.length < 4 && type === 'signUp') {
    return false;
  }

  return true;
};
export default validateForm;
