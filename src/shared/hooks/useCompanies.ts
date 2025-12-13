import axios from "axios";
import api from "../../services/api";
import { COMPANIES_LIST } from "../../constants";
import { useCallback, useEffect, useState } from "react";

interface Company {
  id: number;
  name: string;
  country?: string;
}

export const useCompanies = () => {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [error, setError] = useState<string | null>(null);

  const fetchCompanies = useCallback(async () => {
    try {
      setError(null);
      const response = await api.get<Company[]>("/companies");
      setCompanies(response.data);
    } catch (err: any) {
      const message =
        err.response?.data?.message ||
        err.message ||
        "Failed to fetch companies";
      setError(message);
    }
  }, []);

  useEffect(() => {
    fetchCompanies();
  }, [fetchCompanies]);

  return { companies, error, retry: fetchCompanies };
};
