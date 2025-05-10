import express, { Request, Response } from 'express';
import cors from 'cors';
import { authenticate } from './middlewares/authMiddleware';
import { authorizeRole } from './middlewares/roleMiddleware';
import * as admin from 'firebase-admin';

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

app.get('/', (req: Request, res: Response) => {
  res.send('API is running');
});

app.get('/admin-data', authenticate, authorizeRole(['admin']), (req, res) => {
  res.json({ message: 'This is admin-only data!' });
});

app.post('/admin/set-role', authenticate, authorizeRole(['admin']), (req: Request, res: Response) => {
  (async () => {
    const { uid, role } = req.body;
    if (!uid || !role) {
      res.status(400).json({ error: 'Missing uid or role' });
      return;
    }
    try {
      const adminSdk = require('./firebaseAdmin').default;
      let userRecord;
      try {
        userRecord = await adminSdk.auth().getUser(uid);
      } catch (err) {
        // If user does not exist in Auth, create them using Firestore email
        const userDoc = await adminSdk.firestore().collection('users').doc(uid).get();
        if (!userDoc.exists) {
          res.status(404).json({ error: 'User not found in Firestore' });
          return;
        }
        const email = userDoc.data().email;
        if (!email) {
          res.status(400).json({ error: 'User has no email in Firestore' });
          return;
        }
        userRecord = await adminSdk.auth().createUser({ uid, email });
      }
      // Set custom claim
      await adminSdk.auth().setCustomUserClaims(uid, { role });
      // Update Firestore user document
      await adminSdk.firestore().collection('users').doc(uid).update({ role });
      res.json({ success: true });
    } catch (error) {
      console.error('Error setting user role:', error);
      res.status(500).json({ error: 'Failed to set user role' });
    }
  })();
});

app.get('/admin/all-users', authenticate, authorizeRole(['admin']), async (req: Request, res: Response) => {
  try {
    const adminSdk = require('./firebaseAdmin').default;
    // Fetch all Auth UIDs
    let uids: string[] = [];
    let nextPageToken: string | undefined = undefined;
    do {
      const result: admin.auth.ListUsersResult = await adminSdk.auth().listUsers(1000, nextPageToken);
      uids = uids.concat(result.users.map((user: admin.auth.UserRecord) => user.uid));
      nextPageToken = result.pageToken;
    } while (nextPageToken);
    // Fetch all Firestore users
    const usersSnapshot = await adminSdk.firestore().collection('users').get();
    const users = usersSnapshot.docs.map((doc: FirebaseFirestore.QueryDocumentSnapshot) => ({ id: doc.id, ...doc.data() }));
    res.json({ users, authUids: uids });
  } catch (error) {
    console.error('Error fetching all users:', error);
    res.status(500).json({ error: 'Failed to fetch all users' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
}); 