const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const Genius = require("genius-lyrics")
const SpotifyWebApi = require('spotify-web-api-node')

require('dotenv').config()

const app = express()
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

const PORT = process.env.PORT || 3001

// log in
app.post('/login', (req, res) => {
    const code = req.body.code
    // console.log(code)
    const spotifyApi = new SpotifyWebApi({
        redirectUri: process.env.REDIRECT_URI,
        clientId: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
    })

    spotifyApi.authorizationCodeGrant(code)
    .then(data => {
        res.json({
            accessToken: data.body.access_token,
            refreshToken: data.body.refresh_token,
            expiresIn: data.body.expires_in,
        })

        spotifyApi.setAccessToken(data.body.access_token)
        spotifyApi.setRefreshToken(data.body.refresh_token)
    })
    .catch(err => {
        console.error('Error logging in: ' + err.message)
        res.redirect('/')
    }) 
})

// Refresh log in token
app.post('/refresh', (req, res) => {
    const refreshToken = req.body.refreshToken
    // console.log(refreshToken)
    const spotifyApi = new SpotifyWebApi({
        redirectUri: process.env.REDIRECT_URI,
        clientId: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        refreshToken
    })

    spotifyApi.refreshAccessToken().then(
        (data) => {
            // console.log('refresh data', data.body)
            res.json({
                accessToken: data.body.access_token,
                expiresIn: data.body.expires_in
            })
        }
    )
    .catch(err => {
        console.error('Error refreshing access token: ' + err.message)
    })
})

// Get Lyrics
app.get("/lyrics", async (req, res) => {
    // console.log(`${req.query.track} by ${req.query.artist}`)
    const Client = new Genius.Client(process.env.GENIUS_ACCESS_TOKEN)
    const searches = (
        await Client.songs.search(`
        ${req.query.track} by ${req.query.artist}`)) 

    const song = searches.find(item => {
        const title = item.title.toLowerCase();
        const artist = item.artist.name.toLowerCase();
        const track = req.query.track.toLowerCase();
        const artistName = req.query.artist.toLowerCase();
        return title.includes(track) && artist.includes(artistName);
    }) 

    if (!song) {
        return res.json({ lyrics: "No Lyrics Found" });
    }

    const lyrics = await song.lyrics()

    if (!lyrics) {
        return res.json({ lyrics: "No Lyrics Found" });
    }
    
    res.json({ lyrics })
})

app.listen(PORT, () => {
    console.log(`server is running on ${PORT}`)
})