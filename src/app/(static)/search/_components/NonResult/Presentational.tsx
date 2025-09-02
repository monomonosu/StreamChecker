import { Section } from "@/app/_styles/components/blocks";
import { SearchForm } from "@/app/(static)/search/_components/SearchForm";

export const Presentational = () => {
	return (
		<Section>
			<h1>
				お探しのものが見つからないようです。条件を変更して再度検索してください。
			</h1>

			<SearchForm />
		</Section>
	);
};
