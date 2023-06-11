import { type NextApiRequest, type NextApiResponse } from "next";
import querystring from "querystring";

const handler = (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === "GET") {
        const state = req.query.state || null;

        if (state === null) {
            res.redirect('/#' +
                querystring.stringify({
                    error: 'state_mismatch'
                }));
        } else {
            var authOptions = {
                url: 'https://accounts.spotify.com/api/token',
                form: {
                    code: "code",
                    redirect_uri: "http://localhost:3000/api/spotify/auth/access_token/callback",
                    grant_type: 'authorization_code'
                },
                headers: {
                    // @ts-ignore
                    'Authorization': 'Basic ' + (new Buffer.from(client_id + ':' + client_secret).toString('base64'))
                },
                json: true
            };
        }
    }
}

export default handler;
