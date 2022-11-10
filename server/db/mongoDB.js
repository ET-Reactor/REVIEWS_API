// const mongoose = require("mongoose");
// const { Schema } = mongoose;
// mongoose.connect('mongodb://localhost/SDCReviewsMongo');

// const photosSchema = new Schema({
//   review_id: Number,
//   url: String
// })

// const reviewsSchema = new Schema({
//   product: Number,
//   review_id: Number,
//   rating: { type: String, default: 0 },
//   summary: { type: String, default: null },
//   recommend: { type: Boolean, default: false },
//   reported: { type: Boolean, default: false },
//   response: { type: String, default: null },
//   body: { type: String, default: null },
//   date: { type: Date, default: null },
//   photos: [photosSchema],
//   reviewer_name: { type: String, default: null },
//   helpfulness: { type: Number, default: 0 },
// })

// const metaSchema = new Schema({
//   product_id: Number,
//   review_id: Number,
//   name: String,
//   value: Number,
//   ratings: {
//     1: Number,
//     2: Number,
//     3: Number,
//     4: Number,
//     5: Number
//   },
//   recommended: {
//     true: Number,
//     false: Number
//   }
// });

// const photosDoc = mongoose.model('Photos', photosSchema);
// const reviewsDoc = mongoose.model('Reviews', reviewsSchema);
// const metaDoc = mongoose.model('Meta', metaSchema);


// module.exports = {}