import { redirect } from "next/navigation"

/**
 * @description This page authorizes the app to act on the user's behalf. This should only need to be done once per user unless the authoriziation scope is changed or revoked.
 */
const SpotifyLogin = () => {

    const handleLogin = async () => {
        try {
            const response = await fetch('http://localhost:3000/api/spotify/auth');
            const { authURL } = await response.json();
            redirect(authURL)
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div>
            <button
                onClick={handleLogin}
            >Connect Spotify
            </button>
        </div>
    )
};

export default SpotifyLogin;