import React from 'react';

import './App.css';
import SearchBar from './../SearchBar/SearchBar';
import SearchResults from './../SearchResults/SearchResults';
import Playlist from './../Playlist/Playlist';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchResults: [
        { name: 'hello', artist: 'adele', album: 'hello', id: 100 },
        { name: 'hello2', artist: 'adele2', album: 'hello2', id: 101 },
        { name: 'hello3', artist: 'adele3', album: 'hello3', id: 102 },
      ],
      playlistName: 'my songz',
      playlistTracks: [
        { name: 'hello', artist: 'adeleeee', album: 'hello', id: 100 },
        { name: 'hello2', artist: 'adeleeee2', album: 'hello2', id: 101 },
        { name: 'hello3', artist: 'adeleee3', album: 'hello3', id: 102 },
      ],
    };
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
  }
  addTrack(track) {
    if (
      this.state.playlistTracks.find((savedTrack) => savedTrack.id === track.id)
    ) {
      return;
    } else {
      this.setState((state) => {
        const newplaylistTracks = state.playlistTracks.push(track);
        return { playlistTracks: newplaylistTracks };
      });
    }
  }
  removeTrack(track) {
    const newTracks = this.state.playlistTracks.filter(
      (currentTrack) => currentTrack.id !== track.id
    );
    this.setState({ playlistTracks: newTracks });
  }
  render() {
    return (
      <div>
        <h1>
          Ja<span className="highlight">mmm</span>ing
        </h1>
        <div className="App">
          <SearchBar />
          <div className="App-playlist">
            <SearchResults
              searchResults={this.state.searchResults}
              onAdd={this.addTrack}
            />
            <Playlist
              playlistName={this.state.playlistName}
              playlistTracks={this.state.playlistTracks}
              onRemove={this.removeTrack}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
