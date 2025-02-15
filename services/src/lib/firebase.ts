import admin from "firebase-admin";
import path from "path";

admin.initializeApp({
  credential: admin.credential.cert(
    path.resolve(__dirname, "../../firebase-admin.json")
  ),
});

export default admin;
