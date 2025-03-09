const CLIENT_ID = process.env.SPOTIFY_CLIENT_ID;
const CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET;
const TOKEN_ENDPOINT = "https://accounts.spotify.com/api/token";

export async function getAccessToken() {
	const response = await fetch(TOKEN_ENDPOINT, {
		method: "POST",
		headers: {
			"Content-Type": "application/x-www-form-urlencoded",
			Authorization: `Basic ${Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString("base64")}`,
		},
		body: new URLSearchParams({
			grant_type: "client_credentials",
		}),
	});

	return response.json();
}

export async function fetchSpotifyData(endpoint: string) {
	const { access_token } = await getAccessToken();

	const res = await fetch(`https://api.spotify.com/v1/${endpoint}`, {
		headers: {
			Authorization: `Bearer ${access_token}`,
		},
	});

	return res.json();
}
