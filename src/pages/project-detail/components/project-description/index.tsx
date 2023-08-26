export interface IProjectDescriptionProps {
    content: string;
}

export function ProjectDescription(props: IProjectDescriptionProps) {
    const { content } = props;

    return <div>{content}</div>;
}
