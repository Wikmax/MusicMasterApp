import React,{Component} from 'react';
import ArtistGallery from './ArtistGallery.jsx';
import ArtistSongs from './ArtistSongs.jsx';

class Main extends Component{
    state ={artistQuery: '',artist: null,tracks : []};

    updateArtistQuery = event =>{
        this.setState({artistQuery: event.target.value})
    }
    enterPress =event =>{
        if(event.key === 'Enter'){
            this.searchArtist();
        }
    }
    searchArtist = () =>{
        const BASE_URL = 'https://spotify-api-wrapper.appspot.com/artist/';
        fetch(`${BASE_URL}${this.state.artistQuery}`,{method:'GET'})
        .then(Response => Response.json())
        .then(json => {
            if(json.artists.total > 0 ){
                const artist = json.artists.items[0];
                this.setState({artist})

                fetch(`${BASE_URL}${artist.id}/top-tracks`)
                    .then(Response=>Response.json())
                    .then(json => {
                        this.setState({tracks:json.tracks})
                    })
                    .catch(error => error.message);
            }
        })
            .catch(error => error.message);
    }

    render(){
        return(
            <div className="mainComponent" >
            <h1>Music Master</h1>
            <input
            onKeyPress={this.enterPress}
            onChange={this.updateArtistQuery}
            type="text" placeholder="Search for an artist"/>
            <button onClick={this.searchArtist}>Search</button>
            <section className='artistGallery'>
                <ArtistGallery artist={this.state.artist}/>
            </section>

            <section className='artistSongs'>
                    <ArtistSongs tracks={this.state.tracks} />
            </section>
            </div >
        )
    }
}

export default Main;