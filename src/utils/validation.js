const emailvalidate=(email)=>{
    if(!email.match(/^[a-zA-Z0-9.!#$%&’+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)$/)) return false;
    return true;
}

const passwordValidate=(password)=>{
    if(!password.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/)) return false;
    return true;
}


module.exports={
    emailvalidate,
    passwordValidate,
}