export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: "/auth/login",
    REGISTER: "/auth/register",
    PROFILE: "/auth/profile",
  },

  USERS: {
    PROFILE: "/users/profile",
  },

  SKILLS: {
    BASE: "/skills",
  },

  EXCHANGE: {
    BASE: "/exchange",
  },

  REVIEWS: {
    BASE: "/reviews",
  },

  NOTIFICATIONS: {
    BASE: "/notifications",
  },
} as const;