const mongoose=require('mongoose')

const companyModel = mongoose.model('companyModel',{
    Company_Name: {
        type:String,
        require:true,
        unique:true
        
    },
    About: { 
        type: String,
        require:true,
        unique:true
    },
    Location:{
        type:String,
        require:true,
        unique:true
    }
  })

module.exports = companyModel