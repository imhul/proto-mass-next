import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"
import readme from "../../README.md?raw"
import "github-markdown-css/github-markdown.css"

const Home = () => {
    return (
        <div className="sm:p-10">
            <div className="flex flex-col p-10 markdown-body">
                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                    {readme}
                </ReactMarkdown>
            </div>
        </div>
    )
}

export default Home
