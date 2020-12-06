import React from "react";
import { Modal, Segment } from "semantic-ui-react";
import { newEntry } from "../types";

import AddEntryForm from "./AddEntryForm";

interface Props {
  modal: boolean;
  onClose: () => void;
  onSubmit: (values: newEntry) => void;
  // error?: string;
}

const AddEntryModal: React.FC<Props> = ({ modal, onClose, onSubmit }) => (
  <Modal open={modal} onClose={onClose} centered={false} closeIcon>
    <Modal.Header>Add a new entry</Modal.Header>
    <Modal.Content>
      <AddEntryForm onSubmit={onSubmit} onCancel={onClose} />
    </Modal.Content>
  </Modal>
);

export default AddEntryModal;
