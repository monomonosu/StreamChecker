const CLIENT_ID = process.env.SPOTIFY_CLIENT_ID;
const CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET;
const BASE_URL = process.env.SPOTIFY_API_BASE_URL;
const TOKEN_ENDPOINT = "https://accounts.spotify.com/api/token";

type SpotifyAuthResponse = {
	access_token: string;
	token_type: string;
	expires_in: number;
};

/**
 * SpotifyAPIのアクセストークンを取得する
 * @returns {Promise<SpotifyAuthResponse>}
 */
export async function getAccessToken(): Promise<SpotifyAuthResponse> {
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

	if (!response.ok) {
		throw new Error("Failed to get access token");
	}

	return response.json();
}

/**
 * SpotifyAPIからデータを取得するラッパー
 * @param {string} endpoint
 * @returns {Promise<T>}
 */
export async function fetchSpotifyData<T>(
	endpoint: string,
	revalidate?: number,
): Promise<T> {
	const { access_token } = await getAccessToken();

	const res = await fetch(`${BASE_URL}/${endpoint}`, {
		next: { revalidate },
		headers: {
			Authorization: `Bearer ${access_token}`,
		},
	});

	if (!res.ok) {
		throw new Error(`Failed to fetch data from Spotify API: ${res.status}`);
	}

	return res.json();
}
