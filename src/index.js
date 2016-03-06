import _ from 'lodash';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import YTSearch from 'youtube-api-search';
import SearchBar from './components/searchBar';
import VideoList from './components/videoList';
import VideoDetail from './components/VideoDetail';

const APIKEY = "AIzaSyDn_qAYhtrEd27GSp6ndZvdC-IRGpZTAOo";


// Functional Based component is a component that doesn't keep track of state. const ==> Functional
// Classed Based components are components that do keep track of state   class ==> Class
class App extends Component {
  constructor(props){
    super(props)
    this.state = { 
      videos: [],
      selectedVideo: null 
    };

    // Load Default values
    this.videoSearch('cars');

  }

  videoSearch(term){

    // Youtube Search (This is occuring on the loading state)
    YTSearch({key: APIKEY, term: term}, (videos) => {
      // If a key and a value have the same exact variable name you can simply condense it like this
      this.setState({ 
        videos:videos,
        selectedVideo: videos[0] 
      });

    });

  }

  render(){

    const videoSearch = _.debounce( (term) => {
      this.videoSearch(term)
    },300);

    return (
      <div> 
        <SearchBar onSearchTermChange={ videoSearch } />
        <VideoDetail videos={this.state.selectedVideo}/>
        <VideoList 
          onVideoSelect={ selectedVideo => this.setState({selectedVideo}) }
          videos={this.state.videos} />
      </div>
    );
  }
}



// By wrapping the App in brackets is creating an instance of the App class
ReactDOM.render(<App />, document.querySelector('.container'));
