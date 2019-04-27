import React, { Component } from 'react';

class ArtistSongs extends Component {
    render() {
        const tracks = [this.props.tracks];
        return (
            <div>
                {tracks.map((item,key) => {
                    return(
                        <div key={key}>
                        {
                        item.map((song,key)=>{
                        let {name,preview_url,album} = song
                        return (
                            <div key={key}>
                                <p>{name}</p>
                                <video controls poster={album.images[0].url}>
                                    <source src={preview_url} type="video/mp4"></source>
                                </video>
                            </div>
                        )
                    })  
                        }
                        </div>
                    )

                })
                }
            </div>
        )
    }
    
}

export default ArtistSongs



