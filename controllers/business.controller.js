const { generalResponse } = require("../helpers/response.helper");
const axios = require("axios");
const db = require("../models/index");
const { Category, Business, CategoryBusiness } = db;
/**
 * We'll be generally using APIs to get data, in order to reduce the redundant API calls - we are using cached data.
 * FourSquareCached Data. These data were scraped on 17th January. 2024.
 */
const FourSquareKhobarCached = require("../backup/4Square - Khobar.json");
const FourSquareRiyadhCached = require("../backup/4Square - Riyadh.json");
const FourSquareAlKharjCached = require("../backup/4Square - Al-Kharj.json");
// Google Places API Cached Data. These data were scraped on 17th January, 2024
const GoogleKhobarCached = require("../backup/Google/17-Khobar.json");
const GoogleRiyadhCached = require("../backup/Google/17-Riyadh.json");
const GoogleAlKharjCached = require("../backup/Google/17-Al-Kharj.json");
async function test() {
  const businesses = await Business.findAll({
    raw: true,
    group: ["name"],
    include: {
      model: CategoryBusiness,
      as: "catBusiness",
      include: {
        model: Category,
        as: "category"
      }
    }
  });
}
test();

exports.insertAllCategoriesOfFourSquare = async (req, res) => {
  try {
    const options = {
      method: "post",
      url: process.env.FOUR_SQUARE_API_URL,
      params: {
        ll: req.body.ll,
        limit: 50,
        fields: "categories",
      },
      headers: {
        accept: "application/json",
        Authorization: process.env.FOUR_SQUARE_API_KEY,
      },
    };
    const response = await axios(options);
    const checkedCategories = [];
    if (response) {
      const results = response.data.results;
      for (const result of results) {
        const categories = result.categories;
        for (const category of categories) {
          try {
            if (!checkedCategories.includes(category.name)) {
              checkedCategories.push(category.name);
              await Category.create({ id: category.id, name: category.name });
            }
          } catch (error) {
            console.error(`Seems like we already have: ${category.name}`);
          }
        }
      }
    }
    return generalResponse(
      res,
      [{ success: true }],
      "Business Categories from FourSquares have been successfully inserted!",
      true
    );
  } catch (e) {
    console.error(e);
    return generalResponse(
      res,
      { data: "error" },
      "Something went wrong while inserting categories!",
      "error",
      true
    );
  }
};

exports.insertBusinessData = async (req, res) => {
  try {
    const { region } = req.body;
    /**
     * Use this following code to get data from the official FourSquare API, since we have already cached the data in order to remove the redundant call, from here you can get the data.
     */

    /* const options = {
      method: "get",
      url: process.env.FOUR_SQUARE_API_URL
    params: {
      ll: req.body.ll,
      limit: 50,
      fields:
        "tel,link,location,description,categories,stats,rating,popularity,name,photos",
    },
    headers: {
      accept: "application/json",
      Authorization: process.env.FOUR_SQUARE_API_KEY,
    },
    const response = await axios(options);
    console.log(response);
    if (response) {
    const results = response.data.results;
    */

    const getCachedData =
      region === "Riyadh"
        ? FourSquareRiyadhCached
        : region === "Al-Kharj"
        ? FourSquareAlKharjCached
        : FourSquareKhobarCached;
    const results = getCachedData.results;
    for (const result of results) {
      const businessPayload = {
        name: result.name,
        description: result.description ?? "",
        link: result.link,
        address: `${result.location.formatted_address} - ${result.location.locality} - ${result.location.region}`,
        rating: result.rating / 2 ?? 0,
        contactNumber: result.tel,
        totalRatings: result.stats.total_ratings,
        photos: result.photos,
        popularity: result.popularity.toFixed(5),
        region: req.body.region,
        platform: "FourSquare",
      };
      const categories = result.categories;
      const businessInstance = await Business.create(businessPayload);
      for (const category of categories) {
        const businessId = businessInstance.dataValues.id;
        await CategoryBusiness.create({
          categoryId: category.id,
          businessId: businessId,
        });
      }
    }
    return generalResponse(
      res,
      [{ success: true }],
      "Business Records have been inserted successfully!",
      true
    );
  } catch (e) {
    console.error(e);
    return generalResponse(
      res,
      { data: "error" },
      "Something went wrong while inserting categories!",
      "error",
      true
    );
  }
};
/**
 * These are some necessary functions needed to perform this API's data insertion.
 * ==============================================================================
 */

/**
 * This one is used for constructing perfect category types.
 */
function convertToTitleCase(inputString) {
  var words = inputString.split("_");
  var titleCaseWords = words.map(function (word) {
    return word.charAt(0).toUpperCase() + word.slice(1);
  });
  var resultString = titleCaseWords.join(" ");
  return resultString;
}

/**
 * This is used for calculating Popularity, since the google place APIs wasn't returing popularity count such as FourSquare -
 * Here is how we can calculate it based on Google Reviews and Reviews count. Eventualy it will come between 0 to 1. We can sort it by popularity.
 */
function calculatePopularity(user_ratings_total, rating) {
  if (user_ratings_total && rating) {
    const normalizedUserRatingsTotal = Math.min(user_ratings_total / 10000, 1);
    const normalizedRating = Math.min(rating / 5, 1);
    const popularity = (normalizedUserRatingsTotal + normalizedRating) / 2;
    const popularityWithPrecision = Number(popularity.toFixed(5));
    return popularityWithPrecision;
  } else {
    return undefined;
  }
}

async function handleCategoryInsertion(categories) {
  for (const category of categories) {
    try {
      await Category.create({ name: convertToTitleCase(category) });
    } catch (error) {
      console.error(`Seems like we already have: ${category}`);
    }
  }
}

function getCategoryId(allCategories, categoryName) {
  const category = allCategories.find(
    (category) => category.name === categoryName
  );
  return category.id;
}

exports.insertBusinessDataFromGooglePlaces = async (req, res) => {
  try {
    const { region } = req.body;
    const getCachedData =
      region === "Riyadh"
        ? GoogleRiyadhCached
        : region === "Al-Kharj"
        ? GoogleAlKharjCached
        : GoogleKhobarCached;
    const results = getCachedData.results;
    for (const result of results) {
      await handleCategoryInsertion(result.types);
      // Now, the reason behing fetching this is we can not find the respected category in the response payload.
      const categories = await Category.findAll({ raw: true });
      const businessPayload = {
        name: result.name,
        description: result.description ?? null,
        link: result.link ?? null,
        address: result.vicinity,
        rating: result.rating ?? 0,
        contactNumber: result.tel ?? null,
        totalRatings: result.user_ratings_total,
        photos: result.photos,
        popularity: calculatePopularity(
          result.user_ratings_total,
          result.rating
        ),
        region: req.body.region,
        platform: "GooglePlaces",
      };
      const businessInstance = await Business.create(businessPayload);
      for (const category of result.types) {
        const businessId = businessInstance.dataValues.id;
        await CategoryBusiness.create({
          categoryId: getCategoryId(categories, convertToTitleCase(category)),
          businessId: businessId,
        });
      }
    }
    return generalResponse(
      res,
      [{ success: true }],
      "Business Records have been inserted successfully!",
      true
    );
  } catch (e) {
    console.error(e);
    return generalResponse(
      res,
      { data: "error" },
      "Something went wrong while inserting categories!",
      "error",
      true
    );
  }
};