const formidable = require('formidable');
const validator = require('validator');
const registerModel = require('../models/authModel');
const fs = require('fs');
const bcrypt = require('bcrypt');
const path = require('path');
const { isErrored } = require('stream');
const jwt = require('jsonwebtoken');

module.exports.userRegister = (req, res) => {
  console.log('register is working');

  const form = new formidable.IncomingForm();

  form.parse(req, async (err, fields, files) => {

    const userName = Array.isArray(fields.userName) ? fields.userName[0] : fields.userName;
    const email = Array.isArray(fields.email) ? fields.email[0] : fields.email;
    const password = Array.isArray(fields.password) ? fields.password[0] : fields.password;
    const confirmPassword = Array.isArray(fields.confirmPassword) ? fields.confirmPassword[0] : fields.confirmPassword;

    const { image } = files;
    const error = [];

    if (!userName) {
      error.push('Please provide your user name');
    }
    if (!email) {
      error.push('Please provide your Email');
    }
    if (email && !validator.isEmail(email)) {
      error.push('Please provide your Valid Email');
    }
    if (!password) {
      error.push('Please provide your Password');
    }
    if (!confirmPassword) {
      error.push('Please provide your confirm Password');
    }
    if (password && confirmPassword && password !== confirmPassword) {
      error.push('Your Password and Confirm Password not same');
    }
    if (password && password.length < 6) {
      error.push('Please provide password must be at least 6 characters');
    }
    if (Object.keys(files).length === 0) {
      error.push('Please provide user image');
    }

    if (error.length > 0) {
      return res.status(400).json({
        error: {
          errorMessage: error
        }
      });
    } else {
      if (Array.isArray(image) && image.length > 0) {
        const getImageName = image[0].originalFilename;
        const randomNumber = Math.floor(Math.random() * 1000000);
        const newImageName = randomNumber + getImageName;

        const newPath = path.resolve(__dirname, '../../frontend/public/image', newImageName);

        const tempPath = image[0].filepath;
        const destPath = newPath;
        console.log('Temp file path:', tempPath);
        console.log('Destination path:', destPath);

        if (!fs.existsSync(tempPath)) {
          console.error('Temp file does not exist!');
          return res.status(500).json({
            error: { errorMessage: 'Uploaded file not found on server' }
          });
        }
        const destDir = path.dirname(destPath);
        if (!fs.existsSync(destDir)) {
          fs.mkdirSync(destDir, { recursive: true });
        }

        try {
          const checkUser = await registerModel.findOne({ email: email });
          if (checkUser) {
            return res.status(404).json({
              error: {
                errorMessage: 'User already exists with this email'
              }
            });
          }

          await fs.promises.copyFile(tempPath, destPath);

          const userCreate = await registerModel.create({
            username: userName,
            email,
            password: await bcrypt.hash(password, 10),
            image: newImageName
          });

          const token = jwt.sign({
            id: userCreate._id,
            email: userCreate.email,
            username: userCreate.username,
            image: userCreate.image,
            registerTime: userCreate.createdAt
          }, process.env.SECRET, {
            expiresIn: process.env.TOKEN_EXP
          });

          const options = { expires: new Date(Date.now() + process.env.COOKIE_EXP * 24 * 60 * 60 * 1000) }
          res.status(201).cookie('authToken', token, options).json({
            successMessage: 'User created successfully', token
          });

        } catch (error) {
          console.error('Copy file or DB error:', error);
          return res.status(500).json({
            error: {
              errorMessage: 'Error while uploading image or saving user'
            }
          });
        }
      } else {
        console.log('No image uploaded');
        return res.status(400).json({
          error: { errorMessage: 'No image uploaded' }
        });
      }
    }
  })
}

module.exports.userLogin = async (req, res) => {
  const error = [];
  const { email, password } = req.body;

  if (!email) {
    error.push('Please provide your Email');
  }

  if (!password) {
    error.push('Please provide your Password');
  }
  if (email && !validator.isEmail(email)) {
    error.push('Please provide your valid email');
  }
  if (error.length > 0) {
    res.status(400).json({
      error: {
        errorMessage: error
      }
    })
  } else {

    try {
      const checkUser = await registerModel.findOne({
        email: email
      }).select('+password');
      if (checkUser) {
        const matchPassword = await bcrypt.compare(password, checkUser.password);

        if (matchPassword) {
          const token = jwt.sign({
            id: checkUser._id,
            email: checkUser.email,
            username: checkUser.username,
            image: checkUser.image,
            registerTime: checkUser.createdAt
          }, process.env.SECRET, {
            expiresIn: process.env.TOKEN_EXP
          });

          const options = { expires: new Date(Date.now() + process.env.COOKIE_EXP * 24 * 60 * 60 * 1000) }
          res.status(200).cookie('authToken', token, options).json({
            successMessage: 'Your Login successfully', token
          });

        } else {
          res.status(400).json({
            error: {
              errorMessage: ['Your Password not valid']
            }
          })
        }
      } else {
        res.status(400).json({
          error: {
            errorMessage: ['Your email not found']
          }
        })
      }
    } catch {
      res.status(404).json({
        error: {
          errorMessage: ['Internal server error']
        }
      })
    }
  }
}
  module.exports.userLogout = (req,res) => {
     res.status(200).cookie('authToken', '').json({
          success : true
     })
}
