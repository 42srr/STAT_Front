import { create } from "zustand";
import axios from "axios";

export const useDataStore = create((set) => ({
  allProjects: {
    data: [],
    loading: false,
    error: null,
    fetchData: async (accessToken) => {
      set((state) => ({
        allProjects: { ...state.allProjects, loading: true },
      }));
      const response = await axios.get("/api/projects", {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      set((state) => ({
        allProjects: {
          ...state.allProjects,
          data: response.data.data,
          loading: false,
        },
      }));
    },
  },
  allWallet: {
    data: [],
    loading: false,
    error: null,
    fetchData: async (accessToken) => {
      set((state) => ({
        allWallet: { ...state.allWallet, loading: true },
      }));
      const response = await axios.get("/api/ranking/wallet", {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      set((state) => ({
        allWallet: {
          ...state.allWallet,
          data: response.data.data,
          loading: false,
        },
      }));
    },
  },
  allLevels: {
    data: [],
    loading: false,
    error: null,
    fetchData: async (accessToken) => {
      set((state) => ({
        allLevels: { ...state.allLevels, loading: true },
      }));
      const response = await axios.get("/api/levels", {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      set((state) => ({
        allLevels: {
          ...state.allLevels,
          data: response.data.data,
          loading: false,
        },
      }));
    },
  },
  allUsers: {
    data: [],
    loading: false,
    error: null,
    fetchData: async (accessToken) => {
      set((state) => ({
        allUsers: { ...state.allUsers, loading: true },
      }));
      const response = await axios.get("/api/users", {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      set((state) => ({
        allUsers: {
          ...state.allUsers,
          data: response.data.data,
          loading: false,
        },
      }));
    },
  },
  userProjects: {
    data: [],
    loading: false,
    error: null,
    fetchData: async (accessToken, intraId) => {
      set((state) => ({
        userProjects: { ...state.userProjects, loading: true },
      }));
      const response = await axios.get(`/api/projects/${intraId}`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      set((state) => ({
        userProjects: {
          ...state.userProjects,
          data: response.data.data,
          loading: false,
        },
      }));
    },
  },
  userInfo: {
    data: [],
    loading: false,
    error: null,
    fetchData: async (accessToken, intraId) => {
      try {
        set((state) => ({
          userInfo: { ...state.userInfo, loading: true },
        }));

        const response = await axios.get(`/api/users/${intraId}`, {
          headers: { Authorization: `Bearer ${accessToken}` },
        });

        set((state) => ({
          userInfo: {
            ...state.userInfo,
            data: response.data.data,
            loading: false,
          },
        }));
      } catch (error) {
        set((state) => ({
          userInfo: {
            ...state.userInfo,
            error: error.message,
            loading: false,
          },
        }));
      }
    },
  },
}));
