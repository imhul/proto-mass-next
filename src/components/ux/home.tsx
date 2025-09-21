import readme from "@root/README.md?raw"
// components
import FireCanvas from "@components/ux/fire"
import ReactMarkdown from "react-markdown"
// utils
import remarkGfm from "remark-gfm"
import rehypeRaw from "rehype-raw"
import "github-markdown-css/github-markdown.css"

const Home = () => {
    return (
        <div className="relative min-h-screen">
            <div className="sm:p-10 home z-1 relative">
                <div className="flex flex-col p-10 markdown-body">
                    <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}>
                        {readme}
                    </ReactMarkdown>
                </div>
            </div>
            <FireCanvas />
        </div>
    )
}

export default Home
