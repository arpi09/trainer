const admin = require("firebase-admin");
const readline = require("readline");
const path = require("path");

const serviceAccount = require(path.join(__dirname, "serviceAccountKey.json"));

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

function setAdminClaim(uid) {
  admin
    .auth()
    .setCustomUserClaims(uid, { role: "admin" })
    .then(() => {
      console.log(`Custom claim set for user ${uid}: role=admin`);
      process.exit(0);
    })
    .catch((error) => {
      console.error("Error setting custom claim:", error);
      process.exit(1);
    });
}

const uid = process.env.FB_UID;

if (uid) {
  setAdminClaim(uid);
} else {
  // Prompt for UID if not provided
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  rl.question("Enter Firebase UID to make admin: ", (inputUid) => {
    setAdminClaim(inputUid.trim());
    rl.close();
  });
}
