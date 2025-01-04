/* eslint-disable react/prop-types */
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  Fade,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

const ConfirmDeleteDialog = ({ open, handleClose, deleteHandler }) => {
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      TransitionComponent={Fade}
      TransitionProps={{ timeout: 300 }}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      keepMounted
    >
      <DialogTitle id="alert-dialog-title">
        {"Confirm Group Deletion"}
      </DialogTitle>

      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Are you sure you want to delete this group? This action cannot be
          undone and all associated data will be permanently removed.
        </DialogContentText>
      </DialogContent>

      <DialogActions>
        <Button onClick={handleClose} color="primary" variant="outlined">
          Cancel
        </Button>
        <Button
          onClick={() => {
            deleteHandler();
            handleClose();
          }}
          color="error"
          variant="contained"
          startIcon={<DeleteIcon />}
          autoFocus
        >
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmDeleteDialog;
