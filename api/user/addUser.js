const Router = require('express');
const { v4: uuidv4 } = require('uuid');
const { Users } = require('../../models/users');

const router = Router();

router.post('/users', async (req, res) => {
  const { email, password } = req.body;

  const user = new Users({ email, password, apiKey: uuidv4() });

  const result = await user.save();

  res.status(200).send(result);
});

module.exports = router;