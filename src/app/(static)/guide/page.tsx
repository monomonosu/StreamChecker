import { BasicText, LinkText } from "@/app/_styles/components/texts";
import { CenterWrapper, PageWrapper } from "@/app/_styles/components/wrappers";

import style from "@/app/(static)/guide/index.module.scss";

export default function Guide() {
	return (
		<PageWrapper>
			<h1>ガイドページ</h1>

			<div className={style.content}>
				<CenterWrapper style={{ flexDirection: "column" }}>
					<h2>目次</h2>
					<hr className={style.border} style={{ width: "200px" }} />
				</CenterWrapper>

				<section>
					<ul>
						<li>
							<h4>機能</h4>
							<ul>
								<li>
									<div>
										<LinkText href="#mv-preview">MVプレビュー機能</LinkText>
									</div>
									<div>
										<LinkText href="#theme-toggle">テーマカラー変更</LinkText>
									</div>
									<div>
										<LinkText href="#search">検索機能</LinkText>
									</div>
								</li>
							</ul>

							<h4>各種ページ</h4>
							<ul>
								<li>
									<div>
										<LinkText href="#top-page">TOPページ</LinkText>
									</div>
									<div>
										<LinkText href="#new-popularity-page">
											新着アルバム・シングルページ／人気アルバム・シングルページ
										</LinkText>
									</div>
									<div>
										<LinkText href="#album-page">アルバムページ</LinkText>
									</div>
									<div>
										<LinkText href="#artist-page">アーティストページ</LinkText>
									</div>
									<div>
										<LinkText href="#search-page">検索結果ページ</LinkText>
									</div>
								</li>
							</ul>
						</li>
					</ul>
				</section>
			</div>

			<div>
				<BasicText>
					このページでは本サイトの機能や各種ページの説明を記載しています。
				</BasicText>
				<BasicText>
					※現在開発中のため、ガイドページの記載と実際の機能・画面に差異がある場合がございます。
				</BasicText>
			</div>
			<div className={style.content}>
				<CenterWrapper style={{ flexDirection: "column" }}>
					<h2>機能</h2>
					<hr className={style.border} style={{ width: "200px" }} />
				</CenterWrapper>

				<section className={style.section} id="mv-preview">
					<h3>MVプレビュー機能</h3>

					<ul>
						<li>
							<h4>機能紹介</h4>
							<ul>
								<li>
									<BasicText>
										トラックリストから曲を選択する事でその曲のミュージックビデオをプレビューする事ができます。
									</BasicText>
									<BasicText>
										プレビューエリアは画面下部に表示されます。
									</BasicText>
									<BasicText>
										※YouTubeDataAPIに検索クエリを投げて動画情報を取得しているため、全く関係のない動画が再生される場合もあります。すんません🥺
									</BasicText>
								</li>
							</ul>

							<h4>使い方</h4>
							<ul>
								<li>
									<BasicText>
										アルバムページ・アーティストページ・検索ページ等にあるトラックリストから曲を選択する事でミュージックビデオのプレビューが可能です。
									</BasicText>
									<BasicText>
										トラックリスト内の曲を再生中、次・前の曲が存在する場合、PC・スマートフォン・音響機器のトラック操作ボタンを使用する事で再生操作を行う事も可能です。
									</BasicText>
									<BasicText>
										また、トラックリスト内の曲の範囲で連続再生に対応しています。
									</BasicText>
								</li>
							</ul>
						</li>
					</ul>
				</section>

				<hr className={style.border} />

				<section className={style.section} id="theme-toggle">
					<h3>テーマカラー変更</h3>

					<ul>
						<li>
							<h4>機能紹介</h4>
							<ul>
								<li>
									<BasicText>
										サイト全体のテーマカラーを変更する事ができます。
									</BasicText>
									<BasicText>
										テーマカラーはダークモード・ライトモードの2種類から選択可能です。
									</BasicText>
								</li>
							</ul>
						</li>
						<li>
							<h4>使い方</h4>
							<ul>
								<li>
									<BasicText>
										テーマカラーは画面右上のハンバーガーメニューから変更する事ができます。
									</BasicText>
									<BasicText>
										ハンバーガーメニューを開き、テーマトグルをクリックする事でテーマカラーを変更する事ができます。
									</BasicText>
								</li>
							</ul>
						</li>
					</ul>
				</section>

				<hr className={style.border} />

				<section className={style.section} id="search">
					<h3>検索機能</h3>

					<ul>
						<li>
							<h4>機能紹介</h4>
							<ul>
								<li>
									<BasicText>
										フリーワード入力でアルバム・アーティスト・楽曲を検索する事ができます。
									</BasicText>
									<BasicText>
										検索結果はアルバム・アーティスト・楽曲の3つのカテゴリに分かれて表示されます。
									</BasicText>
								</li>
							</ul>

							<h4>使い方</h4>
							<ul>
								<li>
									<BasicText>
										検索フォームは画面右上、ハンバーガーメニュー左隣の虫眼鏡アイコンをクリックする事で表示されます。
									</BasicText>
									<BasicText>
										検索したいワードを入力し、Submitボタンを押す事で検索結果のページに遷移し、検索結果のアルバム・アーティストをクリックする事でそのページに遷移する事ができます。
									</BasicText>
								</li>
							</ul>
						</li>
					</ul>
				</section>
			</div>

			<div className={style.content}>
				<CenterWrapper style={{ flexDirection: "column" }}>
					<h2>各種ページ</h2>
					<hr className={style.border} style={{ width: "200px" }} />
				</CenterWrapper>

				<section className={style.section} id="top-page">
					<h3>TOPページ</h3>

					<ul>
						<li>
							<h4>説明</h4>
							<ul>
								<li>
									<BasicText>
										TOPページでは最新リリース・人気のアルバムを確認する事ができます。
									</BasicText>
									<BasicText>
										TOPページで表示する最新リリース・人気のアルバムの表示数は上限を絞っているため、さらに表示したい場合は「ReadMoreNewAlbums...」「ReadMorePopularAlbums...」のリンクから「新着アルバム・シングル」ページ・「人気アルバム・シングル」ページに遷移する事で全件閲覧が可能です。
									</BasicText>
									<BasicText>
										また、「新着アルバム・シングル」ページ・「人気アルバム・シングル」ページへはヘッダーの「新着」・「人気」リンクからも遷移する事ができます。
									</BasicText>
								</li>
							</ul>
						</li>
					</ul>
				</section>

				<hr className={style.border} />

				<section className={style.section} id="new-popularity-page">
					<h3>新着アルバム・シングルページ／人気アルバム・シングルページ</h3>

					<ul>
						<li>
							<h4>説明</h4>
							<ul>
								<li>
									<BasicText>
										新着アルバム・シングルページでは新しく配線されたアルバム・シングルの一覧を確認する事ができます。
									</BasicText>
									<BasicText>
										人気アルバム・シングルページでは人気のアルバム・シングルの一覧を確認する事ができます。
									</BasicText>
									<BasicText>
										ページは無限スクロールに対応しているため、さらに情報を確認したい場合は下部にスクロールする事で確認する事ができます。
									</BasicText>
									<BasicText>
										新着アルバム・シングルページ／人気アルバム・シングルページではアルバムのジャケット画像、アーティスト名、アルバム名を確認する事ができます。
									</BasicText>
									<BasicText>
										アルバムのジャケット画像、アルバム名をクリックする事でアルバムページに遷移する事ができます。
									</BasicText>
									<BasicText>
										アーティスト名をクリックする事でアーティストページに遷移する事ができます。
									</BasicText>
									<BasicText>
										新着アルバム・シングルページ／人気アルバム・シングルページへはヘッダーの「新着」・「人気」リンクから遷移する事ができます。
									</BasicText>
								</li>
							</ul>
						</li>
					</ul>
				</section>

				<hr className={style.border} />

				<section className={style.section} id="album-page">
					<h3>アルバムページ</h3>

					<ul>
						<li>
							<h4>説明</h4>
							<ul>
								<li>
									<BasicText>
										アルバムページではアルバムのジャケット画像、アーティスト名、アルバム名、リリース日、トラックリストを確認する事ができます。
									</BasicText>
									<BasicText>
										アルバムページのトラックリストからはMVプレビュー機能を使用する事ができます。
									</BasicText>
									<BasicText>
										アルバムページへはTOPページの最新リリース・人気のアルバムから、また、検索機能利用時の検索結果ページやアーティストページのアルバム項目からも遷移する事ができます。
									</BasicText>
								</li>
							</ul>
						</li>
					</ul>
				</section>

				<hr className={style.border} />

				<section className={style.section} id="artist-page">
					<h3>アーティストページ</h3>

					<ul>
						<li>
							<h4>説明</h4>
							<ul>
								<li>
									<BasicText>
										アーティストページではアーティストのプロフィール画像、アーティスト名、リリースしたアルバムの一覧を確認する事ができます。
									</BasicText>
									<BasicText>
										アーティストページの「人気曲」エリアではアーティストの人気曲を確認する事ができ、そのトラックリストからもMVプレビュー機能を使用する事ができます。
									</BasicText>
									<BasicText>
										アーティストページへはTOPページの最新リリース・人気のアルバムのアーティスト名から、また、検索機能利用時の検索結果ページやアルバムページのアーティスト名からも遷移する事ができます。
									</BasicText>
								</li>
							</ul>
						</li>
					</ul>
				</section>

				<hr className={style.border} />

				<section className={style.section} id="search-page">
					<h3>検索結果ページ</h3>

					<ul>
						<li>
							<h4>説明</h4>
							<ul>
								<li>
									<BasicText>
										検索結果ページではフリーワード入力で検索した結果のアルバム・アーティスト・楽曲を確認する事ができます。
									</BasicText>
									<BasicText>
										検索結果ページのトラックリストからもMVプレビュー機能を使用する事ができます。
									</BasicText>
									<BasicText>
										検索結果ページへはヘッダーの虫眼鏡アイコンから検索フォームを開き、検索したいワードを入力しSubmitボタンを押す事で遷移する事ができます。
									</BasicText>
								</li>
							</ul>
						</li>
					</ul>
				</section>
			</div>
		</PageWrapper>
	);
}
