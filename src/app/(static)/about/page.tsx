import { Section } from "@/app/_styles/components/blocks";
import { BasicText, LinkText } from "@/app/_styles/components/texts";
import { PageWrapper } from "@/app/_styles/components/wrappers";

export default function AboutPage() {
	return (
		<PageWrapper>
			<Section>
				<h2>このサイトについて</h2>
				<div>
					<BasicText>
						このサイトはSpotify、AppleMusic、YouTubeMusic等の音楽ストリーミングサービスの配信状況をチェックする事を目標に作成しているサイトです。
					</BasicText>
					<BasicText>
						音楽ストリーミングサービスで配信中であるアルバム・シングルの曲のチェック、アーティストがリリースしたアルバムの一覧、最新リリース・人気曲のチェックが可能です。
					</BasicText>
					<BasicText>
						また、それ以外の機能として本サイトでリストアップされている楽曲リストからミュージックビデオを試聴する事もできます。（YouTubeDataAPIに検索クエリを投げて動画情報を取得しているため全く関係のない動画が再生される場合もあるのでその辺はごめんなさい🥺）
					</BasicText>

					<BasicText className="mt-2">
						まだ開発テスト段階のため、動作が不安定な箇所がございますがご了承のほどよろしくお願いいたします。
					</BasicText>
					<BasicText>
						現在はSpotifyの配信状況チェックのみ可能ですが、今後他のサービスにも対応していく予定です。
					</BasicText>
				</div>
			</Section>

			<Section>
				<h2>注意書き</h2>
				<div>
					<BasicText>
						本サイトはSpotify、AppleMusic、YouTubeMusic等の音楽ストリーミングサービスの公式サイトではありません。
					</BasicText>
					<BasicText>
						SpotifyAPI,YoutubeDataAPI等のAPIを利用しデータを取得しているため、APIリクエスト数の上限に達してしまうとデータの取得ができなくなりますのでご了承のほどよろしくお願いいたします。（リクエスト回数の上限解放はどっかのタイミングでやろうと思います）
					</BasicText>
					<BasicText>
						また、APIの仕様変更により動作しなくなる可能性もございますので、ご理解のほどよろしくお願いいたします。
					</BasicText>
				</div>
			</Section>

			<Section>
				<h2>お問い合わせ</h2>
				<div>
					<BasicText>
						ご意見・ご要望、バグ報告等がありましたら下記までご連絡ください。
					</BasicText>
					<ul>
						<li>
							<BasicText>
								<LinkText
									href="https://x.com/MONOMONOSU"
									target="_blank"
									rel="noopener noreferrer"
								>
									Twitter
								</LinkText>
								のDM
							</BasicText>
						</li>
						<li>
							<BasicText>
								<LinkText
									href="https://github.com/monomonosu/StreamChecker"
									target="_blank"
									rel="noopener noreferrer"
								>
									GitHub
								</LinkText>
								のIssue
							</BasicText>
						</li>
					</ul>
				</div>
			</Section>
		</PageWrapper>
	);
}
