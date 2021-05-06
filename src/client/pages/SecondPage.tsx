import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

import {
  fetchFullCharacterInfo,
  selectFullCharacter
} from '../state/starWars';

import type { match } from 'react-router-dom';
import { ReduxStore } from '../state/store';

const SecondPage = () => {
  const character = useSelector(selectFullCharacter);
  const params = useParams<{ id: string }>();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!character || character.id !== params.id) {
      dispatch(fetchFullCharacterInfo(params.id));
    }
  }, [params.id]);

  if (!character || character.id !== params.id) {
    return null;
  }

  return (
    <>
      <Helmet>
        <title>{character.name}</title>
        <meta name="description" content={`${character.name} from "Star Wars"`} />
      </Helmet>
      <h1>{ character.name }</h1>
      <p>Gender: {character.gender}</p>
      <p>Birth year: {character.birthYear}</p>
      <p>Eye color: {character.eyeColor}</p>      
    </>
  );
};

export const serverFetch = async ({match, store}: {match: match<{id: string}>, store: ReduxStore}) => {
  const characterId = match.params.id;
  return await store.dispatch(fetchFullCharacterInfo(characterId));
};

SecondPage.serverFetch = serverFetch;

export default SecondPage;
