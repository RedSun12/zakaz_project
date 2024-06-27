const router = require('express').Router();
const authRouter = require('./auth.api.router');
const tokensRouter = require('./tokens.api.router');
const profileRouter = require('./profile.api.router');

router.use('/tokens', tokensRouter);
router.use('/auth', authRouter);
router.use('/profile', profileRouter);

module.exports = router;

