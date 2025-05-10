const admin = require("firebase-admin");
const readline = require("readline");
const path = require("path");

const serviceAccount = require(path.join(__dirname, "serviceAccountKey.json"));

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

function setClaim(uid, role) {
  admin
    .auth()
    .setCustomUserClaims(uid, { role })
    .then(() => {
      console.log(`Custom claim set for user ${uid}: role=${role}`);
      process.exit(0);
    })
    .catch((error) => {
      console.error("Error setting custom claim:", error);
      process.exit(1);
    });
}

const uid = process.env.FB_UID;
const role = process.env.FB_ROLE;

if (uid && role) {
  setClaim(uid, role);
} else {
  // Prompt for UID and role if not provided
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  rl.question("Enter Firebase UID: ", (inputUid) => {
    rl.question(
      "Enter role (e.g., therapist, admin, patient): ",
      (inputRole) => {
        setClaim(inputUid.trim(), inputRole.trim());
        rl.close();
      }
    );
  });
}
