import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// Async thunk to fetch menu items
export const fetchMenuItem = createAsyncThunk("menu/fetchMenuItems", async (_, thunkAPI) => {
  try {
    // Assuming you want to fetch from a live API endpoint
    const res = await axios.get("https://digital-dinner-new.onrender.com/api/menu", {
      withCredentials: true,  // If you need to send credentials (like cookies or tokens)
    });
    return res.data;
  } catch (error) {
    console.log('Fetch Error:', error.response?.data || error.message || error);
    // Return the error in a structured way to be handled in the slice
    return thunkAPI.rejectWithValue(error.response?.data || "Failed to fetch menu");
  }
});

// Menu slice to manage state related to menu items
const menuSlice = createSlice({
  name: "menu",
  initialState: {
    items: [],   // List of menu items
    loading: false,  // Loading state
    error: null,  // Error state
  },
  reducers: {},  // You can add any reducers if needed
  extraReducers: (builder) => {
    builder
      // Handle the pending state of the async thunk
      .addCase(fetchMenuItem.pending, (state) => {
        state.loading = true;
        state.error = null;  // Reset previous errors when fetching starts
      })
      // Handle the fulfilled state of the async thunk
      .addCase(fetchMenuItem.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;  // Set the fetched items
      })
      // Handle the rejected state of the async thunk
      .addCase(fetchMenuItem.rejected, (state, action) => {
        state.loading = false;
        // If `action.payload` contains the error message from the thunk, use it
        state.error = action.payload || action.error.message;
      });
  },
});

export default menuSlice.reducer;
