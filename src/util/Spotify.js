const accessToken = '';
const CLIENT_ID = '849a9c7364b249d293354c9a81ed789e';
const REDIRECT_URI = 'http://localhost:3000/';

const Spotify = {
  getAccessToken: function () {
    if (accessToken !== '') {
      return accessToken;
    } else if (window.location.href.match(/access_token=([^&]*)/)[1] !== null) {
      const tokenValue = window.location.href.match(/access_token=([^&]*)/)[1];
      accessToken = tokenValue;
      const expiresIn = window.location.href.match(/expires_in=([^&]*)/)[1];
      window.setTimeout(() => (accessToken = ''), expiresIn * 1000);
      window.history.pushState('Access Token', null, '/');
    } else {
      window.location.assign(
        `https://accounts.spotify.com/authorize?client_id=${CLIENT_ID}&response_type=token&scope=playlist-modify-public&redirect_uri=${REDIRECT_URI}`
      );
    }
  },
  search: function (term) {
    return fetch(`https://api.spotify.com/v1/search?type=track&q=${term}`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    })
      .then((response) => {
        return response.json();
      })
      .then((jsonResponse) => {
        if (jsonResponse.tracks) {
          return jsonResponse.tracks.items.map((track) => {
            return {
              id: track.id,
              uri: track.uri,
              name: track.name,
              artist: track.artists[0].name,
              album: track.album.name,
            };
          });
        } else {
          return [];
        }
      });
  },
  savePlaylist: function (playlistName, trackURIs) {
    if (playlistName && trackURIs) {
      const accessTokenVal = accessToken;
      const headers = { Authorization: `Bearer ${accessTokenVal}` };
      const userID = '';
      fetch('https://api.spotify.com/v1/me', { headers: headers })
        .then((response) => {
          return response.json();
        })
        .then((jsonResponse) => {
          if (jsonResponse.id) {
            userID = jsonResponse.id;
          } else {
            return;
          }
        });
      const postObj = {
        headers: {
          Authorization: `Bearer ${accessTokenVal}`,
          'Content-Type': 'application/json',
        },
        method: 'POST',
        body: JSON.stringify({
          name: playlistName,
          public: false,
        }),
      };
      fetch(`https://api.spotify.com/v1/users/${userID}/playlists`, postObj)
        .then((response) => {
          return response.json();
        })
        .then((jsonResponse) => {
          if (jsonResponse.id) {
            const playlistID = jsonResponse.id;
            fetch(`https://api.spotify.com/v1/playlists/${playlistID}/tracks`, {
              headers: {
                Authorization: `Bearer ${accessTokenVal}`,
                'Content-Type': 'application/json',
              },
              method: 'POST',
              body: JSON.stringify({
                uris: trackURIs,
              }),
            })
              .then((response) => {
                return response.json();
              })
              .then((jsonResponse) => {
                if (jsonResponse.snapshot_id) {
                  const snapshot_id = jsonResponse.snapshot_id;
                } else {
                  return;
                }
              });
          } else {
            return;
          }
        });
    } else {
      return;
    }
  },
};

export default Spotify;
