import React from 'react';
import Track from './../Track/Track';
class TrackList extends React.Component {
  render() {
    return (
      <div className="TrackList">
        {this.props.tracks.map((currentTrack) => (
          <Track
            track={currentTrack}
            key={currentTrack.id}
            onAdd={this.props.onAdd}
            onRemove={this.props.onRemove}
            isRemoval={this.props.isRemoval}
          />
        ))}
      </div>
    );
  }
}

export default TrackList;
