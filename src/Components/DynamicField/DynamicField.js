import React from "react";
import { Box, TextField, IconButton, Stack, Button } from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";

function DynamicField({ label, values, onAdd, onRemove, onChange }) {
  return (
    <Box sx={{ mb: 3 }}>
      <strong>{label}</strong>
      {values.map((value, index) => (
        <Stack direction="row" spacing={1} key={index} sx={{ mt: 1 }}>
          <TextField
            value={value}
            onChange={(e) => onChange(e, index)}
            fullWidth
            placeholder={`Enter ${label}`}
          />
          <IconButton onClick={() => onRemove(index)}>
            <RemoveCircleOutlineIcon />
          </IconButton>
        </Stack>
      ))}
      <Button
        startIcon={<AddCircleOutlineIcon />}
        onClick={onAdd}
        sx={{ mt: 1 }}
      >
        Add {label}
      </Button>
    </Box>
  );
}

export default DynamicField;
