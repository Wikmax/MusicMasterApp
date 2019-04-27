import React,{Component} from 'react';

class ArtistGallery extends Component {
    render(){
        const artist = [this.props.artist];
        return(
            <div>
                {!this.props.artist ? null : 
                    artist.map((item,index)=>{
                        let name = item.name;
                        let img = item.images[0].url;
                        return(
                            <div key={index}>
                                <p>{name}</p>
                                <img src={img} alt="image"/>
                            </div>
                        )
                    })
                }
            </div>
        )
    }
}

export default ArtistGallery
