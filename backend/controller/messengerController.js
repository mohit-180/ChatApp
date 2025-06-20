const User = require('../models/authModel');
const messageModel = require('../models/messageModel');
const formidable = require('formidable');
const fs = require('fs');


const getLastMessage = async(myId, fdId) => {
     const msg = await messageModel.findOne({
          $or: [{
               $and: [{
                    senderId : {
                        $eq: myId
                    }
               },{
                    reseverId : {
                        $eq : fdId 
                    }
               }]
          }, {
               $and : [{
                    senderId : {
                         $eq : fdId
                    } 
               },{
                    reseverId : {
                         $eq : myId
                    }
               }]
          }]

     }).sort({
          updatedAt : -1
     });
     return msg;
}

module.exports.getFriends = async (req, res) => {
     const myId = req.myId;
     let fnd_msg = [];
     try{
           const friendGet = await User.find({
               _id: {
                   $ne: myId
               }
          });
           for (let i = 0; i < friendGet.length; i++ ){
               let lmsg = await getLastMessage(myId,friendGet[i].id);
               fnd_msg = [...fnd_msg, {
                    fndInfo : friendGet[i],
                    msgInfo : lmsg
               }]
              
          }

          // const filter = friendGet.filter(d=>d.id !== myId );
          res.status(200).json({success:true, friends : fnd_msg})

     }catch (error) {
          res.status(500).json({
               error: {
                    errorMessage :'Internal Sever Error'
               }
          })
     } 
}

module.exports.messageUploadDB = async (req, res) =>{

     const {
          senderName,
          reseverId,
          message
     } = req.body
     const senderId = req.myId;

     try{
          const insertMessage = await messageModel.create({
               senderId : senderId,
               senderName : senderName,
               reseverId : reseverId,
               message : {
                    text: message,
                    image : ''
               }
          })
          res.status(201).json({
               success : true,
               message: insertMessage
          })

     }catch (error){
          res.status(500).json({
               error: {
                    errorMessage : 'Internal Sever Error'
               }
          })
     }

     
}
module.exports.messageGet = async(req,res) => {
     const myId = req.myId;
     const fdId = req.params.id;

     try{
          let getAllMessage = await messageModel.find({
                $or: [{
                    $and: [{
                         senderId : {
                             $eq: myId
                         }
                    },{
                         reseverId : {
                             $eq : fdId 
                         }
                    }]
               }, {
                    $and : [{
                         senderId : {
                              $eq : fdId
                         } 
                    },{
                         reseverId : {
                              $eq : myId
                         }
                    }]
               }]
          })
          
         // getAllMessage = getAllMessage.filter(m=>m.senderId === myId && m.reseverId === fdId || m.reseverId ===  myId && m.senderId === fdId );
          
          res.status(200).json({
               success: true,
               message: getAllMessage
          })

     }catch (error){
          res.status(500).json({
               error: {
                    errorMessage : 'Internal Server error'
               }
          })

     }
    }
 
    

module.exports.ImageMessageSend = (req, res) => {
    const senderId = req.myId;
    const form = new formidable.IncomingForm();

    form.parse(req, async (err, fields, files) => {
        console.log('FIELDS:', fields);
        console.log('FILES:', files);

        const {
            senderName,
            reseverId,
            imageName
        } = fields;

        // Fix: Use the first file in the array
        const imageFile = files.image && Array.isArray(files.image) ? files.image[0] : files.image;

        if (!imageFile || !imageFile.filepath) {
            return res.status(400).json({
                error: {
                    errorMessage: 'No image file uploaded'
                }
            });
        }

        const path = require('path');
        const newPath = path.resolve(__dirname, '../../frontend/public/image/', Array.isArray(imageName) ? imageName[0] : imageName);

        try {
            fs.copyFile(imageFile.filepath, newPath, async (err) => {
                if (err) {
                    res.status(500).json({
                        error: {
                            errorMessage: 'Image upload fail'
                        }
                    });
                } else {
                    const insertMessage = await messageModel.create({
                        senderId: req.myId,
                        senderName: Array.isArray(senderName) ? senderName[0] : senderName,
                        reseverId: Array.isArray(reseverId) ? reseverId[0] : reseverId,
                        message: {
                            text: '',
                            image: Array.isArray(imageName) ? imageName[0] : imageName
                        }
                    });
                    res.status(201).json({
                        success: true,
                        message: insertMessage
                    });
                }
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({
                error: {
                    errorMessage: 'Internal Sever Error'
                }
            });
        }
    });
}