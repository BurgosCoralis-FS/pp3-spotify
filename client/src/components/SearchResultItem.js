import { FaSpotify } from 'react-icons/fa'

export default function SearchResultItem({ track, chooseTrack }) {
    function handlePlayback() {
        chooseTrack(track)
    }
    return (
        <div style={styles.container} onClick={handlePlayback}>
            <img src={track.albumUrl} style={{ height: "64px", width: "64px" }} />
            <div>
                <h3 style={styles.heading}>{track.artist}</h3>
                <p style={styles.text}>{track.title}</p>
            </div>
        </div>
    )
}

const styles = {
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
    container: {
        display: 'flex',
        alignItems: 'center',
        margin: '2',
        gap: '10px',
        cursor: 'pointer',
    }
}