import { MouseEventHandler } from "react";
import ReactQuill from "react-quill";
import { Link } from "react-router-dom";
import "react-quill/dist/quill.bubble.css";
import { getPlainTextFromHTML } from "../util/string";

interface BlogCardProps {
	author: {
		name: string;
	};
	title: string;
	content: string;
	publishedDate: string;
	id: string;
	fullWidth?: boolean;
}

const BlogCard = ({ author, title, content, publishedDate, id }: BlogCardProps) => {
	// split and slice combination is added so that the string doesn't get trimmed in middle of a word
	const quillContent = getPlainTextFromHTML(content).split(" ").slice(0, 40).join(" ") + "...";

	return (
		<Link
			to={`/blog/${id}`}
			className="blog-card px-4 py-8 w-full md:w-3/6 md:border-b md:border-gray-200 my-2 bg-white shadow-b-sm grid grid-cols-12"
		>
			<div className="col-span-12 md:col-span-9 md:px-4">
				<div className="flex items-center gap-4">
					<Avatar name={author?.name || ""} />
					<div>
						<span>{author?.name}</span> ·{" "}
						<span className="text-sm text-slate-500">{publishedDate}</span>
					</div>
				</div>
				<div className="text-xl font-bold pt-4">{title}</div>
				<div className="tracking-wide py-4 text-slate-600">
					<ReactQuill value={quillContent} readOnly={true} theme={"bubble"} />
				</div>
				<div className="text-gray-600">{Math.ceil(content.length / 300)} min read</div>
			</div>
			<div className="hidden col-span-0 md:col-span-3 p-4 md:flex justify-center items-center">
				<ArticleImage uniqueId={id} />
			</div>
		</Link>
	);
};

export default BlogCard;

function ArticleImage({ uniqueId }: { uniqueId: string }) {
	return (
		<object data={`https://source.unsplash.com/random/150x150?sig=${uniqueId}`} type="image/jpeg">
			<div className="bg-gray-50 w-[100%] animate-pulse aspect-square"></div>
		</object>
	);
}

type AvatarProps = {
	name: string;
	size?: "small" | "medium" | "large";
	onClick?: MouseEventHandler<HTMLDivElement>;
};
export function Avatar({ name, onClick, size = "medium" }: AvatarProps) {
	const getDimensions = () => {
		switch (size) {
			case "small":
				return {
					containerSize: "w-5 h-5",
				};
			case "medium":
				return {
					containerSize: "w-10 h-10",
				};
			case "large":
				return {
					containerSize: "w-20 h-20",
					textSize: "text-xl",
				};
		}
	};

	const { containerSize, textSize } = getDimensions();
	return (
		<div
			onClick={onClick}
			className={`relative inline-flex items-center justify-center overflow-hidden bg-gray-200 hover:bg-gray-50 rounded-full ${containerSize}`}
		>
			<span className={`font-medium ${textSize} text-gray-600`}>
				{name.split(" ")?.[0]?.[0]}
				{name?.split(" ")?.[1]?.[0]}
			</span>
		</div>
	);
}
