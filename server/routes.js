const controllers = require('./controllers/index.js');
const router = require('express').Router();

// route to... get :page*:count number of reviews of :id

router.get('/reviews/:id/:page/:count/:sort', controllers.getReview);

// "" ... get meta data of :id
router.get('/reviews/meta/:id', controllers.getMeta);

// "" ... post a review
router.post('/reviews', controllers.postRev);

// "" ... update the helpful coounter of :id
router.put('/reviews/:id/helpful', controllers.helpfulRev);

// "" ... update the report counter of :id
router.put('/reviews/:id/report', controllers.reportRev);


module.exports = router;