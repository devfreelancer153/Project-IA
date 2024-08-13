import axios from "axios";
import { Maquina } from '../models/models';

export const getMaquinas = async (): Promise<Maquina[]> => {
    try {
      const response = await axios.get(`/api/maquinas`);
      return Array.isArray(response.data) ? response.data : [];
    } catch (error) {
      console.error("Failed to get machines:", error);
      return []; 
    }
  };
