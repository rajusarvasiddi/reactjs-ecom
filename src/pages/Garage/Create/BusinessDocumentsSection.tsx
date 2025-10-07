// BusinessDocumentsSection.tsx
import { TextField, Typography } from "@mui/material";
import { useFormikContext } from "formik";
import { FormValues } from "./types";

export interface BusinessDocumentsSectionProps {
  documentTypes: { code: string; name: string }[];
}

const BusinessDocuments = ({
  documentTypes,
}: BusinessDocumentsSectionProps) => {
  const { values, handleChange, touched, errors } =
    useFormikContext<FormValues>();

  return (
    <>
      <Typography component="legend" sx={{ fontWeight: "bold" }}>
        Business Registration Documents
      </Typography>

      {documentTypes.map((doc) => (
        <TextField
          key={doc.code}
          fullWidth
          label={doc.name}
          name={`documents.${doc.code}`} // Formik path
          value={values.documents?.[doc.code] || ""}
          onChange={handleChange}
          error={
            touched.documents?.[doc.code] &&
            Boolean(errors.documents?.[doc.code])
          }
          helperText={
            touched.documents?.[doc.code] && errors.documents?.[doc.code]
          }
          margin="dense"
          size="small"
        />
      ))}
    </>
  );
};

export default BusinessDocuments;
