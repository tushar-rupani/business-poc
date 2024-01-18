var express = require('express');
const { insertAllCategoriesOfFourSquare, insertBusinessData, insertBusinessDataFromGooglePlaces, getMetricsFromFourSquare, getMetricsFromGooglePlaces, getAllCategories, getBusinessByCategoryId } = require('../controllers/business.controller');
var router = express.Router();
/* This cotroller is required for retrieving all the categories data from FourSquareAPIs and dumping them in to our own local instance.
GET Business Category data from Four Square APIs. */
router.post('/', insertAllCategoriesOfFourSquare);
router.post('/insert-business-records', insertBusinessData);
router.post('/insert-google-business-records', insertBusinessDataFromGooglePlaces);
router.post('/insert-foursquare-metrics', getMetricsFromFourSquare);
router.post('/insert-google-places-metrics', getMetricsFromGooglePlaces);
router.get('/get-categories', getAllCategories);
router.post('/get-business-by-category', getBusinessByCategoryId);

module.exports = router;
