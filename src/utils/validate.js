const validator = require('validator');

const validate = (data)=>{
    const mandatoryField = ["firstName","emailId","password"];
    const isAllowed = mandatoryField.every((k)=>Object.keys(data).includes(k));

     if(data.firstName.length<=2||data.firstName.length>30){
        throw new Error("name is invalid");
    }
    if(!isAllowed)
        throw new Error('Fill The Mandatory Field');

    if(!validator.isEmail(data.emailId))
        throw new Error('Please Fill The Valid Email');

    if(!validator.isStrongPassword(data.password))
        throw new Error('Please fill the strong password');
}

module.exports = validate;