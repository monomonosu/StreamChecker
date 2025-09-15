## このアプリについて

StreamCheckerはSpotify、AppleMusic、YouTubeMusic等の音楽ストリーミングサービスの配信状況をチェックする事を目標に作成しているアプリケーションです。

現在はSpotifyで配信中であるアルバム・シングルの曲のチェック、アーティストがリリースしたアルバムの一覧、最新リリース・人気曲のチェックが可能です。
また、それ以外の機能として本アプリケーションでリストアップされている楽曲リストからミュージックビデオを試聴する事もできます。
（YouTubeDataAPIに検索クエリを投げて動画情報を取得しているため全く関係のない動画が再生される場合もあるのでその辺はご了承のほどよろしくお願いします🥺）

## デプロイ情報
このアプリケーションはVercelを使用してデプロイしております。
URL：https://stream-checker.vercel.app/

ローカルでの動作を確認する場合はGetting Startedを参照の上立ち上げお願いします。

## Getting Started

```
// .env.local
YOUTUBE_API_KEY={YoutubeDataAPI用のGoogleAPIKey}
YOUTUBE_API_BASE_URL={YoutubeDataAPIのBaseURL}
SPOTIFY_CLIENT_ID={SpotifyAPIのClientId}
SPOTIFY_CLIENT_SECRET={SpotifyAPIのClientSecret}
SPOTIFY_API_BASE_URL={SpotifyAPIのBaseURL}
```

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
