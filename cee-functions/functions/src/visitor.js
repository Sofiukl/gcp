const functions = require("firebase-functions");
const logger = functions.logger;

const COL_VISITORS = "visitors";

exports.addVisitor = (request, response, admin) => {

  const name = request.body.name;
  const numVisit = request.body.numVisit;
  const mobile = request.body.mobile;

  const db = admin.firestore();
  const docData = {
    name,
    numVisit,
    mobile
  };
  try {
    logger.info(`vistor data received: ${JSON.stringify(docData)}`, { structuredData: true });
    db.collection(COL_VISITORS).add(docData);
    logger.info("Document successfully written!");
  } catch (error) {
    console.error("Error writing document: ", error);
  }
  response.send("Visitor added successfully");
};
