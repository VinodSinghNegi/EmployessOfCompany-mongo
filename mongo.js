const mongo=require('mongodb')
const express=require('express')
const ObjectID=require('mongodb').ObjectID
const mongoose=require('mongoose')
const app=express()

const db_url="mongodb://127.0.0.1:27017/MyDatabase"

const companyDB=require('./models/company')
const employeeDB=require('./models/employees')

app.use(express.json())
app.use(express.urlencoded({extended:true}))

mongoose.connect(db_url,{
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true})


    app.post('/company',(req,res)=>{
        const company=new companyDB(req.body)
        
        company.save().then(()=>{
            res.send(company)
        }).catch((error)=>{
            res.send(error)
        })
       
    })

    app.post('/employee',(req,res)=>{
        const employee=new employeeDB(req.body)
        employee.save().then(()=>{
            res.send(employee)
        }).catch((error)=>{
            res.send(error)
        })
    })

    app.get('/employee',(req,res)=>{
        employeeDB.find({}).then((employeeList)=>{
            res.send(employeeList)
        }).catch((error)=>{
            res.send(error)
        })
    })

    app.get('/company',(req,res)=>{                     
        companyDB.find({}).then((companyList)=>{
            res.send(companyList)
        }).catch((error)=>{
            res.send(error)
        })
    })

    app.get('/company/:c_id',(req,res)=>{
        companyDB.find({_id:new ObjectID(req.params.c_id)}).then((companyDetails)=>{
            employeeDB.find({Company_Name:companyDetails[0].Company_Name}).then((allDetails)=>{
                res.send([companyDetails,allDetails])
            }).catch((error)=>{
                res.send(error)
            
        }).catch((error)=>{
            res.send(error)
        })
    })
})


app.listen(8088,()=>{
    console.log('Server Started at localhost:8088')
})
