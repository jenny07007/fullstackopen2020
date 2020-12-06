import React from "react";
import { newEntry } from "../types";

interface Props {
  onSubmit: (values: newEntry) => void;
  onCancel: () => void;
}
export type EntryFormValues = Omit<newEntry, "type">;

const AddEntryForm: React.FC<Props> = ({ onSubmit, onCancel }) => {
  return <div>form</div>;
};

export default AddEntryForm;
