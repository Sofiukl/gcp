"use strict";

var firebase = require("firebase");
const functions = require("firebase-functions");
const admin = require("firebase-admin");
const firebaseConfig = require("../firebase.proj.config.json");
require("firebase/database");

// Initialize Firebase
const logger = functions.logger;
firebase.initializeApp(firebaseConfig);
admin.initializeApp(firebaseConfig);

const visitor = require("./src/visitor");
const { writeUserData } = require("./src/realtimedb");

// AUTH TRIGGERS
exports.userAdded = functions.auth.user().onCreate((user, context) => {
  logger.info(`user added ${JSON.stringify(user)}`);
  return Promise.resolve();
});

exports.userDeleted = functions.auth.user().onDelete((user, context) => {
  logger.info(`user deleted ${JSON.stringify(user)}`);
  return Promise.resolve();
});

// HTTP TRIGGER
exports.addVisitor = functions.https.onRequest((req, res) => {
  visitor.addVisitor(req, res, admin);
  writeUserData(firebase, "Sofikul", "test_sofikul_email@email.com");
});

// FIRESTORE DOCUMENT CHANGE TRIGGER
exports.recordAdded = functions.firestore
  .document("/messages/{documentId}")
  .onCreate((snapshot, context) => {
    logger.info(`recordAdded :: ${JSON.stringify(snapshot.data())}`);
    return Promise.resolve();
  });

// PUB SUB SCHEDULER
exports.scheduledFunc = functions.pubsub
  .schedule("* * * * *")
  .onRun((context) => {
    logger.info("scheduledFunc() executed");
  });

// REAL TIME DATABASE SUBSCRIPTION
const userId = "65ac231f-580b-4d64-91d0-35cad6214af5";
var userDataChange = firebase.database().ref("users/" + userId);
userDataChange.on("value", (snapshot) => {
  const data = snapshot.val();
  logger.info(
    `data from userDataChange real time db subscribe ${JSON.stringify(data)}`
  );
});