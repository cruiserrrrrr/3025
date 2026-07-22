import { createAsyncThunk } from "@reduxjs/toolkit";
import JobsService from "@/shared/services/JobsService";

export const fetchJobs = createAsyncThunk(
    "jobs/fetchJobs",
    async (_, { rejectWithValue }) => {
        try {
            return await JobsService.getJobs();
        } catch (error) {
            return rejectWithValue((error as Error).message);
        }
    },
);

export const createJob = createAsyncThunk(
    "jobs/createJob",
    async (urls: string[], { rejectWithValue }) => {
        try {
            return await JobsService.createJob(urls);
        } catch (error) {
            return rejectWithValue((error as Error).message);
        }
    },
);

export const fetchJobDetail = createAsyncThunk(
    "jobs/fetchJobDetail",
    async (id: string, { rejectWithValue }) => {
        try {
            return await JobsService.getJob(id);
        } catch (error) {
            return rejectWithValue((error as Error).message);
        }
    },
);

export const cancelJob = createAsyncThunk(
    "jobs/cancelJob",
    async (id: string, { rejectWithValue }) => {
        try {
            return await JobsService.cancelJob(id);
        } catch (error) {
            return rejectWithValue((error as Error).message);
        }
    },
);
