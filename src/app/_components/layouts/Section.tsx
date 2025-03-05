import style from "@/app/_components/layouts/section.module.scss";

interface SectionProps {
	children: React.ReactNode;
}

export const SectionWrapper = ({ children }: SectionProps) => {
	return <div className={style.sectionWrapper}>{children}</div>;
};

export const Section = ({ children }: SectionProps) => {
	return <section className={style.section}>{children}</section>;
};
