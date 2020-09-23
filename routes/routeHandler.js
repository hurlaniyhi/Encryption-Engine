const express = require('express')
const router = express.Router()
const JsEncrypt = require('node-jsencrypt')
const encrypt = new JsEncrypt()



let key = ['MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQC6YUz0ZI18Q+8EXsrQ6WlxmsnnjD0bdymm2vtRDCWW0uPmcTgG0o8CnLiVmEO0HLaBO/ZSDbtEC6OJw8+wKvWnLMUZfzqeM/XGqzeB9ZO1QZuItKVb1XhjVQ9vPxJYKPyUjDHB6Kc8a9wrrj31R4RNbHC6Ydxf2pLErmm5WGfE1QIDAQAB',
'MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCDsqtEycw1yCVgACX+DtyP8GtVlEwti/A0c9wl9LtpPojGcFp0CBP97ne4JKYP5qggRxiH6jlZx6lGIGHHtM0aHh3R4+B2HsAeESSYBPCw73zIvzgU9YYhgVmYuOsa19K1Cdk6OA/6IOsTRXgrwzssLjGeekutwd2YYrVEi+q/4wIDAQAB','MIGeMA0GCSqGSIb3DQEBAQUAA4GMADCBiAKBgGPawrzvP06Cj2vb9oZdocs4jlOb08imX+2bZpRnMp72sCJHT/0nGMng0X5kX7mXj+79KKqXzL0WIPRRzzSSZG4R4Blhk9pHQkhBuo0OKt+EeHJy8hv2Z7DAn7qLcEBg/NM//nT0JQMzhCBs0MAubTpUWy0WdGEyV0B4vGb0LqP9AgMBAAE=']


router.get('/',(req,res)=>{
    res.render("display/ux")
})

router.post('/',(req,res)=>{  
   
    console.log(req.body)
    // console.log(req.body.inputData)
    
    // var encrypted = cryptr.encrypt(req.body.inputData)
    // console.log(encrypted)
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