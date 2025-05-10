import { db } from "./firebase";
import { collection, query, where, getDocs, addDoc, updateDoc, doc } from "firebase/firestore";

/**
 * Save or update a therapist's note for a patient.
 */
export async function saveTherapistNote(therapistId: string, patientId: string, note: string) {
  const q = query(
    collection(db, "notes"),
    where("therapistId", "==", therapistId),
    where("patientId", "==", patientId)
  );
  const snapshot = await getDocs(q);
  if (!snapshot.empty) {
    // Update the existing note
    const noteDoc = snapshot.docs[0];
    await updateDoc(doc(db, "notes", noteDoc.id), { note });
  } else {
    // Create a new note
    await addDoc(collection(db, "notes"), {
      therapistId,
      patientId,
      note,
      createdAt: new Date().toISOString(),
    });
  }
}

/**
 * Fetch a therapist's note for a specific patient.
 */
export async function fetchTherapistNote(therapistId: string, patientId: string): Promise<string> {
  const q = query(
    collection(db, "notes"),
    where("therapistId", "==", therapistId),
    where("patientId", "==", patientId)
  );
  const snapshot = await getDocs(q);
  if (!snapshot.empty) {
    return snapshot.docs[0].data().note || "";
  }
  return "";
}

/**
 * Fetch all notes for a therapist (optional helper).
 */
export async function fetchAllNotesForTherapist(therapistId: string) {
  const q = query(
    collection(db, "notes"),
    where("therapistId", "==", therapistId)
  );
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
} 