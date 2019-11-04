const mongoose=require('mongoose')
const validator=require('validator')
const employeeModel = mongoose.model('employeeModel',{
    Employee_Name: {
        type:String,
        require:true,
        unique:true
    },
    Contact: { 
        type: Number,
        require:true,
        minlength:10,
        maxlenght:10
    },
    Experience:{
        type:String,
        require:true
    },
    Employee_Role:{
        type:String,
        require:true
    },
    Company_Name: {
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true,
        unique:true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('Email is invalid')
            }
        }
    }
})
module.exports = employeeModel