import { createSlice, type PayloadAction } from "@reduxjs/toolkit"
import type { Job, User } from "@/types"

interface UserState {
  user: User
  savedJobs: Job[]
  appliedJobs: Job[]
}

const mockUser: User = {
  id: "1",
  name: "Albert Flores",
  email: "albert.flores@email.com",
  title: "Senior Product Designer | UI/UX Designer | Graphic Designer | Web...",
  location: "Clinton, Maryland",
  initials: "AF",
  stats: {
    profileVisitors: 140,
    resumeViewers: 20,
    myJobs: 88,
  },
}

const initialState: UserState = {
  user: mockUser,
  savedJobs: [],
  appliedJobs: [],
}

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    saveJob: (state, action: PayloadAction<Job>) => {
      const job = action.payload
      const isAlreadySaved = state.savedJobs.some((savedJob) => savedJob.id === job.id)

      if (!isAlreadySaved) {
        state.savedJobs.push({
          ...job,
          savedAt: new Date().toISOString(),
        })
      }
    },

    unsaveJob: (state, action: PayloadAction<string>) => {
      const jobId = action.payload
      state.savedJobs = state.savedJobs.filter((job) => job.id !== jobId)
    },

    applyToJob: (state, action: PayloadAction<Job>) => {
      const job = action.payload
      const hasAlreadyApplied = state.appliedJobs.some((appliedJob) => appliedJob.id === job.id)

      if (!hasAlreadyApplied) {
        state.appliedJobs.push({
          ...job,
          appliedAt: new Date().toISOString(),
          applicationStatus: "Under Review",
        })
      }
    },

    updateUser: (state, action: PayloadAction<Partial<User>>) => {
      state.user = { ...state.user, ...action.payload }
    },

    updateUserStats: (state, action: PayloadAction<Partial<User["stats"]>>) => {
      state.user.stats = { ...state.user.stats, ...action.payload }
    },
  },
})

export const { saveJob, unsaveJob, applyToJob, updateUser, updateUserStats } = userSlice.actions
export default userSlice.reducer
