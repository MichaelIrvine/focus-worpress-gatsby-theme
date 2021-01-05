import React from "react"
import SEO from "../components/seo"
import { Helmet } from "react-helmet"

const Page = ({ pageContext }) => {
  console.log(pageContext)
  return (
    <>
      <Helmet
        bodyAttributes={{ class: `page-template ${pageContext.slug}-page` }}
      />
      <SEO title={pageContext.title} />
    </>
  )
}

export default Page
