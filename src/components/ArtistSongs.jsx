import React, { Component } from 'react';

class ArtistSongs extends Component {
    state ={playing :false,audio :null,playingPreviewUrl: null}

    playAudio = previewUrl => () => {
        const audio = new Audio(previewUrl);
        if(!this.state.playing){
            audio.play();
            this.setState({playing:true,audio,playingPreviewUrl:previewUrl});
        }else{
            this.state.audio.pause();
            if(this.state.playingPreviewUrl === previewUrl){
                this.setState({playing:false});
            }else{
                audio.play();
                this.setState({audio,playingPreviewUrl:previewUrl});
            }
        }
    }
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
                            <div key={key} onClick={this.playAudio(preview_url)}>
                                <p>{name}</p>
                                <img src={album.images[0].url} alt="Album Image"/>
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



