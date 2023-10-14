import React from 'react';
import YouTube from 'react-youtube';

class VideoPlayer extends React.Component {
  render() {
    const opts = {
      height: '460',
      width: '940',
      playerVars: {
        autoplay: 0, // Change 1 to autoplay
      },
    };

    return (
      <YouTube
        videoId={this.props.videoId}
        opts={opts}
        onReady={this._onReady}
      />
    );
  }

  _onReady(event) {
    event.target.playVideo();
  }
}

export default VideoPlayer;
