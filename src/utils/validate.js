const validator = require('validator');

const validate = (data)=>{
    const mandatoryField = ["firstName","emailId","password","age"];
    const isAllowed = mandatoryField.every((k)=>Object.keys(data).includes(k));

    if(!isAllowed)
        throw new Error('Fill The Mandatory Field');

    if(!validator.isEmail(data.emailId))
        throw new Error('Please Fill The Valid Email');

    if(!validator.isStrongPassword(data.password))
        throw new Error('Please fill the strong password');
}

module.exports = validate;