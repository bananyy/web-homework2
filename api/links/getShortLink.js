const Router = require('express');
const { Link } = require('../../models/links');

const router = Router();

router.get('/shortLink/:cut', async (req, res) => {
  const { cut } = req.params;

  const link = await Link.findOne({ 'link.cut': cut })
    .catch((error) => {
      res.status(400).send(error);
    });

  if (!link) {
    return res.status(400).json({ error: 'Short link was not found' });
  }

  if (new Date() > link.expiredAt) {
    return res.status(400).json({ error: 'Link was expired' });
  }

  res.status(200).redirect(link.original);
});

module.exports = router;