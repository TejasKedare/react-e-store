import type { User } from "../types/users.types";

const USERS_KEY = "users";
const AUTH_USER_KEY = "authUser";

export const signup = (user: User) => {
  const users: User[] = JSON.parse(
    localStorage.getItem(USERS_KEY) || "[]"
  );

  const exists = users.some(
    (u) => u.username === user.username
  );

  if (exists) {
    throw new Error("User already exists");
  }

  users.push(user);
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
};

export const login = (username: string, password: string) => {
  const users: User[] = JSON.parse(
    localStorage.getItem(USERS_KEY) || "[]"
  );

  const user = users.find(
    (u) => u.username === username && u.password === password
  );

  if (!user) {
    throw new Error("Invalid credentials");
  }

  localStorage.setItem(
    AUTH_USER_KEY,
    JSON.stringify({ username: user.username, email: user.email })
  );
};

export const logout = () => {
  localStorage.removeItem(AUTH_USER_KEY);
};

export const getAuthUser = () => {
  return JSON.parse(
    localStorage.getItem(AUTH_USER_KEY) || "null"
  );
};
