import {
  createSlice,
  createAsyncThunk
} from '@reduxjs/toolkit';
import { request, gql } from 'graphql-request';

import { RootState } from './store';

export const fetchAllCharacters = createAsyncThunk(
  'starwars/fetchAllCharacters',
  async () => {
    const query = gql`
    {
      allPeople {
        edges {
          node {
            id,
            name
            homeworld {
              name
            }
          }
        }
      }
    }`;
    const response = await request('http://localhost:8080/starwars-graphql', query);
    const allCharacters = response.allPeople.edges.map((edge: any) => edge.node);
    return allCharacters;
  }
);

export const fetchFullCharacterInfo = createAsyncThunk(
  'starwars/fetchFullCharacterInfo',
  async (id: string) => {
    const query = gql`
      {
        person (id: "${id}") {
          id
          name
          birthYear
          gender
          eyeColor
          height
          mass 
          homeworld {
            name
          }
        }
      }
    `;
    const response = await request('http://localhost:8080/starwars-graphql', query);
    return response.person;
  }
);

type StarWarsState = {
  characters: Array<{
    id: string,
    name: string,
    homeworld: {
      name: string
    }
  }>,
  fullCharacter: {
    id: string;
    name: string;
    birthYear: string;
    gender: string;
    eyeColor: string;
    height: number;
    mass: number;
    homeworld: {
      name: string;
    }
  } | null;
};

const initialState: StarWarsState = {
  characters: [],
  fullCharacter: null
};

const starWarsSlice = createSlice({
  name: 'starwars',
  initialState,
  reducers: {
    // standard reducer logic, with auto-generated action types per reducer
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAllCharacters.fulfilled, (state, action) => {
      state.characters = action.payload;
    });
    builder.addCase(fetchFullCharacterInfo.pending, (state) => {
      state.fullCharacter = null;
    });
    builder.addCase(fetchFullCharacterInfo.fulfilled, (state, action) => {
      state.fullCharacter = action.payload;
    });
  }
});

export const selectAllCharacters = (state: RootState) => state.starWars.characters;
export const selectFullCharacter = (state: RootState) => state.starWars.fullCharacter;

export default starWarsSlice.reducer;
