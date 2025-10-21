// BusinessDocumentsSection.tsx
import { TextField, Typography } from "@mui/material";
import { useFormikContext } from "formik";
import { FormValues } from "./types";
import { useState } from "react";
import AttachFileIcon from "@mui/icons-material/AttachFile";

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

  // State to manage image preview
  const [previewUrls, setPreviewUrls] = useState<{
    [key: string]: string | null;
  }>({});

  return (
    <>
      <Typography component="legend" sx={{ fontWeight: "bold" }}>
        {legendTitle || "Documents"}
      </Typography>

      {documentTypes.map((doc) => (
        <div style={{ display: "flex", alignItems: "center" }} key={doc.code}>
          <TextField
            fullWidth
            label={doc.name}
            name={`documents.${doc.code}.name`} // Formik path for name
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
            <img
              src={previewUrls[doc.code] || ""}
              alt="Preview"
              style={{ width: "50px", height: "50px", marginLeft: "8px" }}
            />
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
                  const file = event.currentTarget.files
                    ? event.currentTarget.files[0]
                    : null;
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
    </>
  );
};

export default BusinessDocuments;
