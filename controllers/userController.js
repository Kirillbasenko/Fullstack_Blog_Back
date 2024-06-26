import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

import UserModel from "../models/User.js"

const generateJwt = (_id) => {
   return jwt.sign(
      {_id: _id},
      "random_secret_key123",
      {expiresIn: '365d'}
   )
}

export const registration = async (req, res) => {
   try {
      const {email, role, name} = req.body

      if(!email || !req.body.password) {
         return res.status(404).json({message: "Некоректні дані"})
      }

      const candidate = await UserModel.findOne({email: email})
      if(candidate){
         return res.status(404).json({message: "Користувач із таким email вже існує"})
      }

      const salt = await bcrypt.genSalt(10)
      const hash = await bcrypt.hash(req.body.password, salt)

      const doc = new UserModel({
         email,
         name,
         password: hash,
         role
      });

      const user = await doc.save()

      const token = generateJwt(user._id)

      const {password, ...userData} = user._doc

      res.json({
         ...userData,
         token
      });
   } catch (err) {
      console.log(err);
      res.status(500).json({
         message: 'Помилка',
      });
   }
};

export const login = async (req, res) => {
   try {
      const {email} = req.body
      const user = await UserModel.findOne({email: email})

      if(!user){
         return res.status(404).json({message: "Користувач не знайде"})
      }
      const comparePassword = bcrypt.compare(req.body.password, user._doc.password)
      if(!comparePassword){
         return res.status(404).json({message: "Невірний логін або пароль"})
      }

      const token = generateJwt(user._id)

      const {password, ...userData} = user._doc

      res.json({
         ...userData,
         token
      });

   } catch (err) {
      console.log(err);
      res.status(500).json({
         message: 'Помилка',
      });
   }
};

export const getAllUsers = async (req, res) => {
   try {
      let {limit} = req.query
      limit = limit || null
      let posts = await UserModel.find().sort({createdAt: -1}).limit(limit).exec();
      //let filterPost = res.filter(item => item.name !== user.name)
      res.json(posts);
   } catch (err) {
      console.log(err);
      res.status(500).json({
         message: 'Не вдалось повернути товар',
      });
   }
};

export const updateFriends = async (req, res) => {
   try {
      const {id, friends, friendId} = req.body

      const doc = await UserModel.findOneAndUpdate(
         { _id: id },
         { friends },
         { returnDocument: "after" }
      );
      const user = await UserModel.findById(friendId).exec();
      const { password, ...userData } = user._doc;
      /*if (!doc) {
         return res.status(404).json({ message: 'Стаття не знайдена' });
      }*/
      
      return res.json({doc, userData});
   } catch (err) {
      console.log(err);
      res.status(500).json({
         message: 'Не вдалось повернути статтю',
      });
   }
};

export const checkUser = async (req, res) => {
   try {
      const {_id} = req.query
      const user = await UserModel.findById(_id).exec();

      /*if (!user) {
         return res.status(404).json({
         message: 'Пользователь не найден',
         });
      }*/

      const { password, ...userData } = user._doc;

      res.json(userData);
   } catch (err) {
      console.log(err);
      /*res.status(500).json({
         message: 'Нет доступа',
      });*/
   }
};

export const updateViewUser = async (req, res) => {
   try {
      const {id} = req.body
      const doc = await UserModel.updateOne(
         { _id: id },
         { $inc: { viewsCount: 1 } },  
         { returnDocument: "after" }
      );
      if (!doc) {
         return res.status(404).json({ message: 'Стаття не знайдена' });
      }
      return res.json(doc);
   } catch (err) {
      console.log(err);
      res.status(500).json({
         message: 'Не вдалось повернути статтю',
      });
   }
};

export const updateInfo = async (req, res) => {
   try {
      const {name, experience, aboutMe, location, age} = req.body
      await UserModel.updateOne({
         _id: req.body.id
      },
      {
         name,
         experience,
         aboutMe,
         location,
         age,
      })

      return res.json({
            success: true,
            message: "Профіль успішно оновлений"
         })
   } catch (err) {
      console.log(err);
      res.status(500).json({
         message: 'Не вдалось оновити профіль',
      });
   }
};

export const updatePhoto = async (req, res) => {
   try {
      await UserModel.updateOne({
         _id: req.body.id
      },
      {
         userImage: req.body.userImage,
         avatarImage: req.body.avatarImage,
      })

      return res.json({
            success: true,
            message: "Фото успішно оновлено"
         })
   } catch (err) {
      console.log(err);
      res.status(500).json({
         message: 'Не вдалось оновити фото',
      });
   }
};

export const updateBackground = async (req, res) => {
   try {
      await UserModel.updateOne({
         _id: req.body.id
      },
      {
         backgroundImage: req.body.backgroundImage,
      })

      return res.json({
            success: true,
            message: "Фото успішно оновлено"
         })
   } catch (err) {
      console.log(err);
      res.status(500).json({
         message: 'Не вдалось оновити фото',
      });
   }
};