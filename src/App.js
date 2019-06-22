import React, { Component } from "react";
import "./App.css";
import Movie from "./movie"
import InfiniteScroll from 'react-infinite-scroller'

class Controller extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    let { onOptionChanged } = this.props;
    return (

      <div class="SelectBox">
        <select value={this.props.option} id="select_sort" name="sorting" onChange={onOptionChanged} class="custom-select sources" placeholder="Source Type">
          <option value="download_count">다운로드 수</option>
          <option id="rating" value="rating">평점</option>
          <option value="like_count">like count</option>
        </select>
        <p></p>
      </div>
    );
  }
}


class App extends Component {
  // Render: componentWillMount() -> render() -> componentDidMount()
  // Update componentWillReceiveProps() -> shouldComponentUpdate() -> componentWillUpdate() -> render() -> componentDidUpdate()

  constructor(props) {
    super(props);
    this.state = {
      option: "download_count",
      page: "1",
      hasMore: true
    };
  }

  componentDidMount() {
    console.log("componentDidMount");
    this._getMovies();
  }



  addMoreMovies = () => {
    this._getMovies();
  }

  _onOptionChanged = (event) => {
    console.log("_onOptionChanged");
    let selected_option = event.target.value;
    console.log("selected option : " + selected_option)

    this.setState({
      movies: "",
      option: selected_option
    }, () => { this._getMovies(); })

  }

  _renderMovies = () => {
    console.log("_renderMovies");

    const movies = this.state.movies.map((movie, i) => {
      return (
        <Movie className="CenterAlign"
          key={i}
          title={movie.title_english}
          poster={movie.large_cover_image}
          key={movie.id}
          genres={movie.genres}
          synopsis={movie.synopsis}
        />
      );
    });
    console.log("movies :" + movies.title_english)
    return movies;
  };

  _renderController = () => {
    console.log("_renderController");

    return (
      <Controller
        option={this.state.option}
        onOptionChanged={this._onOptionChanged}
      />
    );

  }

  _getMovies = async () => {
    console.log("_getMovies");
    const movies = await this._callApi();
    this.setState({
      movies
    });

  };

  _getMoreMovies = async (page) => {
    console.log("_getMoreMovies");
    const movies = await this._callApi(page);


    if (!this.state.movies || !this.state.movies.length) {
    } else{
      var newMovies = this.state.movies.slice().concat(movies);
    }

    this.setState({
      movies: newMovies,
      page: page,
      hasMore: true
    });
  };

  _callApi = (page) => {
    console.log("_callApi");
    return fetch(
      "https://yts.lt/api/v2/list_movies.json?limit=10&sort_by=" + this.state.option + "&page=" + page
    )
      .then(data => data.json())
      .then(json => json.data.movies)
      .catch(err => console.log(err));
  };

  _loadMore = (page) => {
    console.log("_loadMore page: " + page);
    this._getMoreMovies(page)
  }

  render() {
    console.log("render()");
    const { movies } = this.state;
    //const loader = <div className="loader">Loading ...</div>;
    const loader = <div><div class="loading-container"><div class="loading"></div><div id="loading-text">loading</div></div><a href="http://www.domsammut.com/about#utm_source=web&utm_medium=demo&utm_campaign=CodePen" title="" id="link"></a></div>;

    return (

      <InfiniteScroll
        pageStart={1}
        loadMore={this._loadMore.bind(this)}
        hasMore={this.state.hasMore}
        loader={loader}>

        <div>
          {this._renderController()}
        </div>
        {movies ? this._renderMovies() : ""}

      </InfiniteScroll>



    );
  }
}

export default App;