import React, { useEffect, useState } from "react"
import styled from 'styled-components'
import SpotifyWebApi from "spotify-web-api-node"
import axios from "axios"

import Header from "../components/Header"
import useAuth from "../services/useAuth"
import SearchResultItem from "../components/SearchResultItem"
import Player from "../components/Player"

import { IoSearch } from "react-icons/io5"
import { FaSpotify } from 'react-icons/fa'

const spotifyApi = new SpotifyWebApi({
    clientId: 'c2acd47d9c3f4a0f94ffc52f96c28e12',
})

export default function Dashboard({ code }) {
    const accessToken = useAuth(code)
    const [search, setSearch] = useState('')
    const [searchResults, setSearchResults] = useState([])
    // console.log(searchResults)
    const [currentlyPlaying, setCurrentlyPlaying] = useState()
    const [lyrics, setLyrics] = useState("")

    function chooseTrack(track){
        setCurrentlyPlaying(track)
        setSearchResults('')
        setLyrics('')
    }

    useEffect(() => {
        if (!currentlyPlaying) return
    
        axios.get("http://localhost:3001/lyrics", {
            params: {
                track: currentlyPlaying.title,
                artist: currentlyPlaying.artist,
            },
        })
        .then(res => {
            setLyrics(res.data.lyrics)
            console.log(res.data.lyrics)
        })
    }, [currentlyPlaying])

    useEffect(() => {
        if(!accessToken) return
        spotifyApi.setAccessToken(accessToken)
    },[accessToken])

    useEffect(() => {
        if(!search) return setSearchResults([])
        if(!accessToken) return

        let cancel = false

        spotifyApi.searchTracks(search)
        .then(res => {
            // console.log(res)
            if(cancel) return
            setSearchResults(res.body.tracks.items.map(track => {
                const smallestImg = track.album.images.reduce((smallest, img) => {
                    if(img.height < smallest.height) return img
                    return smallest
                }, track.album.images[0])

                return {
                    artist: track.artists[0].name,
                    title: track.name,
                    uri: track.uri,
                    albumUrl: smallestImg.url

                }
            }))
        })

        return () => cancel = true
    },[search, accessToken])

    const Input = styled.input`
    background: transparent;
    border: none;
    border-bottom: 1.5px solid white;
    font-size: 14px;
    line-height: 20px;
    padding: 5px 10px;
    width: 100%;
    color: white;
    box-sizing: border-box;

    &:focus {
        outline: none;
    }

    &::placeholder {
        color: #7DD79D
    }
    `
    return (
        <div style={styles.body}>
            <Header searchbar={
                <div style={styles.container}>
                    <div> <IoSearch style={styles.icon}/> </div>
                    <div>
                        <Input 
                        type='search'
                        value={search}
                        placeholder="Search..."
                        onChange={e => setSearch(e.target.value)}
                        style={styles.input} />
                    </div>
                </div>}/>
            
            <div style={styles.textContainer}>
                {searchResults.length > 0 ? (
                    <div style={styles.recs}>
                        {searchResults.map(track => (
                            <SearchResultItem
                                track={track}
                                key={track.uri}
                                chooseTrack={chooseTrack}
                            />
                        ))}
                    </div>
                ) : (
                    <>
                        <FaSpotify style={styles.spotifyIcon}/>
                        <h3 style={styles.heading}>{lyrics ? 'Lyrics' : 'No Results'}</h3>
                        {lyrics ? (
                            <div style={styles.lyricsContainer}>
                                {lyrics}
                            </div>
                        ) : (
                            <p style={styles.text}>Please type in a search query to get started...</p>
                        )}
                    </>
                )}
            </div>
            <Player accessToken={accessToken} trackUri={currentlyPlaying?.uri} />
        </div>
    )
}

const styles = {
    container: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: '5px'
    },
    icon: {
        color: 'white',
        fontSize: '25px',
    },
    spotifyIcon: {
        color: '#1bb954',
        fontSize: '50px'
    },
    heading: {
        color: 'white',
        fontWeight: 'bold'
    },
    text: {
        color: 'white',
        fontSize: '16px',
        fontWeight: '300',
        marginTop: '-10px'
    },
    body: {
        minHeight: '100vh'
    },
    textContainer: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '80vh'
    },
    recs: {
        display: 'grid',
        gridTemplateRows: 'repeat(4, 1fr)',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: '8px'
    },
    lyricsContainer: {
        whiteSpace: 'pre',
        color: 'white'
    }
}