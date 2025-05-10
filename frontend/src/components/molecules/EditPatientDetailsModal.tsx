import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
} from "@mui/material";
import { User } from "../organisms/UserTable";
import { db } from "../../firebase";
import { collection, query, where, getDocs, addDoc, updateDoc, doc } from "firebase/firestore";
import { fetchTherapistNote, saveTherapistNote } from "../../firestoreNoteHelpers";

interface EditPatientDetailsModalProps {
  open: boolean;
  patient: User | null;
  therapistId?: string; // therapist's user id
  userRole?: string; // current user's role
  onClose: () => void;
  onSave: (updated: { firstname: string; lastname: string }) => void;
}

const EditPatientDetailsModal: React.FC<EditPatientDetailsModalProps> = ({ open, patient, therapistId, userRole, onClose, onSave }) => {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [note, setNote] = useState("");
  const [noteId, setNoteId] = useState<string | null>(null);

  useEffect(() => {
    setFirstname(patient?.firstname || "");
    setLastname(patient?.lastname || "");
    if (userRole === "therapist" && therapistId && patient?.id) {
      fetchTherapistNote(therapistId, patient.id).then(setNote);
      setNoteId(null); // noteId is not needed anymore
    } else {
      setNote("");
      setNoteId(null);
    }
  }, [patient, therapistId, userRole]);

  const handleNoteSave = async () => {
    if (!therapistId || !patient?.id) return;
    await saveTherapistNote(therapistId, patient.id, note);
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Patient Details</DialogTitle>
      <DialogContent>
        <TextField
          label="Email"
          value={patient?.email || ""}
          fullWidth
          margin="normal"
          InputProps={{ readOnly: true }}
        />
        <TextField
          label="First Name"
          value={firstname}
          onChange={(e) => setFirstname(e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Last Name"
          value={lastname}
          onChange={(e) => setLastname(e.target.value)}
          fullWidth
          margin="normal"
        />
        {userRole === "therapist" && (
          <TextField
            label="Private Note"
            value={note}
            onChange={(e) => setNote(e.target.value)}
            fullWidth
            margin="normal"
            multiline
            minRows={2}
            helperText="Only you can see this note."
          />
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={() => onSave({ firstname, lastname })} variant="contained">Save</Button>
        {userRole === "therapist" && (
          <Button onClick={handleNoteSave} variant="outlined">Save Note</Button>
        )}
      </DialogActions>
    </Dialog>
  );
};

export default EditPatientDetailsModal; 