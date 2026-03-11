import { marked } from 'marked'

interface ArticleBodyProps {
  body: string
}

const ArticleBody = ({ body }: ArticleBodyProps) => {
  const html = marked.parse(body) as string
  return (
    <div className="row article-content">
      <div
        className="col-md-12"
        dangerouslySetInnerHTML={{
          __html: html,
        }}
      />
    </div>
  )
}

export default ArticleBody
