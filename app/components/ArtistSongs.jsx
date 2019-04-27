import React, { Component } from 'react';

class ArtistSongs extends Component {
    render() {
        const tracks = [this.props.tracks];
        return (
            <div>
                {tracks.map((item) => {
                    item.map((song,songId)=>{
                        let {name,preview_url,album} = song
                        console.log("second log", name)
                        return (
                            <div key={songId}>
                            halo
                                <p>{name}</p>
                                <p>Hej</p>
                                {/* <img src={album} alt="image" /> */}
                            </div>
                        )
                    })
                })
                }
            </div>
        )
    }
}

export default ArtistSongs



