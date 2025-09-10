import React, { useState } from 'react';
import UrlShortenerForm from './components/UrlShortenerForm';
import UrlList from './components/UrlList';
import './App.css'; 

function App() {
  const [shortenedUrls, setShortenedUrls] = useState([]);

  const handleUrlShortened = (newUrl) => {
    setShortenedUrls([newUrl, ...shortenedUrls]);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Affordmed URL Shortener</h1>
      </header>
      <main>
        <UrlShortenerForm onUrlShortened={handleUrlShortened} />
        <hr />
        <UrlList urls={shortenedUrls} />
      </main>
    </div>
  );
}

export default App;