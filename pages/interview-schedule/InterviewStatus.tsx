import React from "react";
import { Chip } from "@mui/material";

const machineTestCellRenderer = (params: any) => {
  return (
    // <Chip
    //   color={params.value === 'pass' ? 'success' : 'error'}

    //   label={params.value === 'pass' ? 'Passed' : 'Rejected'}
    // />
    <Chip
      color={
        params.value === "pending"
          ? "info"
          : params.value === "pass"
          ? "success"
          : "error"
      }
      label={
        params.value === "pending"
          ? "Pending"
          : params.value === "pass"
          ? "Passed"
          : "Rejected"
      }
    />
  );
};

export default machineTestCellRenderer;
