import { Section } from "@/app/_styles/components/blocks";
import { BasicText, LinkText } from "@/app/_styles/components/texts";
import { PageWrapper } from "@/app/_styles/components/wrappers";
import "./style.scss";

export default function TermsOfUsePage() {
	return (
		<PageWrapper>
			<h1>利用規約</h1>
			<BasicText>
				本利用規約（以下「本規約」）は、ユーザー（以下「利用者」）が、本サービス（以下に定義）を利用する際に適用される条件を定めたものです。本サービスを利用することで、利用者は本規約に同意したものとみなされます。
			</BasicText>
			<Section>
				<h2>第1条（サービスの内容）</h2>

				<div>
					<BasicText>
						本サービスは、Spotify API および YouTube Data API
						を活用し、以下の機能を提供します。
					</BasicText>

					<ul>
						<li>
							Spotify上で公開されている楽曲データ（人気曲・新着曲・アーティスト情報など）の検索・閲覧
						</li>
						<li>
							楽曲情報をもとに、対応するミュージックビデオ（MV）を YouTube Data
							API 経由で検索・表示
						</li>
						<li>
							YouTube 上に公開されている動画の埋め込み再生および
							YouTube公式ページへのリンク
						</li>
					</ul>

					<BasicText>
						本サービスは、あくまで
						SpotifyおよびYouTubeの公式APIを利用した情報表示サービス
						であり、YouTube・Spotifyの公式アプリやサイトを代替するものではありません。
					</BasicText>
				</div>

				<h2>第2条（利用条件）</h2>
				<div>
					<ol className="mt-0 mb-0">
						<li>
							利用者は、本サービスを個人の非営利目的で利用することができます。
						</li>

						<li>
							本サービスを利用するにあたり、YouTubeおよびSpotifyの利用規約にも同意する必要があります。
							<ul>
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
										href="https://developers.google.com/youtube/terms/api-services-terms-of-service-apac?_gl=1*1d590uu*_up*MQ..*_ga*NTA5MjI1NjQxLjE3NjA3ODQ1NDQ.*_ga_SM8HXJ53K2*czE3NjA3ODQ1NDQkbzEkZzAkdDE3NjA3ODQ1NDQkajYwJGwwJGgw&hl=ja"
										target="_blank"
										rel="noopener noreferrer"
									>
										YouTube API サービス利用規約
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

								<li>
									<LinkText
										href="https://developer.spotify.com/terms"
										target="_blank"
										rel="noopener noreferrer"
									>
										Spotify Developer 利用規約
									</LinkText>
								</li>
							</ul>
						</li>

						<li>
							本サービスを利用することで、利用者はこれらの外部サービスのポリシーにも従うことに同意したものとみなされます。
						</li>
					</ol>
				</div>

				<h2>第3条（禁止事項）</h2>

				<div>
					<BasicText>利用者は、以下の行為を行ってはなりません。</BasicText>

					<ol>
						<li>YouTubeやSpotifyの著作権・商標権などの権利を侵害する行為</li>
						<li>API経由で取得したデータを複製・再配布・販売する行為</li>
						<li>
							本サービスの不正利用、解析、スクレイピング、リバースエンジニアリング
						</li>
						<li>公序良俗または法律に反する行為</li>
						<li>他のユーザーまたは第三者に損害を与える行為</li>
					</ol>
				</div>

				<h2>第4条（YouTube動画およびコンテンツについて）</h2>

				<div>
					<ol className="mt-0 mb-0">
						<li>
							本サービス上で表示・再生される動画は、すべてYouTubeがホストする公式コンテンツです。
						</li>
						<li>動画の著作権は各権利者に帰属します。</li>
						<li>
							本サービスは、YouTube Data
							APIを利用して動画情報を取得・埋め込み再生しており、
							動画データを独自に保存・配信することはありません。
						</li>
						<li>
							利用者は、動画をクリックすることでYouTube公式サイトへ移動することができます。
						</li>
					</ol>
				</div>

				<h2>第5条（免責事項）</h2>

				<div>
					<ol className="mt-0 mb-0">
						<li>
							本サービスは、YouTubeおよびSpotifyのAPIを利用して情報を取得しており、
							提供内容の正確性・完全性・継続性を保証するものではありません。
						</li>
						<li>
							外部APIの変更・制限・停止などにより、本サービスの一部または全部の機能が利用できなくなる場合があります。
						</li>
						<li>
							本サービスの利用により生じた損害について、運営者は一切の責任を負いません。
						</li>
					</ol>
				</div>

				<h2>第6条（利用停止・変更・終了）</h2>

				<div>
					<BasicText>
						運営者は、以下の場合に、事前の通知なくサービスを停止・変更・終了できるものとします。
					</BasicText>

					<ul>
						<li>外部API（YouTubeやSpotify）の仕様変更や提供停止</li>
						<li>システムの保守・障害対応</li>
						<li>法律・ポリシーの改定に伴う対応</li>
					</ul>
				</div>

				{/* TODO:プライバシーポリシーページ出来次第リンクを追加 */}
				<h2>第7条（個人情報の取り扱い）</h2>
				<BasicText>
					利用者の個人情報の取り扱いについては、別途定めるプライバシーポリシーに従います。
				</BasicText>

				<h2>第8条（準拠法および裁判管轄）</h2>
				<div>
					<BasicText>本規約は日本法に準拠します。</BasicText>
					<BasicText>
						本サービスに関して紛争が生じた場合は、運営者所在地を管轄する日本の裁判所を第一審の専属的合意管轄裁判所とします。
					</BasicText>
				</div>

				<h2>第9条（お問い合わせ）</h2>
				<div>
					<BasicText>
						本規約に関するお問い合わせは、以下の連絡先までお願いいたします。
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
			</Section>

			<BasicText>2025年10月18日 発行</BasicText>
		</PageWrapper>
	);
}
