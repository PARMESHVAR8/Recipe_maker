const express = require('express');
const { fetchData } = require('../controllers/apiController');
const router = express.Router();

router.get('/', async (req, res) => {
  try {
    await fetchData(req, res);
    const jsonData = require('../response.json');
    res.json(jsonData);
  } catch (error) {
    res.status(500).send({ error: 'Error fetching data' });
  }
});

module.exports = router;
