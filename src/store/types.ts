/**
 * 공통 타입 정의
 * API: https://api.42srr.com/swagger-ui/index.html#/
 */

// 사용자 정보 타입
export interface User {
  id: number;
  intraId: string;
  level: number;
  wallet: number;
  collectionPoint: number;
  imgURL: string;
  updatable: boolean;
}

// 사용자 프로젝트 타입
export interface Project {
  projectId: number;
  projectName: string;
  finalMark: number;
  status: "FINISHED" | "IN_PROGRESS";
}

// 프로젝트 분포 데이터 타입
export interface ProjectDistribution {
  projectName: string;
  count: number;
}

// 레벨 분포 데이터 타입
export interface LevelDistribution {
  level: number;
  count: number;
}

// API 응답 공통 타입
export interface ApiResponse<T> {
  code: number;
  status: string;
  data: T;
}

// 로딩 상태를 포함하는 데이터 타입
export interface DataState<T> {
  data: T;
  loading: boolean;
  error: string | null;
}

// 스토어 상태 타입
export interface StoreState {
  // 사용자 정보
  userInfo: DataState<User | null>;

  // 사용자 프로젝트
  userProjects: DataState<Project[]>;

  // 월렛 랭킹
  walletRanking: DataState<User[]>;

  // 포인트 랭킹
  pointRanking: DataState<User[]>;

  // 프로젝트 분포
  projectDistribution: DataState<ProjectDistribution[]>;

  // 레벨 분포
  levelDistribution: DataState<LevelDistribution[]>;

  // 액션 함수들
  fetchUserInfo: (accessToken: string, intraId: string) => Promise<void>;
  refreshUserInfo: (accessToken: string, intraId: string) => Promise<void>;
  fetchUserProjects: (accessToken: string, intraId: string) => Promise<void>;
  fetchWalletRanking: (accessToken: string) => Promise<void>;
  fetchPointRanking: (accessToken: string) => Promise<void>;
  fetchProjectDistribution: (accessToken: string) => Promise<void>;
  fetchLevelDistribution: (accessToken: string) => Promise<void>;
}
