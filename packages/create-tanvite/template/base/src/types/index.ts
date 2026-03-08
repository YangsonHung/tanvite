// ---- API 通用响应结构 ----
export interface ApiResponse<T> {
  data: T;
  message: string;
  code: number;
}

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
}

// ---- 通用工具类型 ----

/** 将对象的某些字段变为可选 */
export type PartialBy<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

/** 将对象的某些字段变为必填 */
export type RequiredBy<T, K extends keyof T> = Omit<T, K> & Required<Pick<T, K>>;
