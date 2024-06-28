const router = require('express').Router();
const { where } = require('sequelize');
const { Word } = require('../../db/models');
// роутер для записи хороших и плохи слов в базу данных
router.post('/', async (req, res) => {
  try {
    const { goodWord, badWord, user_id } = req.body;
    // console.log(user_id);
    const entrie = await Word.create({ goodWord, badWord, user_id });
    res.json(entrie);
  } catch (error) {
    console.log(error);
    res.status(500).send(error.message);
  }
});

  router.get('/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const entrie = await Word.findAll({ where: { user_id: id }, attributes: ['goodWord', 'badWord'] });
      const result = entrie.map((el) => el.get({ plain: true }));
      
      console.log(result);
      res.json(result);
    } catch (error) {
      console.log(error);
      res.status(500).send(error.message);
    }
  })

// роутер для сортировки популярных слов
router.get('/', async (req, res) => {
  try {
    // const { goodWord, badWord, user_id} = req.body;
    const entrie = await Word.findAll();
    const result = entrie.map((el) => el.get({ plain: true }));
    const objGoodWord = {};
    for (let i = 0; i < result.length; i++) {
      const letter = result[i].goodWord.toLowerCase();
      if (objGoodWord[letter]) {
        objGoodWord[letter] += 1;
      } else {
        objGoodWord[letter] = 1;
      }
    }
    const dataArray = Object.entries(objGoodWord);
    dataArray.sort((a, b) => b[1] - a[1]);
    const dataArr = dataArray.map((el) => el[0]).filter((el) => el !== '');
    const arrGoodWord = dataArr.length > 5 ? dataArr.slice(0, 5) : dataArr;
    console.log(arrGoodWord);

    const objBadWord = {};
    for (let i = 0; i < result.length; i++) {
      const letter = result[i].badWord.toLowerCase();
      if (objBadWord[letter]) {
        objBadWord[letter] += 1;
      } else {
        objBadWord[letter] = 1;
      }
    }
    const dataArrayBad = Object.entries(objBadWord);
    dataArrayBad.sort((a, b) => b[1] - a[1]);
    const dataArrBad = dataArrayBad.map((el) => el[0]).filter((el) => el !== '');
    const arrBadWord = dataArrBad.length > 0 ? dataArrBad.slice(0, 5) : dataArrBad;
    console.log(arrBadWord);
    res.json([arrGoodWord, arrBadWord]);
  } catch (error) {
    console.log(error);
    res.status(500).send(error.message);
  }
});

module.exports = router;
