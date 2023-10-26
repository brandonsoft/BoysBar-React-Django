import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const STORE_URL = 'http://localhost:8000/bars';
const CAST_URL = "http://localhost:8000/bars";

export const fetchSuggestStore = createAsyncThunk(
  'stores/suggest',
  async () => {
    const res = await axios.get(`${STORE_URL}/bars_suggest`);    
    return res.data;
  }
)

export const searchStore = createAsyncThunk(
  'stores/search',
  async (query) => {
    const res = await axios.get(`${STORE_URL}/bars_search`, {
      params: query
      // params: encodeURIComponent(query)
    });
    return res.data;
  }
)

export const fetchStore = createAsyncThunk(
  'stores/fetch',
  async () => {
    const res = await axios.get(`${STORE_URL}/bars_suggest`);
    return res.data;
  }
)

export const fetchCasts = createAsyncThunk(
  'cast/fetch',
  async () => {
    const res = await axios.get(`${CAST_URL}/casts_suggest`);
    return res.data;
  }
)

export const searchCasts = createAsyncThunk(
  'cast/search',
  async (query) => {
    const res = await axios.get(`${CAST_URL}/casts_search`,{
      params: query
    });
    return res.data;
  }
)

const initialState = {
  stores: [],
  suggest_stores: [],
  casts: [],
  prefectures: [],
  features: [],
  keyword: ''
}

const storesSlice = createSlice({
  name: 'stores',
  initialState,
  reducers: {
    updatePrefectures: (state, action) => {
      state.prefectures = action.payload;
    },
    addPrefecture: (state, action) => {
      state.prefectures.push(action.payload);
    },
    removePrefecture: (state, action) => {
      state.prefectures = state.prefectures.filter(item => item.id != action.payload);
    },

    updateFeatures: (state, action) => {
      state.features = action.payload;
    },
    addFeature: (state, action) => {
      state.features.push(action.payload);
    },
    removeFeature: (state, action) => {
      state.features = state.features.filter(item => item.id != action.payload);
    },

    changeKeyword: (state, action) => {
      state.keyword = action.payload;
    }
  },
  extraReducers: (builder) => {
      builder.addCase(fetchSuggestStore.fulfilled, (state, action) => {
        state.stores = action.payload;
      }),      
      builder.addCase(fetchStore.fulfilled, (state, action) => {
        state.stores = action.payload;
      }),
      builder.addCase(searchStore.fulfilled, (state, action) => {
        state.stores = action.payload;
      }),
      builder.addCase(fetchStore.rejected, (state, action) => {
        state.filterStores = [];
      }),

      builder.addCase(fetchCasts.fulfilled, (state, action) => {
        state.casts = action.payload;
      }),
      builder.addCase(searchCasts.fulfilled, (state, action) => {
        state.casts = action.payload;
      })
  },
});

export const {
  addPrefecture,
  removePrefecture,
  updatePrefectures,

  addFeature,
  removeFeature,
  updateFeatures,

  changeKeyword,
} = storesSlice.actions;

export default storesSlice.reducer;