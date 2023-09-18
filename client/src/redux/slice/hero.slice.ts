import {createAsyncThunk, createSlice, isFulfilled} from "@reduxjs/toolkit";
import {AxiosError} from "axios";

import {IHero, IImage} from "../../interfaces";
import {heroService} from "../../services";
import {IPagination} from "../../interfaces";

interface IState {
    heroes: IHero[]; // Array of our heroes
    page: number;
    trigger: boolean;
    heroForUpdate: IHero; // The hero which we want to update
    chosenHero: IHero; // The hero which we have chosen
    itemsCount: number; // Count of all heroes
}

const initialState: IState = {
    heroes: [],
    page: 1,
    trigger: false,
    heroForUpdate: null,
    chosenHero: null,
    itemsCount: 0
}

// AsyncThunk for getting all info about pagination page
const getAll = createAsyncThunk<IPagination<IHero[]>, { page: number }>(
    'heroSlice/getAll',
    async ({page}, {rejectWithValue}) => {
        try {
            const {data} = await heroService.getAll(page);
            return data;
        } catch (e) {
            const err = e as AxiosError;
            return rejectWithValue(err.response.data);
        }
    }
);

// AsyncThunk for getting all information about chosen hero
const getHeroById = createAsyncThunk<IHero, { id: string }>(
    'heroSlice/getHeroById',
    async ({id}, {rejectWithValue}) => {
        try {
            const {data} = await heroService.getById(id);
            return data;
        } catch (e) {
            const err = e as AxiosError;
            return rejectWithValue(err.response.data);
        }
    }
)

// AsyncThunk for create a new hero
const create = createAsyncThunk<void, { hero: IHero }>(
    'heroSlice/create',
    async ({hero}, {rejectWithValue}) => {
        try {
            await heroService.create(hero);
        } catch (e) {
            const err = e as AxiosError;
            return rejectWithValue(err.response.data);
        }
    }
);

// AsyncThunk for update a hero
const update = createAsyncThunk<void, { hero: IHero, id: string }>(
    'heroSlice/update',
    async ({id, hero}, {rejectWithValue}) => {
        try {
            await heroService.updateById(id, hero);
        } catch (e) {
            const err = e as AxiosError;
            return rejectWithValue(err.response.data);
        }
    }
);

// AsyncThunk for delete a hero
const deleteHero = createAsyncThunk<void, { id: string }>(
    'heroSlice/deleteHero',
    async ({id}, {rejectWithValue}) => {
        try {
            await heroService.deleteById(id);
        } catch (e) {
            const err = e as AxiosError;
            return rejectWithValue(err.response.data);
        }
    }
);

// AsyncThunk for pushing image to hero which we have chosen
const pushImageById = createAsyncThunk<void, { id: string, imageData: IImage }>(
    'heroSlice/pushImageById',
    async ({id, imageData}, {rejectWithValue}) => {
        try {
            await heroService.pushImageById(id, imageData);
        } catch (e) {
            const err = e as AxiosError;
            return rejectWithValue(err.response.data);
        }
    }
);

// AsyncThunk for delete image from hero which we have chosen
const deleteImage = createAsyncThunk<void, { id: string, index: number }>(
    'heroSlice/deleteImage',
    async ({id, index}, {rejectWithValue}) => {
        try {
            await heroService.deleteImage(id, index);
        } catch (e) {
            const err = e as AxiosError;
            return rejectWithValue(err.response.data);
        }
    }
);

const slice = createSlice({
    name: 'heroSlice',
    initialState,
    reducers: {
        // Set hero to heroForUpdate
        setHeroForUpdate: (state, action) => {
            state.heroForUpdate = action.payload;
        }
    },
    extraReducers: builder =>
        builder
            // For getting main heroes list
            .addCase(getAll.fulfilled, (state, action) => {
                const {page, data, itemsCount} = action.payload;
                state.heroes = data;
                state.page = page;
                state.itemsCount = itemsCount;
            })
            // For getting info about specific hero
            .addCase(getHeroById.fulfilled, (state, action) => {
                state.chosenHero = action.payload;
            })
            // For nulling heroForUpdate
            .addCase(update.fulfilled, state => {
                state.heroForUpdate = null;
            })
            // For change trigger for rerender component
            .addMatcher(isFulfilled(create, update, deleteHero, pushImageById, deleteImage), state => {
                state.trigger = !state.trigger;
            })
            .addMatcher(isFulfilled(deleteHero), state => {
                state.heroForUpdate = null;
            })
});

const {reducer: heroesReducer, actions} = slice;

const heroesActions = {
    ...actions,
    getAll,
    getHeroById,
    create,
    update,
    deleteHero,
    pushImageById,
    deleteImage
}

export {
    heroesActions,
    heroesReducer
}