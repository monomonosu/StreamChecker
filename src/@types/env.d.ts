declare namespace NodeJS {
	interface ProcessEnv {
		readonly YOUTUBE_API_KEY: string;
		readonly YOUTUBE_API_BASE_URL: string;
		readonly SPOTIFY_CLIENT_ID: string;
		readonly SPOTIFY_CLIENT_SECRET: string;
		readonly SPOTIFY_API_BASE_URL: string;
	}
}
