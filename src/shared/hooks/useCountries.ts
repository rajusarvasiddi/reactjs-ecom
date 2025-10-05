import { useEffect, useState, useCallback } from "react";
import { COUNTRIES_LIST } from "../../constants";
import axios from "axios";

interface Country {
  code: string;
  name: string;
}

export const useCountries = () => {
  const [countries, setCountries] = useState<Country[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  const fetchCountries = useCallback(async () => {
    setLoading(true);
    setError("");

    try {
      const response = await axios.get(COUNTRIES_LIST);
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
