/**
 * The reason behind using this is - I forgot to mention fsq_id into the old payload, so I am just comparing names and
 * getting IDs and just injecting the id and replacing the payload.
 */

const oldPayload = require("../backup/4Square - Khobar.json");
const newPayload = require("../backup/4Square/18-4Square-Khobar.json");
const fs = require("fs");
function updateId(oldPayload, newPayload) {
  for (const oldObj of oldPayload) {
    for (const newObj of newPayload) {
      if (oldObj.name === newObj.name) {
        oldObj.fsq_id = newObj.fsq_id;
        console.log(oldObj.rating, newObj.rating);
        break;
      }
    }
  }
  const updatedOldPayload = JSON.stringify(oldPayload, null, 2);
  fs.writeFile("./test.json", updatedOldPayload, (err) => {
    console.log(err);
  });
  return updatedOldPayload;
}

updateId(oldPayload.results, newPayload.results);
