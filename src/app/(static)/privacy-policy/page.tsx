import { Section } from "@/app/_styles/components/blocks";
import { BasicText, LinkText } from "@/app/_styles/components/texts";
import { PageWrapper } from "@/app/_styles/components/wrappers";
import "./style.scss";

export default function PrivacyPolicyPage() {
	return (
		<PageWrapper>
			<h1>プライバシーポリシー</h1>
			<div>
				<BasicText>
					本プライバシーポリシー（以下「本ポリシー」）は、本サービス（以下に定義）が利用者の情報をどのように扱うかを定めるものです。
				</BasicText>
				<BasicText>
					本サービスを利用することで、利用者は本ポリシーに同意したものとみなされます。
				</BasicText>
			</div>

			<Section>
				<h2>第1条（本サービスについて）</h2>
				<div>
					<BasicText>
						本サービスは、Spotify API および YouTube Data API
						を利用し、音楽データ・ミュージックビデオ情報などを表示するWebアプリです。
					</BasicText>
					<BasicText>
						本サービスは、利用者がSpotify上の楽曲を検索し、その楽曲に関連するYouTube動画を再生・閲覧できる機能を提供します。
					</BasicText>
				</div>

				<h2>第2条（取得する情報）</h2>
				<div>
					<BasicText>
						本サービスでは、以下の情報を取得する場合があります。
					</BasicText>

					<ol>
						<li>
							アクセス情報
							<ul>
								<li>
									ブラウザの種類・アクセス日時・IPアドレス・リファラー等の一般的なログ情報
								</li>
								<li>
									これらは、アクセス解析や不正利用防止のために利用されます。
								</li>
							</ul>
						</li>
						<li>
							外部APIを通じて取得するデータ
							<ul>
								<li>
									Spotify
									API：楽曲名、アーティスト名、アルバム情報、画像などの公開情報
								</li>
								<li>
									YouTube Data
									API：動画タイトル、チャンネル名、再生URL、サムネイルなどの公開情報
								</li>
								<li>
									これらは、アプリ内に表示するためにのみ利用され、保存・再配布は行いません。
								</li>
							</ul>
						</li>
						<li>
							Cookie・分析ツール
							<ul>
								<li>
									利用状況の把握のため、Google
									Analyticsなどの解析ツールを使用する場合があります。
								</li>
								<li>
									Cookieを通じて匿名の利用データを収集しますが、個人を特定する情報は含まれません。
								</li>
							</ul>
						</li>
					</ol>
				</div>

				<h2>第3条（YouTube Data API の利用について）</h2>

				<div>
					<BasicText>
						本サービスは、Google LLC が提供する YouTube Data API サービス
						を利用しています。
					</BasicText>
					<BasicText>
						そのため、YouTube API サービス利用規約および Google
						プライバシーポリシーが適用されます。
					</BasicText>

					<ul>
						<li>
							<LinkText
								href="https://developers.google.com/youtube/terms/api-services-terms-of-service-apac?_gl=1*hu1yn3*_up*MQ..*_ga*NDM5MjE4MDgwLjE3NjA3OTUxMzE.*_ga_SM8HXJ53K2*czE3NjA3OTUxMzEkbzEkZzAkdDE3NjA3OTUxMzEkajYwJGwwJGgw&hl=ja"
								target="_blank"
								rel="noopener noreferrer"
							>
								YouTube API サービス利用規約
							</LinkText>
						</li>
						<li>
							<LinkText
								href="https://www.youtube.com/t/terms"
								target="_blank"
								rel="noopener noreferrer"
							>
								YouTube 利用規約
							</LinkText>
						</li>
						<li>
							<LinkText
								href="https://policies.google.com/privacy"
								target="_blank"
								rel="noopener noreferrer"
							>
								Google プライバシーポリシー
							</LinkText>
						</li>
					</ul>

					<h3>データの扱い方</h3>

					<ul>
						<li>
							本サービスは、YouTube Data
							APIを通じて取得したデータ（動画タイトル、URL、チャンネル名など）を一時的に表示するのみです。
						</li>
						<li>
							取得したデータをサーバーに保存、再配布、改変することはありません。
						</li>
						<li>
							利用者がクリックした動画は、YouTube公式サイト（youtube.com）にリダイレクトされます。
						</li>
					</ul>

					<h3>ユーザーデータへのアクセス</h3>

					<ul>
						<li>
							本サービスは、YouTubeアカウント情報（OAuth認証など）を取得・保存・利用することはありません。
						</li>
						<li>利用者が認証やログインを行う機能は実装していません。</li>
					</ul>
				</div>

				<h2>第4条（Spotify API の利用について）</h2>

				<div>
					<BasicText>
						本サービスは、Spotifyが提供するSpotify Web APIを利用しています。
					</BasicText>
					<BasicText>
						取得される情報はSpotify上で一般公開されている楽曲・アーティスト情報のみであり、個人アカウント情報や再生履歴などの機密データは取得しません。
					</BasicText>

					<ul>
						<li>
							<LinkText
								href="https://developer.spotify.com/terms/"
								target="_blank"
								rel="noopener noreferrer"
							>
								Spotify Developer 利用規約
							</LinkText>
						</li>
						<li>
							<LinkText
								href="https://www.spotify.com/jp/legal/privacy-policy/"
								target="_blank"
								rel="noopener noreferrer"
							>
								Spotify プライバシーポリシー
							</LinkText>
						</li>
					</ul>
				</div>

				<h2>第5条（個人情報の利用目的）</h2>

				<div>
					<BasicText>
						本サービスでは、利用者の個人を特定できる情報（氏名・メールアドレスなど）を原則として収集しません。
					</BasicText>
					<BasicText>
						問い合わせフォーム等で個人情報を取得する場合は、以下の目的でのみ利用します。
					</BasicText>

					<ul>
						<li>問い合わせへの対応</li>
						<li>サービス改善・不具合対応</li>
						<li>法令に基づく要請への対応</li>
					</ul>
				</div>

				<h2>第6条（第三者提供・外部送信）</h2>

				<div>
					<BasicText>
						取得した情報を、第三者に販売・貸与・共有することはありません。
					</BasicText>
					<BasicText>ただし、以下の場合を除きます：</BasicText>

					<ol>
						<li>法令に基づく要請がある場合</li>
						<li>不正利用・攻撃等への対応で必要と判断される場合</li>
						<li>
							サービス運営上、統計的に処理された匿名データを共有する場合（個人識別不可）
						</li>
					</ol>
				</div>

				<h2>第7条（データの保存期間）</h2>

				<div>
					<BasicText>
						アクセスログや利用解析データは、一定期間保存後、自動的に削除されます。
					</BasicText>
					<BasicText>
						外部APIから取得したデータは、一時的にキャッシュとして利用する場合がありますが、永続的に保存されることはありません。
					</BasicText>
				</div>

				<h2>第8条（ユーザーの権利）</h2>

				<div>
					<BasicText>
						利用者は、個人情報が収集された場合、以下の権利を有します。
					</BasicText>

					<ul>
						<li>開示・訂正・削除の請求</li>
						<li>利用停止の請求</li>
						<li>同意撤回の請求</li>
					</ul>
				</div>

				<h2>第9条（安全管理措置）</h2>

				<BasicText>
					本サービスは、取得した情報を安全に管理するため、SSL通信の採用・不正アクセス防止・最低限のアクセス権管理を実施しています。
				</BasicText>

				<h2>第10条（お問い合わせ窓口）</h2>

				<div>
					<BasicText>
						プライバシーに関するお問い合わせは、以下までお願いいたします。
					</BasicText>
					<ul>
						<li>
							X(旧Twitter)：
							<LinkText
								href="https://x.com/MONOMONOSU"
								target="_blank"
								rel="noopener noreferrer"
							>
								@MONOMONOSU
							</LinkText>
						</li>
					</ul>
				</div>

				<h2>第11条（ポリシーの変更）</h2>

				<div>
					<BasicText>
						本ポリシーの内容は、必要に応じて予告なく変更される場合があります。
					</BasicText>
					<BasicText>
						変更後のポリシーは、本ページに掲載された時点で効力を生じます。
					</BasicText>
				</div>
			</Section>

			<BasicText>2025年10月18日 発行</BasicText>
		</PageWrapper>
	);
}
