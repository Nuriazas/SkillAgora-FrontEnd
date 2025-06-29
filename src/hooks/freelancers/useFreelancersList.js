import { useState, useCallback, useEffect } from "react";
import { freelancerService } from "../../services/getAllFreelancersService.js";
import { CreateService } from "../../services/services/createServiceService.js";

export const useFreelancersList = () => {
  const [freelancers, setFreelancers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchFreelancers = useCallback(async () => {
    try {
      setLoading(true);
      const data = await freelancerService.getAll();
      setFreelancers(data);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchFreelancers();
  }, [fetchFreelancers]);

  const handleCreateService = useCallback(async (serviceData) => {
    try {
      setLoading(true);
      const { category_name, title, description, price, place, img } = serviceData;
      const newService = await CreateService.create({
        category_name,
        title,
        description,
        price,
        place,
        img
      });
      setFreelancers((prev) => [...prev, newService]);
      return {
        category_name,
        title,
        description,
        price,
        place,
        img
      };
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    freelancers,
    loading,
    error,
    setFreelancers,
    handleCreateService,
    refreshFreelancers: fetchFreelancers,
  };
};
