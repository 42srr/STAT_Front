import { create } from "zustand";
import {
  StoreState,
  User,
  Project,
  ProjectDistribution,
  LevelDistribution,
} from "./types";
import { api } from "../api";

export const useDataStore = create<StoreState>((set, get) => ({
  // 사용자 정보 상태
  userInfo: {
    data: null,
    loading: false,
    error: null,
  },

  // 사용자 프로젝트 상태
  userProjects: {
    data: [],
    loading: false,
    error: null,
  },

  // 월렛 랭킹 상태
  walletRanking: {
    data: [],
    loading: false,
    error: null,
  },

  // 포인트 랭킹 상태
  pointRanking: {
    data: [],
    loading: false,
    error: null,
  },

  // 프로젝트 분포 상태
  projectDistribution: {
    data: [],
    loading: false,
    error: null,
  },

  // 레벨 분포 상태
  levelDistribution: {
    data: [],
    loading: false,
    error: null,
  },

  // 사용자 정보 조회
  fetchUserInfo: async (accessToken: string, intraId: string) => {
    try {
      set((state) => ({
        userInfo: {
          ...state.userInfo,
          loading: true,
          error: null,
        },
      }));

      const data = await api.getUserInfo(accessToken, intraId);

      set((state) => ({
        userInfo: {
          data,
          loading: false,
          error: null,
        },
      }));
    } catch (error: any) {
      set((state) => ({
        userInfo: {
          ...state.userInfo,
          loading: false,
          error: error.message || "사용자 정보를 불러오는데 실패했습니다.",
        },
      }));
    }
  },

  // 사용자 프로젝트 조회
  fetchUserProjects: async (accessToken: string, intraId: string) => {
    try {
      set((state) => ({
        userProjects: {
          ...state.userProjects,
          loading: true,
          error: null,
        },
      }));

      const data = await api.getUserProjects(accessToken, intraId);

      set((state) => ({
        userProjects: {
          data,
          loading: false,
          error: null,
        },
      }));
    } catch (error: any) {
      set((state) => ({
        userProjects: {
          ...state.userProjects,
          loading: false,
          error: error.message || "사용자 프로젝트를 불러오는데 실패했습니다.",
        },
      }));
    }
  },

  // 월렛 랭킹 조회
  fetchWalletRanking: async (accessToken: string) => {
    try {
      set((state) => ({
        walletRanking: {
          ...state.walletRanking,
          loading: true,
          error: null,
        },
      }));

      const data = await api.getWalletRanking(accessToken);

      set((state) => ({
        walletRanking: {
          data,
          loading: false,
          error: null,
        },
      }));
    } catch (error: any) {
      set((state) => ({
        walletRanking: {
          ...state.walletRanking,
          loading: false,
          error: error.message || "월렛 랭킹을 불러오는데 실패했습니다.",
        },
      }));
    }
  },

  // 포인트 랭킹 조회
  fetchPointRanking: async (accessToken: string) => {
    try {
      set((state) => ({
        pointRanking: {
          ...state.pointRanking,
          loading: true,
          error: null,
        },
      }));

      const data = await api.getPointRanking(accessToken);

      set((state) => ({
        pointRanking: {
          data,
          loading: false,
          error: null,
        },
      }));
    } catch (error: any) {
      set((state) => ({
        pointRanking: {
          ...state.pointRanking,
          loading: false,
          error: error.message || "포인트 랭킹을 불러오는데 실패했습니다.",
        },
      }));
    }
  },

  // 프로젝트 분포 조회
  fetchProjectDistribution: async (accessToken: string) => {
    try {
      set((state) => ({
        projectDistribution: {
          ...state.projectDistribution,
          loading: true,
          error: null,
        },
      }));

      const data = await api.getProjectDistribution(accessToken);

      set((state) => ({
        projectDistribution: {
          data,
          loading: false,
          error: null,
        },
      }));
    } catch (error: any) {
      set((state) => ({
        projectDistribution: {
          ...state.projectDistribution,
          loading: false,
          error: error.message || "프로젝트 분포를 불러오는데 실패했습니다.",
        },
      }));
    }
  },

  // 레벨 분포 조회
  fetchLevelDistribution: async (accessToken: string) => {
    try {
      set((state) => ({
        levelDistribution: {
          ...state.levelDistribution,
          loading: true,
          error: null,
        },
      }));

      const data = await api.getLevelDistribution(accessToken);

      set((state) => ({
        levelDistribution: {
          data,
          loading: false,
          error: null,
        },
      }));
    } catch (error: any) {
      set((state) => ({
        levelDistribution: {
          ...state.levelDistribution,
          loading: false,
          error: error.message || "레벨 분포를 불러오는데 실패했습니다.",
        },
      }));
    }
  },
}));
