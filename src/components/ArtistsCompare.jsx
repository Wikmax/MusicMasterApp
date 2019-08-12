import React, { Component } from 'react';

class ArtistsCompare extends Component {
    state = { firstArtistQuery: '', firstArtist: null, firstArtistTracks: [], secondArtistQuery: '', secondArtist: null, secondArtistTracks: [] };

enterPress = event => {
        if (event.key === 'Enter' && !this.state.firstArtist && !this.state.secondArtist ) {
            this.searchArtists();
        }
    }

updateFirstArtistQuery = event => {
        this.setState({ firstArtistQuery: event.target.value })
    }
updateSecondArtistQuery = event => {
        this.setState({ secondArtistQuery: event.target.value })
    }
componentDidUpdate(){
    const BASE_URL = 'https://spotify-api-wrapper.appspot.com/artist/';
    this.FirstArtistURL = `${BASE_URL}${this.state.firstArtistQuery}`;
    this.SecondArtistURL = `${BASE_URL}${this.state.secondArtistQuery}`;
}

searchArtists = () =>{ 
    Promise.all([
            fetch(this.FirstArtistURL, {method: 'GET'}),
            fetch(this.SecondArtistURL, { method: 'GET' })])

      .then(([firstArtist, secondArtist]) => { 
         return Promise.all([firstArtist.json(), secondArtist.json()]) 
      })
      .then(json => {
            if (json[0].artists.total > 0 && json[1].artists.total > 0) {
            this.firstArtist = json[0].artists.items[0];
            this.setState({firstArtist : this.firstArtist});
            this.secondArtist = json[1].artists.items[0];
            this.setState({ secondArtist : this.secondArtist });
           }
      });
}
    render(){
        console.log("json", this.state);
        const secondArtist = [this.state.secondArtist];
        const firstArtist = [this.state.firstArtist];
        return(
            <div>
                <div>
                <input
                    onKeyPress={this.enterPress}
                    onChange={this.updateFirstArtistQuery}
                    type="text" placeholder="Pick first artist" />
                <input
                    onKeyPress={this.enterPress}
                    onChange={this.updateSecondArtistQuery}
                    type="text" placeholder="Pick second artist" />
                <button onClick={this.searchArtists}>Fight !</button>
                </div>
                <div className="displayArtistCompare">
                    {!this.state.firstArtist && !this.state.secondArtist ? null :
                        firstArtist.map((item, index) => {
                            let name = item.name;
                            let img = item.images[0];
                            let genres = item.genres;
                            let followers = item.followers.total;
                            let popularity = item.popularity;
                            return (
                                <div key={index}>
                                    <h1>{name}</h1>
                                    <p>{genres.join(',')}</p>
                                    <p>Number of followers on Spotify: {followers}</p>
                                    <p>Popularity on Spotify: {popularity}</p>
                                    <img src={img && img.url} alt="Artist Profile" />
                                    
                                </div>
                            )
                        })
                    }
                </div>
                <div className="displayArtistCompare">
                    {!this.state.firtstArtist && !this.state.secondArtist ? null :
                        secondArtist.map((item, index) => {
                            let name = item.name;
                            let img = item.images[0];
                            let genres = item.genres;
                            let followers = item.followers.total;
                            let popularity = item.popularity;
                            return (
                                <div key={index}>
                                    <h1>{name}</h1>
                                    <p>{genres.join(',')}</p>
                                    <p>Number of followers on Spotify: {followers}</p>
                                    <p>Popularity on Spotify:{popularity}</p>
                                    <img src={img && img.url} alt="Artist Profile" />
                                </div>
                            )
                        })
                    }
                </div>
            </div>

        )
    }
}
export default ArtistsCompare