const router = require("express").Router();
const { Word } = require('../../db/models')


router.post('/', async (req, res) => {
    try {
    const { goodWord, badWord, user_id} = req.body;
    console.log(user_id)
      const entrie = await Word.create({ goodWord, badWord, user_id})
      res.json(entrie)
    }catch (error) {
        console.log(error)
        res.status(500).send(error.message)
    }
  });

  module.exports = router;

