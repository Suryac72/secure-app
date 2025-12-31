// src/utils/tokenManager.ts

let accessToken: string | null = null;

export const tokenManager = {
  get: (): string | null => accessToken,

  set: (token: string): void => {
    accessToken = token;
  },

  clear: (): void => {
    accessToken = null;
  }
};
