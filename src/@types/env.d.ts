declare namespace NodeJS {
	interface ProcessEnv {
		readonly SPOTIFY_CLIENT_ID: string;
		readonly SPOTIFY_CLIENT_SECRET: string;
		readonly SPOTIFY_API_BASE_URL: string;
	}
}
