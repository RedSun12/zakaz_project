const router = require("express").Router();
const { Word } = require('../../db/models')


router.get('/', async (req, res) => {
    try {
    // const { goodWord, badWord, user_id} = req.body;
      const entrie = await Word.findAll()
      console.log(entrie)
      res.json(entrie)
    }catch (error) {
        console.log(error)
        res.status(500).send(error.message)
    }
  });

module.exports = router;


// const obj1 = {};
// for (let i = 0; i < first.length; i++) {
//   const letter = first[i].toLowerCase();
//   if (obj1[letter]) {
//     obj1[letter] += 1;
//   } else {
//     obj1[letter] = 1;
//   }
// }

// app.get('/entries', async (req, res) => {
//     try {
//       const entries = await Entrie.findAll()
//       res.json(entries)
//     } catch (error) {
//       console.log(error)
//       res.status(500).send(error.message)
//     }
//   })