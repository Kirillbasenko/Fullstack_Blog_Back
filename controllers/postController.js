import PostModel from "../models/Post.js"

export const create = async (req, res) => {
   try {
      let {title, tags, img, type} = req.body

      const doc = new PostModel({
         title,
         tags,
         img,
         type,
         user: req.userId
      });

      const post = await doc.save()

   return res.json(post)
   } catch (err) {
      console.log(err);
      res.status(500).json({
         message: 'Не вдалось створити статтю',
      });
   }
};

export const getAll = async (req, res) => {
   try {
      let {limit, page, tag, userId} = req.query
      page = page || 1
      limit = limit || null
      userId = userId || null
      let offset = page * limit - limit
      let posts
      let postsAll
      if(tag){
         posts = await PostModel.find({tags: tag}).sort({createdAt: -1}).populate('user').limit(limit).skip(offset).exec();
         postsAll = await PostModel.find({tags: tag}).populate('user').exec();
      }else if(userId){
         posts = await PostModel.find({user: {_id: userId}}).sort({createdAt: -1}).populate('user').limit(limit).skip(offset).exec();
         postsAll = await PostModel.find({user: {_id: userId}}).populate('user').exec();
      }else{
         posts = await PostModel.find().sort({createdAt: -1}).populate('user').limit(limit).skip(offset).exec();
         postsAll = await PostModel.find().populate('user').exec();
      }
      //const posts = await PostModel.find({tags: null}).sort({createdAt: -1}).populate('user').limit(limit).skip(offset).exec();
      //const postsAll = await PostModel.find().populate('user').exec();
      res.json({posts, current: postsAll.length});
   } catch (err) {
      console.log(err);
      res.status(500).json({
         message: 'Не вдалось повернути товар',
      });
   }
};

export const checkOne = async (req, res) => {
   try {
      let {id} = req.query
      const doc = await PostModel.findOne({ _id: id }).exec();
      if (!doc) {
         return res.status(303).json({ message: 'Стаття не знайдена' });
      }
      return res.json(doc);
   } catch (err) {
      console.log(err);
      res.status(500).json({
         message: 'Не вдалось повернути ',
      });
   }
};

/*export const getOne = async (req, res) => {
   try {
      let {id} = req.query
      await PostModel.findOneAndUpdate({
         _id: id
      }, {
         $inc: {viewsCount: 1}
      },
      {
         returnDocument: "after"
      },
      (err, doc) => {
         if(err) {
            console.log(err);
            return res.status(500).json({
               message: 'Не вдалось повернути статтю',
            });
         }
         if(!doc){
            return res.status(303).json({
               message: 'Стаття не знайдена',
            });
         }
         return res.json(doc)
      })
   } catch (err) {
      console.log(err);
      res.status(500).json({
         message: 'Не вдалось повернути ',
      });
   }
};*/

export const remove = async (req, res) => {
   try {
      const {id} = req.query
      const doc = await PostModel.findOneAndDelete({ _id: id });
      if (!id) {
         return res.status(403).json({ message: 'Стаття не знайдена' });
      }
      if (!doc) {
         return res.status(404).json({ message: 'Стаття не знайдена' });
      }
      return res.json({ success: true, message: 'Стаття успішно видалена' });
   } catch (err) {
      console.log(err);
      res.status(500).json({
         message: 'Не вдалось повернути ',
      });
   }
};

export const update = async (req, res) => {
   try {
      const {id, title, type, tags, img} = req.body
      const doc = await PostModel.findOneAndUpdate(
         { _id: id },
         { type,
         title,
         tags,
         img,
         },
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

export const updateLike = async (req, res) => {
   try {
      const {id, likes, likesUsers, userId} = req.body
      const doc = await PostModel.findOneAndUpdate(
         { _id: id },
         { likes, likesUsers },
         { returnDocument: "after" }
      );
      const posts = await PostModel.find({user: {_id: userId}}).populate('user').exec()
      if (!doc) {
         return res.status(404).json({ message: 'Стаття не знайдена' });
      }
      return res.json({doc, posts});
   } catch (err) {
      console.log(err);
      res.status(500).json({
         message: 'Не вдалось повернути ',
      });
   }
};

export const getAllPostOnlyUser = async (req, res) => {
   try {
      const {userId} = req.query
      const posts = await PostModel.find({user: {_id: userId}}).sort({createdAt: -1}).populate('user').exec()
      return res.json({posts});
   } catch (err) {
      console.log(err);
      res.status(500).json({
         message: 'Не вдалось повернути ',
      });
   }
};