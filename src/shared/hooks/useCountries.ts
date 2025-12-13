import { useEffect, useState, useCallback } from "react";
import { COUNTRIES_LIST } from "../../constants";
import axios from "axios";
import api from "../../services/api";

interface Country {
  code: string;
  name: string;
}

export const useCountries = () => {
  const [countries, setCountries] = useState<Country[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCountries = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await api.get<Country[]>("/countries");
      setCountries(response.data);
    } catch (error) {
      console.log("Unable to fetch countries: ", error);
      setError("Failed to load countries list");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCountries();
  }, [fetchCountries]);

  return { countries, loading, error, retry: fetchCountries };
};
