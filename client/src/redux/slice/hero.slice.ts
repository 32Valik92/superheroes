import {IHero} from "../../interfaces";
import {createAsyncThunk, createSlice, isFulfilled} from "@reduxjs/toolkit";
import {heroService} from "../../services";
import {AxiosError} from "axios";
import {IPagination} from "../../interfaces/pagination.interface";

interface IState {
    heroes: IHero[],
    page: number;
    trigger: boolean,
    heroForUpdate: IHero
    chosenHero: IHero
}

const initialState: IState = {
    heroes: [],
    page: 1,
    trigger: false,
    heroForUpdate: null,
    chosenHero: null
}

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

const update = createAsyncThunk<void, { hero: IHero, id: string }>(
    'heroSlice/update',
    async ({id, hero}, {rejectWithValue}) => {
        try {
            await heroService.updateById(id, hero)
        } catch (e) {
            const err = e as AxiosError;
            return rejectWithValue(err.response.data);
        }
    }
)

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
)

const slice = createSlice({
    name: 'heroSlice',
    initialState,
    reducers: {
        setHeroForUpdate: (state, action) => {
            state.heroForUpdate = action.payload
        }
    },
    extraReducers: builder =>
        builder
            .addCase(getAll.fulfilled, (state, action) => {
                const {page, data} = action.payload;
                state.heroes = data;
                state.page = page;
            })
            .addCase(getHeroById.fulfilled, (state, action) => {
                state.chosenHero = action.payload;
            })
            .addCase(update.fulfilled, state => {
                state.heroForUpdate = null;
            })
            .addMatcher(isFulfilled(create, update, deleteHero), state => {
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
    deleteHero
}

export {
    heroesActions,
    heroesReducer
}