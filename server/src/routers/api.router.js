const router = require('express').Router();
const authRouter = require('./auth.api.router');
const tokensRouter = require('./tokens.api.router');
// const profileRouter = require('./profile.api.router');
const storyRouter = require('./story.api.router')


router.use('/tokens', tokensRouter);
router.use('/auth', authRouter);
router.use('/story', storyRouter);
// router.use('/story', ratingRouter);
// router.use('/profile', profileRouter);

module.exports = router;
