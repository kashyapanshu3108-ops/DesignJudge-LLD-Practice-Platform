import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api"
});

export const getProblems = () =>
  api.get("/problems");

export const getProblem = (id) =>
  api.get(`/problems/${id}`);

export const createAttempt = (problemId) =>
  api.post("/attempts", { problemId });

export const submitAttempt = (id, data) =>
  api.post(`/attempts/${id}/submit`, data);

export const getAttempts = () =>
  api.get("/attempts");

export const getAttempt = (id) =>
  api.get(`/attempts/${id}`);

export default api;