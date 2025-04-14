import { create } from "zustand";
import axios from "axios";

interface Project {
  // 프로젝트 관련 필드 정의
  [key: string]: any;
}

interface User {
  // 사용자 관련 필드 정의
  [key: string]: any;
}

interface Level {
  // 레벨 관련 필드 정의
  [key: string]: any;
}

interface Wallet {
  // 지갑 관련 필드 정의
  [key: string]: any;
}

interface DataState {
  allProjects: {
    data: Project[];
    loading: boolean;
    error: string | null;
    fetchData: (accessToken: string) => Promise<void>;
  };
  allWallet: {
    data: Wallet[];
    loading: boolean;
    error: string | null;
    fetchData: (accessToken: string) => Promise<void>;
  };
  allLevels: {
    data: Level[];
    loading: boolean;
    error: string | null;
    fetchData: (accessToken: string) => Promise<void>;
  };
  allUsers: {
    data: User[];
    loading: boolean;
    error: string | null;
    fetchData: (accessToken: string) => Promise<void>;
  };
  userProjects: {
    data: Project[];
    loading: boolean;
    error: string | null;
    fetchData: (accessToken: string, intraId: string) => Promise<void>;
  };
  userInfo: {
    data: User | null;
    loading: boolean;
    error: string | null;
    fetchData: (accessToken: string, intraId: string) => Promise<void>;
  };
}

export const useDataStore = create<DataState>((set) => ({
  allProjects: {
    data: [],
    loading: false,
    error: null,
    fetchData: async (accessToken: string) => {
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
    fetchData: async (accessToken: string) => {
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
    fetchData: async (accessToken: string) => {
      set((state) => ({
        allLevels: { ...state.allLevels, loading: true },
      }));
      const response = await axios.get("/api/levels", {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      set((state) => ({
        allLevels: {
          ...state.allLevels,
          data: response.data.data.levelResponseList,
          loading: false,
        },
      }));
    },
  },
  allUsers: {
    data: [],
    loading: false,
    error: null,
    fetchData: async (accessToken: string) => {
      set((state) => ({
        allUsers: { ...state.allUsers, loading: true },
      }));
      const response = await axios.get("/api/users", {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      set((state) => ({
        allUsers: {
          ...state.allUsers,
          data: response.data.data.users,
          loading: false,
        },
      }));
    },
  },
  userProjects: {
    data: [],
    loading: false,
    error: null,
    fetchData: async (accessToken: string, intraId: string) => {
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
    data: null,
    loading: false,
    error: null,
    fetchData: async (accessToken: string, intraId: string) => {
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
      } catch (error: any) {
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
