import React from "react"
import { useStaticQuery, graphql, Link } from "gatsby"

const Footer = () => {
  const {
    allWordpressAcfOptions,
    wordpressWpApiMenusMenusItems,
  } = useStaticQuery(graphql`
    query MyQuery {
      allWordpressAcfOptions {
        nodes {
          options {
            footer_contact_info
          }
        }
      }
      wordpressWpApiMenusMenusItems(name: { eq: "Footer Menu" }) {
        items {
          object_id
          object_slug
          title
        }
      }
    }
  `)

  return (
    <footer>
      <div className="footer-col">
        <div className="footer-col-1">
          <h2>Site</h2>
        </div>
        <div className="footer-col-2">
          <nav className="footer-nav">
            {wordpressWpApiMenusMenusItems.items.map(menuItem => {
              return (
                <Link to={`/${menuItem.object_slug}`} key={menuItem.object_id}>
                  {menuItem.title}
                </Link>
              )
            })}
          </nav>
        </div>
      </div>
      <div className="footer-contact footer-col">
        <div className="footer-col-1">
          <h2>Connect</h2>
        </div>
        <div className="footer-col-2">
          <p
            dangerouslySetInnerHTML={{
              __html:
                allWordpressAcfOptions.nodes[0].options.footer_contact_info,
            }}
          ></p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
