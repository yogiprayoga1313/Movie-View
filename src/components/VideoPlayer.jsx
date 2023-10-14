import React from 'react';
import YouTube from 'react-youtube';

class VideoPlayer extends React.Component {
  render() {
    const isMobile = window.innerWidth < 768; 
    const height = isMobile ? '260' : '460';
    const width = isMobile ? '320' : '940'; 
    const opts = {
      height,
      width,
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
