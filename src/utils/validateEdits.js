
const validateEdits = (req)=>{
    const isEdit = ["firstName","photoUrl","about","age","gender"];
    const isAllowed = Object.keys(req.body).every((key)=>isEdit.includes(key));
    if(!isAllowed){
        throw new Error("Edits Fields Invalid");
    }
    if(req.body.firstName.length<=2||req.body.firstName.length>30){
        throw new Error("name is invalid");
    }

     if(req.body.age<16||req.body.age>70){
        throw new Error("age should be greater than 16 and also smaller than 70");
    }
    if(req.body.gender){
     if(req.body.gender!=='male'||req.body.gender!=='female'||req.body.gender!=='other'){
        throw new Error("gender");
    }
}

}

module.exports = validateEdits;