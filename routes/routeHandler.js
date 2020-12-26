const express = require('express')
const router = express.Router()
const JsEncrypt = require('node-jsencrypt')
const encrypt = new JsEncrypt()
const {key1, key2, key3} = require('../config')



let key = [key1, key2, key3]

router.get('/',(req,res)=>{
    res.render("display/ux")
})

router.post('/',(req,res)=>{  
   
    console.log(req.body)

  if (req.body.inputData.includes("{" && "}" && ":") ){
     
  
     let convertedToArray = req.body.dontEncrypt.replace(/ /g, "")
     convertedToArray = convertedToArray.split(",")
   
     let convertedToObject = JSON.parse(req.body.inputData)
     console.log(convertedToObject)

    for(let eachkey in convertedToObject){

        let dontEncryptMe = convertedToArray.find((check)=> check == eachkey)

        if (dontEncryptMe){
            
            convertedToObject[eachkey] = convertedToObject[eachkey]
        }
        else{
            if (req.body.channel == "TC_APIC_Live"){
                encrypt.setPublicKey(key[0])
                var encrypted = encrypt.encrypt(convertedToObject[eachkey])
                
                convertedToObject[eachkey] = encrypted
                
            
                }
            else if (req.body.channel == "TC_APIC_Test"){
                encrypt.setPublicKey(key[1])
                var encrypted = encrypt.encrypt(convertedToObject[eachkey])
                   
                convertedToObject[eachkey] = encrypted
                    
                
                    }
            else if (req.body.channel == "S-Wallet"){
                    encrypt.setPublicKey(key[2])
                    var encrypted = encrypt.encrypt(convertedToObject[eachkey])
                        
                    convertedToObject[eachkey] = encrypted
                       
                    
                        }
             
        }
    }
      
    
    if (req.body.channel !== "select" && req.body.channel !== "others"){
          encrypted =JSON.stringify(convertedToObject)
      }
      else{
          encrypted = "Select a Valid Channel"
          console.log(encrypted)
      }
          console.log(`response sent ${encrypted}`)
          res.render("display/ux",{  
            theEncrypted: encrypted,
            theInput: req.body.inputData
        })
  }
     
  else{
        if (req.body.channel == "TC_APIC_Live"){
            encrypt.setPublicKey(key[0])
            var encrypted = encrypt.encrypt(req.body.inputData)
            console.log(encrypted)
            
            
            res.render("display/ux",{
                theEncrypted: encrypted,
                theInput: req.body.inputData
            })
        
            }
            else if (req.body.channel == "TC_APIC_Test"){
                encrypt.setPublicKey(key[1])
                var encrypted = encrypt.encrypt(req.body.inputData)
                console.log(encrypted)
                
                
                res.render("display/ux",{
                    theEncrypted: encrypted,
                    theInput: req.body.inputData
                })
            
                }
                else if (req.body.channel == "S-Wallet"){
                    encrypt.setPublicKey(key[2])
                    var encrypted = encrypt.encrypt(req.body.inputData)
                    console.log(encrypted)
                    
                    
                    res.render("display/ux",{
                        theEncrypted: encrypted,
                        theInput: req.body.inputData
                    })
                
                    }
             else{
                res.render("display/ux", {
                    theEncrypted: "Select a Valid Channel",
                    theInput: req.body.inputData
                })
            }  
          
     }
})

module.exports = router;