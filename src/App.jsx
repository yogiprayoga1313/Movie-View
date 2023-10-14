import { Component } from 'react';
import VideoPlayer from '../src/components/VideoPlayer'
import './App.css'
import { Helmet } from 'react-helmet';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      videoList: [
        { id: 'QF-oyCwaArU', name: 'Loading...' },
        { id: 't3PzUo4P21c', name: 'Loading...' },
        { id: 'dug56u8NN7g', name: 'Loading...' },
        // Change id from youtube id video, example https://www.youtube.com/watch?v=dug56u8NN7g, id=dug56u8NN7g
      ],
      currentVideoIndex: 0,
    };
  }

  componentDidMount() {
    this.state.videoList.forEach((video, index) => {
      this.fetchVideoTitle(video.id, index);
    });
  }

  fetchVideoTitle(videoId, index) {
    // API_KEY= Your API form Google Cloud
    const API_KEY = 'AIzaSyAUPibvA5b7SL42acXQM2G5QCXTv_rNouM';
    fetch(`https://www.googleapis.com/youtube/v3/videos?id=${videoId}&key=${API_KEY}&part=snippet`)
      .then((response) => response.json())
      .then((data) => {
        const videoListCopy = [...this.state.videoList];
        videoListCopy[index].name = data.items[0].snippet.title;
        this.setState({ videoList: videoListCopy });
      });
  }

  handleVideoClick(index) {
    this.setState({ currentVideoIndex: index });
  }

  render() {
    return (
      <>
        <Helmet>
          <meta charSet="utf-8" />
          <title>Trailer View</title>
        </Helmet>
        <div>
          <h1>Movies Trailer</h1>
          <div className="video-list">
            {this.state.videoList.map((video, index) => (
              <button key={index} onClick={() => this.handleVideoClick(index)}>
                Play {video.name}
              </button>
            ))}
          </div>
          <VideoPlayer className='video-player' videoId={this.state.videoList[this.state.currentVideoIndex].id} />
        </div>
      </>
    );
  }
}

export default App;
