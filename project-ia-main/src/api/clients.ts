import axios from "axios";
import { Cliente } from '../models/models';


export const getClient = async (): Promise<Cliente[]> => {
    try {
      const response = await axios.get(`/api/clientes`);
      return Array.isArray(response.data) ? response.data : [];
    } catch (error) {
      console.error("Failed to get clients:", error);
      return []; 
    }
  };

export const postClient = async (Name: string, Empresa: string) => {
    try {
      const response = await axios.post(`/api/clientes`, {
        Name,
        Empresa,
      });
      return response.data
    } catch (error) {
      throw new Error("Failed to post clients");
    }
  };

export const putClient = async (id: number, updatedData: Partial<Cliente>) => {
    try {
      const response = await axios.put(`/api/clientes/${id}`, updatedData);
      return response.data;
    } catch (error) {
      throw new Error("Failed to update client");
    }
  };
