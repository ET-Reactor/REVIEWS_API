const controllers = require('./controllers/index.js');
const router = require('express').Router();

// route to... get :page*:count number of reviews of :id
router.get('/reviews/:id/:page/:count/:sort', controllers.reviews.getReview);

// "" ... get meta data of :id
router.get('/reviews/meta/:id', controllers.reviews.getMeta)

// "" ... post a review
router.post('/reviews', controllers.reviews.postRev)

// "" ... update the helpful coounter of :id
router.put('/reviews/:id/helpful', controllers.reviews.helpfulRev);

// "" ... update the report counter of :id
router.put('/reviews/:id/report', controllers.reviews.reportRev);


module.exports = router;