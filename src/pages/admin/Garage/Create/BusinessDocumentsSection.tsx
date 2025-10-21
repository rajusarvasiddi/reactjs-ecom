import {
  TextField,
  Typography,
  IconButton,
  Tooltip,
  Dialog,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { useFormikContext } from "formik";
import { FormValues } from "./types";
import { useEffect, useState } from "react";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from "@mui/icons-material/Visibility";
import CloseIcon from "@mui/icons-material/Close";

export interface BusinessDocumentsSectionProps {
  documentTypes: { code: string; name: string }[];
  legendTitle?: string;
}

const BusinessDocuments = ({
  documentTypes,
  legendTitle,
}: BusinessDocumentsSectionProps) => {
  const { values, handleChange, touched, errors, setFieldValue } =
    useFormikContext<FormValues>();

  const [previewUrls, setPreviewUrls] = useState<{
    [key: string]: string | null;
  }>({});
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewFile, setPreviewFile] = useState<{
    url: string;
    name: string;
  } | null>(null);

  useEffect(() => {
    console.log("Current documents:", values.documents);
  }, [values.documents]);

  const handleRemoveFile = (code: string) => {
    setFieldValue(`documents.${code}.file`, null);
    setPreviewUrls((prev) => ({ ...prev, [code]: null }));
  };

  const handlePreviewFile = (code: string, name: string) => {
    const url = previewUrls[code];
    if (url) {
      setPreviewFile({ url, name });
      setPreviewOpen(true);
    }
  };

  const handleClosePreview = () => {
    setPreviewOpen(false);
    setPreviewFile(null);
  };

  return (
    <>
      <Typography component="legend" sx={{ fontWeight: "bold", mb: 1 }}>
        {legendTitle || "Documents"}
      </Typography>

      {documentTypes.map((doc) => (
        <div
          key={doc.code}
          style={{
            display: "flex",
            alignItems: "center",
            marginBottom: "8px",
          }}
        >
          <TextField
            fullWidth
            label={doc.name}
            name={`documents.${doc.code}.name`}
            value={values.documents?.[doc.code]?.name || ""}
            onChange={handleChange}
            error={
              touched.documents?.[doc.code]?.name &&
              Boolean(errors.documents?.[doc.code]?.name)
            }
            helperText={
              touched.documents?.[doc.code]?.name &&
              errors.documents?.[doc.code]?.name
            }
            margin="dense"
            size="small"
          />

          {previewUrls[doc.code] ? (
            <>
              <img
                src={previewUrls[doc.code] || ""}
                alt="Preview"
                style={{
                  width: "50px",
                  height: "50px",
                  marginLeft: "8px",
                  objectFit: "cover",
                  borderRadius: "4px",
                  border: "1px solid #ccc",
                }}
              />

              <Tooltip title="Preview File">
                <IconButton
                  color="primary"
                  size="small"
                  onClick={() =>
                    handlePreviewFile(
                      doc.code,
                      values.documents?.[doc.code]?.name
                    )
                  }
                  sx={{ ml: 1 }}
                >
                  <VisibilityIcon fontSize="small" />
                </IconButton>
              </Tooltip>

              <Tooltip title="Remove File">
                <IconButton
                  color="error"
                  size="small"
                  onClick={() => handleRemoveFile(doc.code)}
                  sx={{ ml: 1 }}
                >
                  <DeleteIcon fontSize="small" />
                </IconButton>
              </Tooltip>
            </>
          ) : (
            <label
              style={{
                display: "inline-block",
                padding: "4px",
                borderRadius: "4px",
                cursor: "pointer",
                marginLeft: "8px",
              }}
            >
              <AttachFileIcon fontSize="small" />
              <input
                type="file"
                style={{ display: "none" }}
                onChange={(event) => {
                  const file = event.currentTarget.files?.[0] || null;
                  if (file) {
                    setFieldValue(`documents.${doc.code}.file`, file);
                    const reader = new FileReader();
                    reader.onloadend = () => {
                      setPreviewUrls((prev) => ({
                        ...prev,
                        [doc.code]: reader.result as string,
                      }));
                    };
                    reader.readAsDataURL(file);
                  }
                }}
              />
            </label>
          )}
        </div>
      ))}

      {/* Preview Dialog */}
      <Dialog
        open={previewOpen}
        onClose={handleClosePreview}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle sx={{ display: "flex", justifyContent: "space-between" }}>
          {previewFile?.name || "Document Preview"}
          <IconButton onClick={handleClosePreview}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>

        <DialogContent sx={{ textAlign: "center" }}>
          {previewFile?.url?.includes("png") ? (
            <iframe
              src={previewFile.url}
              title="PDF Preview"
              style={{
                width: "100%",
                height: "80vh",
                border: "none",
              }}
            ></iframe>
          ) : (
            <img
              src={previewFile?.url}
              alt="Preview"
              style={{
                maxWidth: "100%",
                maxHeight: "80vh",
                borderRadius: "4px",
                objectFit: "contain",
              }}
            />
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default BusinessDocuments;
