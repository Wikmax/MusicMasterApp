import React, { Component } from 'react';

class ArtistsCompare extends Component {
    state = { firstArtistQuery: '', firtstArtist: null, firstArtistTracks: [], secondArtistQuery: '', secondArtist: null, secondArtistTracks: [] };

    enterPress = event => {
        if (event.key === 'Enter') {
            this.searchFirstArtist();
            this.searchSecondArtist();
        }
    }
    updateFirstArtistQuery = event => {
        this.setState({ firstArtistQuery: event.target.value })
    }
    searchFirstArtist = () => {
        const BASE_URL = 'https://spotify-api-wrapper.appspot.com/artist/';
        fetch(`${BASE_URL}${this.state.firstArtistQuery}`, { method: 'GET' })
            .then(Response => Response.json())
            .then(json => {
                if (json.artists.total > 0) {
                    const firtstArtist = json.artists.items[0];
                    this.setState({ firtstArtist })

                    fetch(`${BASE_URL}${firtstArtist.id}/top-tracks`)
                        .then(Response => Response.json())
                        .then(json => {
                            this.setState({ firstArtistTracks: json.tracks })
                        })
                        .catch(error => error.message);
                }
            })
            .catch(error => error.message);
    }
    updateSecondArtistQuery = event => {
        this.setState({ secondArtistQuery: event.target.value })
    }
    searchSecondArtist = () => {
        const BASE_URL = 'https://spotify-api-wrapper.appspot.com/artist/';
        fetch(`${BASE_URL}${this.state.secondArtistQuery}`, { method: 'GET' })
            .then(Response => Response.json())
            .then(json => {
                if (json.artists.total > 0) {
                    const secondArtist = json.artists.items[0];
                    this.setState({ secondArtist })

                    fetch(`${BASE_URL}${secondArtist.id}/top-tracks`)
                        .then(Response => Response.json())
                        .then(json => {
                            this.setState({ secondArtistTracks: json.tracks })
                        })
                        .catch(error => error.message);
                }
            })
            .catch(error => error.message);
    }
    render(){
        console.log("json", this.state);
        return(
            <div>
                <input
                    onKeyPress={this.enterPress}
                    onChange={this.updateFirstArtistQuery}
                    type="text" placeholder="Pick first artist" />
                <input
                    onKeyPress={this.enterPress}
                    onChange={this.updateSecondArtistQuery}
                    type="text" placeholder="Pick second artist" />
            </div>
        )
    }
}
export default ArtistsCompare