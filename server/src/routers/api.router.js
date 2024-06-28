const router = require('express').Router();
const authRouter = require('./auth.api.router');
const tokensRouter = require('./tokens.api.router');
const profileRouter = require('./profile.api.router');
const storyRouter = require('./story.api.router')

router.use('/tokens', tokensRouter);
router.use('/auth', authRouter);
router.use('/profile', profileRouter);
router.use('/story', storyRouter);

module.exports = router;

