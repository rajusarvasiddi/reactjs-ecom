import axios from "axios";
import api from "../../services/api";
import { useCallback, useEffect, useState } from "react";
import { BUSINESS_DOCUMENTS_LIST } from "../../constants";

export interface DocumentType {
  code: string;
  name: string;
}

export const useBusinessDocumentTypes = () => {
  const [documentTypes, setDocumentTypes] = useState<DocumentType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchDocumentTypes = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await api.get<DocumentType[]>("/documents");
      setDocumentTypes(response.data);
    } catch (error) {
      console.log("Unable to fetch document types: ", error);
      setError("Failed to load document types");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchDocumentTypes();
  }, [fetchDocumentTypes]);

  return { documentTypes, loading, error, retry: fetchDocumentTypes };
};
