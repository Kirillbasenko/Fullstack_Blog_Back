import CommentInfoInfo from "../models/Comment.js"

export const create = async (req, res) => {
   try {
      let {postId, comment, img} = req.body

      const doc = new CommentInfoInfo({
         postId,
         comment,
         img,
         user: req.userId
      });

      const data = await doc.save()

   return res.json(data)
   } catch (err) {
      console.log(err);
      res.status(500).json({
         message: 'Не вдалось створити коментар',
      });
   }
};

export const checkOne = async (req, res) => {
   try {
      let {id} = req.query
      const doc = await CommentInfoInfo.findOne({ _id: id }).exec();
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

export const getAll = async (req, res) => {
   try {
      let {postId, limit, page} = req.query
      page = page || 1
      limit = limit || null
      let offset = page * limit - limit
      const comments = await CommentInfoInfo.find({postId}).sort({createdAt: -1}).limit(limit).skip(offset).populate('user').exec();
      const commentsLength = await CommentInfoInfo.find({postId}).sort({createdAt: -1}).populate('user').exec();
      res.json({comments, commentsLength});
   } catch (err) {
      console.log(err);
      res.status(500).json({
         message: 'Не вдалось получити коментарі',
      });
   }
};

export const remove = async (req, res) => {
   try {
      const {id} = req.query
      const doc = await CommentInfoInfo.findOneAndDelete({ _id: id });
      if (!doc) {
         return res.status(403).json({ message: 'Коментар не знайдений' });
      }
      return res.json({ success: true, message: 'Коментар успішно видалений' });
   } catch (err) {
      console.log(err);
      res.status(500).json({
         message: 'Не вдалось повернути ',
      });
   }
};

export const updateLike = async (req, res) => {
   try {
      const {id, like, likesUsers} = req.body
      const doc = await CommentInfoInfo.findOneAndUpdate(
      { _id: id },
      { like, likesUsers },
      { returnDocument: "after" }
   );
   if (!doc) {
      return res.status(404).json({ message: 'Стаття не знайдена' });
   }
   return res.json(doc);
   } catch (err) {
      console.log(err);
      res.status(500).json({
         message: 'Не вдалось повернути ',
      });
   }
};

export const updateComment = async (req, res) => {
   try {
      const {id, comment, img} = req.body
      const doc = await CommentInfoInfo.findOneAndUpdate(
      { _id: id },
      { comment, img },
      { returnDocument: "after" }
   );
   if (!doc) {
      return res.status(404).json({ message: 'Стаття не знайдена' });
   }
   return res.json(doc);
   } catch (err) {
      console.log(err);
      res.status(500).json({
         message: 'Не вдалось повернути ',
      });
   }
};