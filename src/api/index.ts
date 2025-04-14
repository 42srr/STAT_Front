import axios from "axios";
import { ApiResponse, User, Project, LevelDistribution } from "../store/types";

const API_BASE_URL = "/api";

const createAuthHeader = (accessToken: string) => ({
  headers: { Authorization: `Bearer ${accessToken}` },
});

export const api = {
  // 사용자 정보 조회
  getUserInfo: async (accessToken: string, userId: string): Promise<User> => {
    const response = await axios.get<ApiResponse<User>>(
      `${API_BASE_URL}/users/${userId}`,
      createAuthHeader(accessToken)
    );
    return response.data.data;
  },

  // 사용자 프로젝트 조회
  getUserProjects: async (
    accessToken: string,
    userId: string
  ): Promise<Project[]> => {
    const response = await axios.get<ApiResponse<Project[]>>(
      `${API_BASE_URL}/users/${userId}/projects`,
      createAuthHeader(accessToken)
    );
    return response.data.data;
  },

  // 월렛 랭킹 조회
  getWalletRanking: async (
    accessToken: string,
    size: number = 5
  ): Promise<User[]> => {
    const response = await axios.get<ApiResponse<User[]>>(
      `${API_BASE_URL}/users/ranking?type=wallet&size=${size}`,
      createAuthHeader(accessToken)
    );
    return response.data.data;
  },

  // 평가 포인트 랭킹 조회
  getPointRanking: async (
    accessToken: string,
    size: number = 5
  ): Promise<User[]> => {
    const response = await axios.get<ApiResponse<User[]>>(
      `${API_BASE_URL}/users/ranking?type=correction-point&size=${size}`,
      createAuthHeader(accessToken)
    );
    return response.data.data;
  },

  // 프로젝트 분포 조회
  getProjectDistribution: async (accessToken: string) => {
    const response = await axios.get<
      ApiResponse<{ distribution: Record<string, number> }>
    >(`${API_BASE_URL}/projects/distribution`, createAuthHeader(accessToken));

    // API 응답 형식 변환
    const distribution = response.data.data.distribution;
    return Object.keys(distribution).map((projectName) => ({
      projectName,
      count: parseInt(distribution[projectName].toString()),
    }));
  },

  // 레벨 분포 조회
  getLevelDistribution: async (
    accessToken: string
  ): Promise<LevelDistribution[]> => {
    const response = await axios.get<
      ApiResponse<{ distribution: Record<string, number> }>
    >(
      `${API_BASE_URL}/users/distribution/level`,
      createAuthHeader(accessToken)
    );

    // API 응답 형식 변환
    const distribution = response.data.data.distribution;
    return Object.keys(distribution).map((level) => ({
      level: parseFloat(level),
      count: distribution[level],
    }));
  },
};
