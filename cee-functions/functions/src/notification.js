const functions = require("firebase-functions");
const logger = functions.logger;

const COL_NOTI = "notification";

exports.notification = (event, context, admin) => {
  const message = event.data
    ? Buffer.from(event.data, "base64").toString()
    : "Hello, World";
  console.log(message);

  logger.info(`sending notification ${message}`);

  const db = admin.firestore();
  const docData = {
    message: data,
  };
  try {
    logger.info(`noti data received: ${JSON.stringify(docData)}`, {
      structuredData: true,
    });
    db.collection(COL_NOTI).add(docData);
    logger.info("noti written successfully!");
  } catch (error) {
    console.error("Error writing document: ", error);
  }
};
