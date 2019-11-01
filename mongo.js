const mongo=require('mongodb')
const express=require('express')
const ObjectID=require('mongodb').ObjectID
const app=express()
const db_url="mongodb://127.0.0.1:27017"

let cid
app.use(express.json())

mongo.connect(db_url,{useUnifiedTopology:true},(err,client)=>{
    if (err) throw err

    const CRUD_OPERATING_DB=client.db('CRUD_OPERATING_DB')
    const companyNames=CRUD_OPERATING_DB.collection('companyNames')
    const employees=CRUD_OPERATING_DB.collection('employees')

//CREATING COMPANY DATABASE

    companyNames.insertMany([
        {Company_Name:'Vinove',
         About:'I.T service company',
         Location:'Noida'
        },
        {Company_Name:'Value Coders',
         About:'I.T service company',
         Location:'Gurugram'
        },
        {Company_Name:'Pixel Crayon',
         About:'I.T service company',
         Location:'Delhi'
        }
    ],(err,result)=>{
        if(err) throw err
        
        console.log('Company Values Inserted Succesfully')
    })


//CREATING EMPLOYEES DATABASE
    
    // function findv (value){
    //     companyNames.find({Company_Name:value}, {_id:1}).toArray((err, result)=>{
    //         console.log(result[0]._id)
    //         cid=(result[0]._id)
    //         console.log(cid)
    //         return cid
    //     })
    // }
    employees.insertMany([
        {Employee_Name:'Milan',
         Contact:'9876543210',
         Experience:'Fresher',
         Employee_Role:'Software Developer',
         Company_Name:'Vinove',
        //   C_id: findv('Vinove')
        },
        {Employee_Name:'Rahul',
         Contact:'9876543210',
         Experience:'Fresher',
         Employee_Role:'Software Developer',
         Company_Name:'Value Coders'
        },
        {Employee_Name:'Mohit',
         Contact:'9876543210',
         Experience:'Fresher',
         Employee_Role:'Software Developer',
         Company_Name:'Pixel Crayon'
        },
        {Employee_Name:'Vinod',
         Contact:'9876543210',
         Experience:'Fresher',
         Employee_Role:'Software Developer',
         Company_Name:'Vinove'
        },
        {Employee_Name:'Paramjeet',
         Contact:'9876543210',
         Experience:'Fresher',
         Employee_Role:'Software Developer',
         Company_Name:'Value Coders'
        },
        {Employee_Name:'Hanifa',
         Contact:'9876543210',
         Experience:'Fresher',
         Employee_Role:'Software Developer',
         Company_Name:'Pixel Crayon'
        },
        
    ], (err,result)=>{
        if(err) throw err

        console.log('Employees Values Inserted Succesfully')
    })

    


    app.get('/company',(req,res)=>{                     //  REQUEST ON '/company' Url
        companyNames.find({}).toArray((error,user)=>{
            if(error) throw error

            res.send(user)
        })
        
        
    })

    app.get('/employees',(req,res)=>{                   //  REQUEST ON '/employees' Url
        employees.find({}).toArray((error,user)=>{
            if(error) throw error

            res.send(user)
        })
    })

    app.get('/company/:c_id',(req,res)=>{                  //  REQUEST ON '/company/id' Url

        companyNames.find({
            _id:new ObjectID(req.params.c_id)}).toArray((error,user)=>{
            if(error) throw error
        
        employees.find({Company_Name:user[0].Company_Name}).toArray((err,result)=>{
            if(err) throw err
            res.send([user,result])

        })

            
        })
    })

    app.get('/employees/:e_id',(req,res)=>{                 //  REQUEST ON '/employee/id' Url

        employees.find({
            _id:new ObjectID(req.params.e_id)}).toArray((error,user)=>{
                if(error) throw error

                res.send(user)
            })
        })
    })


app.listen(8080,()=>{
    console.log('Server Started at localhost:8080')
})
