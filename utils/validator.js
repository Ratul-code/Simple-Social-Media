module.exports.ValidateRegisterInput = (
  {username,
  email,
  password,
  confirmPassword}
) => {
  const errors = {};
  if (username.trim()==="") {
    errors.username = "Username must not be empty";
  }

  if (email.trim()==="") {
    errors.email = "Email must not be empty";
  } else {
    const regex =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!email.match(regex)) {
      errors.email = "Email must be a valid email address";
    }
  }

  if (password.trim()==="" || confirmPassword.trim()==="") {
    errors.password = "Password must not be empty";
  } else {
    if (password !== confirmPassword) {
      errors.password = "Password should match";
    }
  }
  return {
      errors,
      valid:Object.keys(errors).length<1
  }
};

module.exports.ValidateLoginInput = ({
    username,
    password
})=>{
    const errors = {};
    if (username.trim()==="") {
      errors.username = "Username must not be empty";
    }
    if (password.trim()===""){
        errors.password = "Password must not be empty";
    } 
    return {
        errors,
        valid:Object.keys(errors).length<1
    }
  }
