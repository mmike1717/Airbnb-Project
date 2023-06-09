const router = require('express').Router();
// const { requireAuth } = require('../../utils/auth.js');
const sessionRouter = require('./session.js');
const usersRouter = require('./users.js');
const spotsRoute = require('./spots.js');
const reviewRouter = require('./reviews.js')
const bookingsRouter = require('./bookings.js')
const spotImageRouter = require('./spot-images.js')
const reviewImgRouter = require('./review-images.js')
const { restoreUser } = require("../../utils/auth.js");


router.use(restoreUser);

router.use('/session', sessionRouter);

router.use('/users', usersRouter);

router.use('/spots', spotsRoute);

router.use('/reviews', reviewRouter);

router.use('/bookings', bookingsRouter);

router.use('/spot-images', spotImageRouter)

router.use('/review-images', reviewImgRouter)

router.post('/test', (req, res) => {
  res.json({ requestBody: req.body });
});

// const { setTokenCookie } = require('../../utils/auth.js');
// const { User } = require('../../db/models');
// router.get('/set-token-cookie', async (_req, res) => {
//     const user = await User.findOne({
//         where: {
//             username: 'Demo-lition'
//         }
//     });
//     setTokenCookie(res, user);
//     return res.json({ user: user });
// });

//nothing else should be above this code
// router.use(restoreUser);
// GET /api/restore-user
// router.get(
//   '/restore-user',
//   (req, res) => {
//     return res.json(req.user);
//   }
// );



// GET /api/require-auth
// router.get(
//   '/require-auth',
//   requireAuth,
//   (req, res) => {
//     return res.json(req.user);
//   }
// );










module.exports = router;
