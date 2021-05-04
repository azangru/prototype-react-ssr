import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import {
  fetchAllCharacters,
  selectAllCharacters
} from '../state/starWars';

// @ts-expect-error
import reactIconUrl from '../images/react-icon.png';

import { ReduxStore } from '../state/store';
import { Link } from 'react-router-dom';

const MainPage = () => {
  const characters = useSelector(selectAllCharacters);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!characters.length) {
      dispatch(fetchAllCharacters());
    }
  }, []);

  return (
    <>
      <div>
        <p>
          An image to test image loading
        </p>
        <img className="test-image" src={reactIconUrl} />
      </div>
      <div>
        <p>A list of Star Wars characters</p>
        <ul>
          { characters.map((character) => (
            <li key={character.name}>
              <Link to={`/character/${character.id}`}>
                { character.name } from { character.homeworld.name }
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

const serverFetch = async ({ store }: { store: ReduxStore }) => {
  return await store.dispatch(fetchAllCharacters());
};

MainPage.serverFetch = serverFetch;

export default MainPage;
