import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { FetchDataCacheProvider } from './lib/fetchDataCache';

test('renders learn react link', () => {
  render(
    <FetchDataCacheProvider>
      <BrowserRouter>
        <App/>
      </BrowserRouter>
    </FetchDataCacheProvider>
  );
  const linkElement = screen.getByText('Signup');
  expect(linkElement).toBeInTheDocument();
});
