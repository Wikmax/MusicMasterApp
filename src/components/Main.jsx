import React,{Component} from 'react';
import ArtistGallery from './ArtistGallery.jsx';
import ArtistSongs from './ArtistSongs.jsx';
import ArtistsCompare from './ArtistsCompare.jsx';

class Main extends Component{
    state ={artistQuery: '',artist: null,tracks : [], aritstsCompare: false, artistSearch: false};

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

    searchArtistButton = () =>{
        let artistSearch = this.state.artistSearch;
        let aritstsCompare = this.state.aritstsCompare;
        if (artistSearch === false ) {
        this.setState({ artistSearch: true })
        this.setState({ aritstsCompare: false })
        }else{
            this.setState({artistSearch:false})
        }
        
    }
    compareArtistsButton = () =>{
        let artistSearch = this.state.artistSearch;
        let aritstsCompare = this.state.aritstsCompare;
        if (aritstsCompare === false) {
            this.setState({ aritstsCompare: true })
            this.setState({ artistSearch: false })
        }else {
            this.setState({ aritstsCompare: false })
        }
        
    }

    render(){
        return(
            <div className="mainComponent" >
            <h1>Music Master</h1>
            <h2>Here you can search your favorie musicians based on spotify data-base or <br/>
                compare two musicians to know witch one is more popular.</h2>
            <button onClick={this.compareArtistsButton}>Compare artists</button>
            <button onClick={this.searchArtistButton}>Search for favorie artist</button>
            <section className='artistGallery' style={{ display: this.state.artistSearch ? 'block' : 'none' }} >    
            <input
            onKeyPress={this.enterPress}
            onChange={this.updateArtistQuery}
            type="text" placeholder="Search for an artist"/>
            <button onClick={this.searchArtist}>Search</button>
            <ArtistGallery artist={this.state.artist}/>
            </section>
            <section className='artistSongs'>
                <ArtistSongs tracks={this.state.tracks} />
            </section>
            <section className="aritstsCompare" style={{ display: this.state.aritstsCompare ? 'block' : 'none' }}>
                <ArtistsCompare/>
            </section>
            </div >
        )
    }
}

export default Main;