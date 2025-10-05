const CLIENT_ID = process.env.SPOTIFY_CLIENT_ID;
const CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET;
const BASE_URL = process.env.SPOTIFY_API_BASE_URL;
const TOKEN_ENDPOINT = "https://accounts.spotify.com/api/token";

type SpotifyAuthResponse = {
	access_token: string;
	token_type: string;
	expires_in: number;
};

type Cache = {
	token?: string;
	expiresAt?: number; // ms epoch
	inFlight?: Promise<string>;
};

declare global {
	var __spotifyTokenCache__: Cache | undefined;
}

// biome-ignore lint/suspicious/noAssignInExpressions: グローバルキャッシュ用
const cache: Cache = (globalThis.__spotifyTokenCache__ ??= {});

const toBase64 = (s: string) =>
	typeof Buffer === "undefined" ? btoa(s) : Buffer.from(s).toString("base64");

export async function getAccessToken(): Promise<string> {
	const now = Date.now();

	// 5-1. “有効期限の60秒前”までならキャッシュを返す
	if (cache.token && cache.expiresAt && now < cache.expiresAt - 60_000) {
		return cache.token;
	}

	// 5-2. すでに誰かが発行中なら、そのPromiseを使い回す（同時実行の重複防止）
	if (cache.inFlight) return cache.inFlight;

	// 5-3. 新たに発行する
	cache.inFlight = (async () => {
		const res = await fetch(TOKEN_ENDPOINT, {
			method: "POST",
			headers: {
				"Content-Type": "application/x-www-form-urlencoded",
				Authorization: `Basic ${toBase64(`${CLIENT_ID}:${CLIENT_SECRET}`)}`,
			},
			body: new URLSearchParams({ grant_type: "client_credentials" }),
			// Next.jsのfetchは自動再試行しないので必要ならここにリトライ実装
		});

		if (!res.ok) throw new Error("Failed to get Spotify access token");

		// 5-4. レスポンスをキャッシュに保存し、有効期限（ms）を算出
		const data = (await res.json()) as SpotifyAuthResponse;
		cache.token = data.access_token;
		cache.expiresAt = Date.now() + data.expires_in * 1000;

		return cache.token;
	})();

	// 5-5. 取得完了後は inFlight を解除して、呼び出し元へ返す
	try {
		return await cache.inFlight;
	} finally {
		cache.inFlight = undefined; // 成否に関わらず解除
	}
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
	const access_token = await getAccessToken();

	const res = await fetch(`${BASE_URL}/${endpoint}`, {
		next: { revalidate },
		headers: {
			Authorization: `Bearer ${access_token}`,
			"Accept-Language": "ja-JP,ja;q=0.9",
		},
	});

	if (!res.ok) {
		throw new Error(`Failed to fetch data from Spotify API: ${res.status}`);
	}

	return res.json();
}
