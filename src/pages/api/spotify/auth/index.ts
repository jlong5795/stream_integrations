import { TRPCError } from "@trpc/server";
import { type NextApiRequest, type NextApiResponse } from "next";
import querystring from "querystring";
import { v4 as uuid } from "uuid";

const handler = (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === "GET") {
        return authenticateHandler(req, res);
    }
}

const authenticateHandler = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const authURL = 'https://accounts.spotify.com/authorize?' +
            querystring.stringify({
                response_type: 'code',
                client_id: process.env.SPOTIFY_CLIENT_ID,
                scope: "user-read-playback-state user-modify-playback-state user-read-currently-playing app-remote-control playlist-read-private playlist-read-collaborative playlist-modify-public playlist-modify-private",
                redirect_uri: "http://localhost:3000",
                state: uuid()
            });

        res.status(200).json({ authURL });
    } catch (cause) {
        if (cause instanceof TRPCError) {
            // Spotify retgurns specific error
            return res.status(400).json(cause);
        }
        // Another error occured
        console.error(cause);
        res.status(500).json({ message: "Internal server error" });
    }
};

export default handler;
