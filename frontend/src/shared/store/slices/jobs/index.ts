import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IJobDetail, IJobSummary } from "@/shared/types/jobs";
import { RootState } from "../../store";
import { cancelJob, createJob, fetchJobDetail, fetchJobs } from "./thunks";

interface IJobsState {
    list: IJobSummary[];
    listLoading: boolean;
    selectedId: string | null;
    detail: IJobDetail | null;
    detailLoading: boolean;
    submitting: boolean;
    error: string | null;
}

const initialState: IJobsState = {
    list: [],
    listLoading: false,
    selectedId: null,
    detail: null,
    detailLoading: false,
    submitting: false,
    error: null,
};

const jobsSlice = createSlice({
    name: "jobs",
    initialState,
    reducers: {
        selectJob: (state, action: PayloadAction<string>) => {
            state.selectedId = action.payload;
            state.detail = null;
        },
        clearError: (state) => {
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchJobs.pending, (state) => {
            state.listLoading = true;
        });
        builder.addCase(fetchJobs.fulfilled, (state, action) => {
            state.list = action.payload;
            state.listLoading = false;
        });
        builder.addCase(fetchJobs.rejected, (state, action) => {
            state.listLoading = false;
            state.error = action.payload as string;
        });

        builder.addCase(createJob.pending, (state) => {
            state.submitting = true;
            state.error = null;
        });
        builder.addCase(createJob.fulfilled, (state, action) => {
            state.submitting = false;
            state.selectedId = action.payload.jobId;
            state.detail = null;
        });
        builder.addCase(createJob.rejected, (state, action) => {
            state.submitting = false;
            state.error = action.payload as string;
        });

        builder.addCase(fetchJobDetail.pending, (state) => {
            state.detailLoading = true;
        });
        builder.addCase(fetchJobDetail.fulfilled, (state, action) => {
            state.detail = action.payload;
            state.detailLoading = false;
        });
        builder.addCase(fetchJobDetail.rejected, (state) => {
            state.detailLoading = false;
        });

        builder.addCase(cancelJob.fulfilled, (state, action) => {
            state.detail = action.payload;
        });
    },
});

export const { selectJob, clearError } = jobsSlice.actions;

export const selectJobsList = (state: RootState) => state.jobsSlice.list;
export const selectJobsListLoading = (state: RootState) =>
    state.jobsSlice.listLoading;
export const selectSelectedId = (state: RootState) =>
    state.jobsSlice.selectedId;
export const selectJobDetail = (state: RootState) => state.jobsSlice.detail;
export const selectSubmitting = (state: RootState) =>
    state.jobsSlice.submitting;
export const selectJobsError = (state: RootState) => state.jobsSlice.error;

export default jobsSlice.reducer;
