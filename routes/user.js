const express = require ('express');
const router = express.Router();
const User = require ('../models/User');
const bcryptjs = require ('bcryptjs');
const { model } = require('mongoose');
const user_jwt = require ('../middleware/user_jwt');
const jwt = require('jsonwebtoken');
const { findById, findOne, find } = require('../models/User');

router.get('/', user_jwt , async(req, res, next) => {
   try {

      const user = await User.findById(req.user.id).select('-password');
      res.status(200).json({
         success: true,
         user: user
      });
   }catch (error){
      console.log(error.messege);
      res.status(500).json({
         success: false,
         msg: 'Server Error'
      })
      next();
   }
})

router.post('/register', async (req, res, next) => {
   const {usertype ,username, mobile, password, gender, bmdcNo, department, degree, medical, visit, age} = req.body;

   try {

      let user_exist = await User.findOne({mobile : mobile});
      //let user_patient = await User.find({usertype:"Patient"});
      //let user_doctor = await User.find({usertype:"Doctor"});
      if (user_exist){
         return res.json({
            success: false,
            msg: 'User already exists'
         });
      }

      let user = new User();

      if(usertype == "Patient"){

         user.usertype = usertype;   
         user.username = username;
         user.mobile = mobile;
   
         const salt = await bcryptjs.genSalt(10) ;
         user.password = await bcryptjs.hash(password, salt);
   
         user.gender = gender;
         user.age = age;
         await user.save();
      }

      else if (usertype == "Doctor"){
         
      user.usertype = usertype;   
      user.username = username;
      user.mobile = mobile;

      const salt = await bcryptjs.genSalt(10) ;
      user.password = await bcryptjs.hash(password, salt);

      user.gender = gender;
      user.bmdcNo = bmdcNo;
      user.department = department;
      user.degree = degree;
      user.medical = medical;
      user.visit = visit;

      await user.save();

      }

      const payload = {
         user: {
            id: user.id
         } 
      }

      jwt.sign(payload, process.env.jwtUserSecret, {
         expiresIn: 360000   
      }, (err, token)=> {
         if(err) throw err;
         res.status(200).json({
            success: true,
            token: token
         });
      });

   } catch(err){
      console.log(err);
   }
});

router.post('/login', async (req, res, next) => {

   const usertype = req.body.usertype;
   const mobile = req.body.mobile;
   const password = req.body.password;

   try {

      let user = await User.findOne({
         usertype:usertype, mobile: mobile, 
      });

   
      if(!user) {
         return res.status(400).json({
            success: false,
            msg: 'User not exist ! '
         });
      }

      const isMatch = await bcryptjs.compare(password, user.password);

      if(!isMatch) {
         return res.status(400).json({
            success: false,
            msg: 'Invalid password'
         });
      }

      const payload = {
         user: {
            id: user.id
         } 
      }

      jwt.sign(payload, process.env.jwtUserSecret, {
         expiresIn: 360000   
      }, (err, token)=> {
         if(err) throw err;
         res.status(200).json({
            success: true,
            msg: 'User logged in',
            token: token,
            user: user,
            usertype: usertype          
           
         });
      });

   } catch(error) {
      console.log(error.messege);
      res.status(500).json({
         success: false,
         msg: 'Server Error'
      });
   }

});

module.exports = router;