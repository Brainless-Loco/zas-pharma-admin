import React from "react";
import CircularProgress  from "@mui/material/CircularProgress";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ErrorIcon from "@mui/icons-material/Error";

function StatusModal({ open, message, type, onClose }) {
  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="status-modal-title"
      aria-describedby="status-modal-description"
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 300,
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 2,
          textAlign: "center",
        }}
      >
        {type === "success" && <CheckCircleIcon color="success" sx={{ fontSize: 50 }} />}
        {type === "error" && <ErrorIcon color="error" sx={{ fontSize: 50 }} />}
        {type === "pending" && <CircularProgress />}
        <Typography id="status-modal-title" variant="h6" component="h2">
          {message}
        </Typography>
      </Box>
    </Modal>
  );
}

export default StatusModal;
