import React from 'react';
import { hot, AppContainer } from 'react-hot-loader';
import Stub from './Stub';

const App = () => (
  <AppContainer key={Math.random()}>
    <Stub />
  </AppContainer>
);

export default hot(module)(App);
