const { v4: uuidv4 } = require("uuid");

exports.writeUserData = (firebase, name, email) => {
  firebase
    .database()
    .ref("users/" + uuidv4())
    .set({
      username: name,
      email: email,
    });
};
