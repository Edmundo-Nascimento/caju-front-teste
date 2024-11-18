import { create } from "zustand";
import buildHttpRequestQueryParams from "~/formatters/build-http-request-query-params";
import httpClient from "~/services/http-client";
import { RegistrationProps } from "~/types";

export interface RegistrationStore {
  registrations: RegistrationProps[];
  isLoading: boolean;
  error: string | null;
  setRegistrations: (data: RegistrationProps[]) => void;
  fetchRegistration: (query?: any) => Promise<void>;
  createRegistration: (payload: RegistrationProps) => Promise<void>;
  updateRegistration: (registrationId: string, newStatus: string) => Promise<void>;
  deleteRegistration: (registrationId: string) => Promise<void>;
}

const useRegistrationStore = create<RegistrationStore>((set) => ({
  registrations: [],
  isLoading: false,
  error: null,
  setRegistrations: (data: RegistrationProps[]) => set({ registrations: data }),

  fetchRegistration: async (query: any) => {
    const params = buildHttpRequestQueryParams(query);

    set((state) => ({ ...state, registrations: [], isLoading: true, error: null }));

    await Promise.resolve();

    try {
      const response = await httpClient.get(`?${params}`);
      set((state) => ({
        ...state,
        registrations: response.data, // Atualiza com os dados recebidos
        isLoading: false,
      }));
    } catch (error: any) {
      set({ error: error.message, isLoading: false });
    }
  },

  createRegistration: async (payload: RegistrationProps) => {
    set({ isLoading: true, error: null });
    try {
      await httpClient.post('', payload);
      set({ isLoading: false });
    } catch (error: any) {
      set({ error: error.message, isLoading: false });
    }
  },

  updateRegistration: async (registrationId: string, newStatus: string) => {
    set({ isLoading: true, error: null });
    try {
      await httpClient.patch(`/${registrationId}`, JSON.stringify({ status: newStatus }));
      set({ isLoading: false });
    } catch (error: any) {
      set({ error: error.message, isLoading: false });
    }
  },

  deleteRegistration: async (registrationId: string,) => {
    set({ isLoading: true, error: null });
    try {
      await httpClient.delete(`/${registrationId}`);
      set({ isLoading: false });
    } catch (error: any) {
      set({ error: error.message, isLoading: false });
    }
  },
}));

export default useRegistrationStore;
