import React from 'react'

const AUTH_URL = 'https://accounts.spotify.com/authorize?client_id=c2acd47d9c3f4a0f94ffc52f96c28e12&response_type=code&redirect_uri=http://localhost:3000&scope=streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state'

export default function Login(){
    return (
        <div>
            <button style={styles.button}>
                <a href={ AUTH_URL } style={styles.link}>Login</a>
            </button>
        </div>
    )
}

const styles = {
    button: {
        backgroundColor: '#1bb954',
        padding: '10px 130px',
        borderRadius: '50px',
        border: 'none'
    },
    link: {
        color: 'white',
        textDecoration: 'none',
        fontSize: '25px',
    }
}