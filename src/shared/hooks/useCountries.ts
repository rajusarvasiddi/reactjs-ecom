import { useEffect, useState } from "react";
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

  useEffect(() => {
    const fetchCountries = async () => {
      setLoading(true);
      try {
        const response = await axios.get(COUNTRIES_LIST);
        setCountries(response.data);
      } catch (error) {
        console.log("Unable to fetch countries: ", error);
        setError("Failed to load countries list");
      } finally {
        setLoading(false);
      }
    };
    fetchCountries();
  }, []);

  return { countries, loading, error };
};
