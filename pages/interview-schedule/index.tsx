

import React, { useEffect, useMemo, useState } from "react";
import { AgGridReact } from "@ag-grid-community/react";
import "@ag-grid-community/styles/ag-grid.css";
import "@ag-grid-community/styles/ag-theme-quartz.css";
import { ModuleRegistry } from "@ag-grid-community/core";
import { ClientSideRowModelModule } from "@ag-grid-community/client-side-row-model";
import {
  Timestamp,
  collection,
  onSnapshot,
  updateDoc,
  doc,
  addDoc,
} from "firebase/firestore";
import { db, storage } from "@/api/firebaseConfig/firebaseConfig";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import {
  Grid,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  TextField,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Chip,
  Stack,
  IconButton,
  Typography,
  styled,
  Box,
} from "@mui/material";
import SideBar from "@/component/SideBar2";
import InterviewStatus from "../interview-schedule/InterviewStatus";
import FinalStatus from "../interview-schedule/FinalStatus";
import { useForm, Controller } from "react-hook-form";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import useInterviewData from "@/api/hooks/interviewSchedule";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import DeleteIcon from "@mui/icons-material/Delete";
import { deleteInterviewEvent } from "@/api/functions/interviewScheduleFunc";
import ResumeLink from "./ResumeLink";
import DeleteConfirmation from "./DeleteConfirmation";
import customDateTimeEditor from "./CustomDateTimeEdit";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});
ModuleRegistry.registerModules([ClientSideRowModelModule]);
const schema = yup.object().shape({
  Name: yup.string().required("Name is Required"),
  CV:yup.string(),
  HR: yup.string().required("HR is required field"),
  Interviewer: yup.string().required("Interviewer is required field"),
  Department:yup.string(),
  Interview:yup.date(),
  Interview1:yup.string(),
  MachineTest:yup.string(),
  Interview2:yup.string(),
  Status:yup.string(),
  comment: yup.string()
});
const GridExample = () => {
  const { rowData, isLoading, refetch, error, updateMutation, addMutation } =
    useInterviewData();

  console.log(rowData);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [fileName, setFileName] = useState("");
  const {
    control,
    handleSubmit,
    setValue,
    getValues,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      Name: "",
      CV: "",
      HR: "",
      Interview:new Date(),
      Interviewer: "",
      Department: "",
      Interview1: "",
      MachineTest: "",
      Interview2: "",
      Status: "",
      comment: "",
    },
    resolver: yupResolver(schema),
  });

  const [columnDefs] = useState([
    { field: "Name", headerName: "Name", editable: true },
    {
      field: "CV",
      headerName: "CV",
      editable: false,
      cellRenderer: ResumeLink,
      width: 110,
    },
    {
      field: "Department",
      headerName: "Department",
      editable: true,
      cellEditor: "agSelectCellEditor",
      cellEditorParams: { values: ["React", "Node", "Angular"] },
    },
    {
      field: "HR",
      headerName: "HR",
      editable: true,
      cellEditor: "agSelectCellEditor",
      cellEditorParams: { values: ["HR1", "HR2", "HR3"] },
    },
    {
      field: "Interviewer",
      headerName: "Interviewer",
      editable: true,
      cellEditor: "agSelectCellEditor",
      cellEditorParams: {
        values: ["Interviewer1", "Interviewer2", "Interviewer3"],
      },
    },
    // {
    //   field: "Interview",
    //   headerName: "Interview Date",
    //   editable: true,
    //   cellEditor: "agDateCellEditor",

    //   valueFormatter: (params: { value: any }) => {
    //     if (params.value && typeof params.value.toDate === "function") {
    //       return params.value.toDate().toLocaleString();
    //     } else if (params.value instanceof Date) {
    //       return params.value.toLocaleString();
    //     } else if (params.value) {
    //       const date = new Date(params.value);
    //       return isNaN(date.getTime()) ? params.value : date.toLocaleString();
    //     } else {
    //       return "";
    //     }
    //   },
    // },
    {
      field: "Interview",
      headerName: "Interview Date",
      editable: true,
      // cellRenderer: customTextFieldEditor,
      cellEditor: customDateTimeEditor,

      valueFormatter: (params: { value: any }) => {
        if (params.value && typeof params.value.toDate === "function") {
          return params.value.toDate().toLocaleString();
        } else if (params.value instanceof Date) {
          return params.value.toLocaleString();
        } else if (params.value) {
          const date = new Date(params.value);
          return isNaN(date.getTime()) ? params.value : date.toLocaleString();
        } else {
          return "";
        }
      },
    },

    {
      headerName: "Interview 1",
      field: "Interview1",
      editable: true,
      cellEditor: "agSelectCellEditor",
      cellEditorParams: { values: ["pass", "rejected", "pending"] },
      cellRenderer: InterviewStatus,
      width: 110,
    },
    {
      headerName: "Machine Test",
      field: "MachineTest",
      editable: true,
      cellEditor: "agSelectCellEditor",
      cellEditorParams: { values: ["pass", "rejected", "pending"] },
      cellRenderer: InterviewStatus,
      width: 130,
    },
    {
      headerName: "Interview 2",
      field: "Interview2",
      editable: true,
      cellEditor: "agSelectCellEditor",
      cellEditorParams: { values: ["pass", "rejected", "pending"] },
      cellRenderer: InterviewStatus,
      width: 110,
    },
    {
      field: "Status",
      headerName: "Status",
      editable: true,
      cellEditor: "agSelectCellEditor",
      cellEditorParams: { values: ["selected", "rejected", "pending"] },
      cellRenderer: FinalStatus,
      width: 110,
    },
    { field: "comment", headerName: "Comment", editable: true },

    {
      headerName: "Action",
      editable: false,
      cellRenderer: DeleteConfirmation,
      width: 110,
    },
  ]);

  const defaultColDef = useMemo(
    () => ({
      filter: "agTextColumnFilter",
      floatingFilter: true,
    }),
    []
  );

  const onCellEditingStopped = (params: {
    data: any;
    colDef: any;
    newValue: any;
  }) => {
    const { data, colDef, newValue } = params;
    updateMutation.mutate({
      id: data.id,
      field: colDef.field,
      value: newValue,
    });
  };

  const handleOpenDialog = () => setDialogOpen(true);
  const handleCloseDialog = () => {
    setDialogOpen(false);
    reset();
    setFileName("");
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setSelectedFile(event.target.files[0]);
      setFileName(event.target.files[0].name);
    }
  };

  const onSubmit = async (data: any) => {
    await addMutation.mutate({ data, selectedFile });
    handleCloseDialog();
    setSelectedFile(null);
    setFileName("");
  };

  if (isLoading) return <h1>Loading...</h1>;
  if (error) return <div>Error fetching data</div>;

  return (
    <>
      <div style={{ display: "flex", height: "100vh", width: "100%" }}>
        <SideBar />

        <div
          style={{
            flex: "1",
            padding: "16px",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Button
            variant="contained"
            color="primary"
            onClick={handleOpenDialog}
            style={{ marginBottom: "16px", maxWidth: "20rem" }}
          >
            Add Interview Slot
          </Button>

          <div
            className={"ag-theme-quartz-dark"}
            style={{
              flex: "1",
              marginTop: "8px",
              height: "calc(100% - 56px)",
              width: "100%",
            }}
          >
            <AgGridReact
              rowData={rowData}
              columnDefs={columnDefs}
              defaultColDef={defaultColDef}
              rowSelection="multiple"
              suppressRowClickSelection={true}
              pagination={true}
              paginationPageSize={10}
              paginationPageSizeSelector={[10, 25, 50]}
              onCellEditingStopped={onCellEditingStopped}
            />
          </div>
        </div>
      </div>
      {/* </Grid> */}

      <Dialog open={isDialogOpen} onClose={handleCloseDialog}>
        <DialogContent>
          <Controller
            name="Name"
            control={control}
            render={({ field }) => (
              <TextField
                label="Name"
                {...field}
                fullWidth
                margin="normal"
                error={!!errors.Name}
                helperText={errors.Name ? (errors.Name.message as string) : ""}
              />
            )}
          />

          <Controller
            name="HR"
            control={control}
            render={({ field }) => (
              <FormControl fullWidth margin="normal">
                <InputLabel>HR</InputLabel>
                <Select {...field} error={!!errors.HR}>
                  <MenuItem value="HR1">HR1</MenuItem>
                  <MenuItem value="HR2">HR2</MenuItem>
                  <MenuItem value="HR3">HR3</MenuItem>
                </Select>
              </FormControl>
            )}
          />
          <span style={{ color: "red", fontSize: "12px" }}>
            {errors.HR ? (errors.HR.message as string) : ""}{" "}
          </span>
          <Controller
            name="Interview"
            control={control}
            render={({ field }) => (
              <TextField
                label="Interview"
                type="datetime-local"
                {...field}
                fullWidth
                margin="normal"
                InputLabelProps={{ shrink: true }}
              />
            )}
          />
          <Controller
            name="Department"
            control={control}
            render={({ field }) => (
              <FormControl fullWidth margin="normal">
                <InputLabel>Department</InputLabel>
                <Select {...field}>
                  <MenuItem value="React">React</MenuItem>
                  <MenuItem value="Node">Node</MenuItem>
                  <MenuItem value="Angular">Angular</MenuItem>
                </Select>
              </FormControl>
            )}
          />
          <Controller
            name="Interviewer"
            control={control}
            render={({ field }) => (
              <FormControl fullWidth margin="normal">
                <InputLabel>Interviewer</InputLabel>
                <Select {...field} error={errors?.Interviewer}>
                  <MenuItem value="Interviewer1">Interviewer1</MenuItem>
                  <MenuItem value="Interviewer2">Interviewer2</MenuItem>
                  <MenuItem value="Interviewer3">Interviewer3</MenuItem>
                </Select>
              </FormControl>
            )}
          />
          <span style={{ color: "red", fontSize: "12px" }}>
            {errors.Interviewer ? (errors.Interviewer.message as string) : ""}{" "}
          </span>
          <Controller
            name="Interview1"
            control={control}
            render={({ field }) => (
              <FormControl fullWidth margin="normal">
                <InputLabel>Interview 1</InputLabel>
                <Select {...field}>
                  <MenuItem value="pass">pass</MenuItem>
                  <MenuItem value="rejected">rejected</MenuItem>
                  <MenuItem value="pending">pending</MenuItem>
                </Select>
              </FormControl>
            )}
          />
          <Controller
            name="MachineTest"
            control={control}
            render={({ field }) => (
              <FormControl fullWidth margin="normal">
                <InputLabel>Machine Test</InputLabel>
                <Select {...field}>
                  <MenuItem value="pass">pass</MenuItem>
                  <MenuItem value="rejected">rejected</MenuItem>
                  <MenuItem value="pending">pending</MenuItem>
                </Select>
              </FormControl>
            )}
          />
          <Controller
            name="Interview2"
            control={control}
            render={({ field }) => (
              <FormControl fullWidth margin="normal">
                <InputLabel>Interview 2</InputLabel>
                <Select {...field}>
                  <MenuItem value="pass">pass</MenuItem>
                  <MenuItem value="rejected">rejected</MenuItem>
                  <MenuItem value="pending">pending</MenuItem>
                </Select>
              </FormControl>
            )}
          />
          <Controller
            name="Status"
            control={control}
            render={({ field }) => (
              <FormControl fullWidth margin="normal">
                <InputLabel>Status</InputLabel>
                <Select {...field}>
                  <MenuItem value="selected">selected</MenuItem>
                  <MenuItem value="rejected">rejected</MenuItem>
                  <MenuItem value="pending">pending</MenuItem>
                </Select>
              </FormControl>
            )}
          />
          <Controller
            name="comment"
            control={control}
            render={({ field }) => (
              <TextField label="Comment" {...field} fullWidth margin="normal" />
            )}
          />

          <Button
            component="label"
            role={undefined}
            variant="contained"
            tabIndex={-1}
            startIcon={<CloudUploadIcon />}
          >
            {fileName ? fileName : "Upload file"}
            <VisuallyHiddenInput
              type="file"
              onChange={handleFileChange}
              accept=".pdf, .doc, .docx, .txt, .png, .jpg, .avif"
              id="file-upload"
            />
          </Button>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSubmit(onSubmit)} color="primary">
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default GridExample;
