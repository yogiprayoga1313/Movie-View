import { Component } from 'react';
import VideoPlayer from '../src/components/VideoPlayer'

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
      <div>
        <Helmet>
          <meta charSet="utf-8" />
          <title>Trailer View</title>
        </Helmet>
        <div className='mt-[200px] mb-[100px] p-5 flex flex-col justify-center items-center gap-7'>
          <h1 className='md:text-5xl text-3xl font-bold'>Movies Trailer</h1>
          <div className='md:flex md:gap-3 justify-center items-center'>
            {this.state.videoList.map((video, index) => (
              <label className='cursor-pointer bg-gray-300 md:w-auto w-full md:h-8 md:flex flex-col flex justify-center items-center p-4 rounded-md font-semibold md:gap-4' key={index} onClick={() => this.handleVideoClick(index)}>
                Play {video.name}
              </label >
            ))}
          </div>
          <VideoPlayer videoId={this.state.videoList[this.state.currentVideoIndex].id} />
        </div>
      </div>
    );
  }
}

export default App;
