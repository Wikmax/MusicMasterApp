import React,{Component} from 'react';

class ArtistGallery extends Component {
    render(){
        const artist = [this.props.artist];
        return(
            <div>
                {!this.props.artist ? null : 
                    artist.map((item,index)=>{
                        let name = item.name;
                        let img = item.images[0];
                        let genres = item.genres;
                        return(
                            <div key={index}>
                                <p>{name}</p>
                                <p>{genres.join(',')}</p>
                                <img src={img && img.url} alt="Artist Profile"/>
                                <h3>List of 10 most popular {name} songs
                                    (by clicking on picture you can 
                                    listen to a preview of the song)</h3>
                            </div>
                        )
                    })
                }
            </div>
        )
    }
}

export default ArtistGallery
