const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
require('dotenv').config()
const lyricsFinder = require("lyrics-finder")
const SpotifyWebApi = require('spotify-web-api-node')

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
        clientSecret: process.env.CLIENT_SECRET
    })

    spotifyApi.authorizationCodeGrant(code)
    .then(data => {
        res.json({
            accessToken: data.body.access_token,
            refreshToken: data.body.refresh_token,
            expiresIn: data.body.expires_in
        })

        spotifyApi.setAccessToken(data.body.access_token)
        spotifyApi.setRefreshToken(data.body.refresh_token)
    })
    .catch(err => {
        console.error('Error logging in: ' + err.message)
    }) 
})

// Refresh log in token
app.post('/refresh', (req, res) => {
    const refreshToken = req.body.refreshToken
    // console.log(refreshToken)
    const spotifyApi = new SpotifyWebApi({
        redirectUri: 'http://localhost:3000',
        clientId: 'c2acd47d9c3f4a0f94ffc52f96c28e12',
        clientSecret: '79acc410047c4129adefe91814974b2c',
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
    console.log(req.query.artist)
    console.log(req.query.track)
    const lyrics =
    (await lyricsFinder(req.query.artist, req.query.track)) || "No Lyrics Found"
    res.json({ lyrics })
    console.log(lyrics)
})

app.listen(PORT, () => {
    console.log(`server is running on ${PORT}`)
})