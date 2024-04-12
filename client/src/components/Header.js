import { FaSpotify } from 'react-icons/fa'

export default function Header(props) {
    return (
        <header style={styles.container}>
            <FaSpotify style={styles.icon} />
            {props.searchbar}
        </header>
    )
}

const styles = {
    container: {
        backgroundColor: '#1bb954',
        padding: '10px',
        display: 'flex',
        alignItems: 'center',
        gap: '35%'
    },
    icon: {
        fontSize: '50px',
        color: 'white',
    }
}