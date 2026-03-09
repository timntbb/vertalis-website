import Link from "next/link";
import { Header } from "../page";

const sampleBlogs = [
	{ title: "Sample Blog 1", href: "/blog/sample-blog-1" },
	{ title: "Sample Blog 2", href: "/blog/sample-blog-2" },
	{ title: "Sample Blog 3", href: "/blog/sample-blog-3" },
];

export default function BlogPage() {
	return (
		<main className="min-h-screen bg-[#0a0a0c] text-white">
			<Header />
			<div className="mx-auto w-full max-w-3xl px-6 py-10">
				<h1 className="mb-6 text-3xl font-semibold">Blog</h1>
				<div className="space-y-3">
					{sampleBlogs.map((blog) => (
						<Link
							key={blog.href}
							href={blog.href}
							className="block rounded-xl border border-white/10 bg-white/5 px-4 py-3 hover:bg-white/10"
						>
							{blog.title}
						</Link>
					))}
				</div>
			</div>
		</main>
	);
}
