import React from 'react'
import PropTypes from 'prop-types'
import { Link, graphql, StaticQuery } from 'gatsby'
import BlogRollCard from './BlogRollCard'

class BlogRoll extends React.Component {
    render() {
        const { data } = this.props
        const { edges: posts } = data.allMarkdownRemark

        return (
            <div>
                {posts &&
                    posts.map(({ node: post }) => (
                        <div class="my-4">
                            <Link to={post.fields.slug}>
                                <BlogRollCard
                                    title={post.frontmatter.title}
                                    img={
                                        post.frontmatter.featuredimage
                                            .childImageSharp.fluid.src
                                    }
                                    description={post.frontmatter.description}
                                    date={post.frontmatter.date}
                                ></BlogRollCard>
                            </Link>
                        </div>
                    ))}
            </div>
        )
    }
}

BlogRoll.propTypes = {
    data: PropTypes.shape({
        allMarkdownRemark: PropTypes.shape({
            edges: PropTypes.array,
        }),
    }),
}

export default () => (
    <StaticQuery
        query={graphql`
            query BlogRollQuery {
                allMarkdownRemark(
                    sort: { order: DESC, fields: [frontmatter___date] }
                    filter: {
                        frontmatter: { templateKey: { eq: "blog-post" } }
                    }
                ) {
                    edges {
                        node {
                            excerpt(pruneLength: 400)
                            id
                            fields {
                                slug
                            }
                            frontmatter {
                                title
                                description
                                templateKey
                                date(formatString: "MMMM DD, YYYY")
                                featuredimage {
                                    childImageSharp {
                                        fluid(maxWidth: 120, quality: 100) {
                                            ...GatsbyImageSharpFluid
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        `}
        render={(data, count) => <BlogRoll data={data} count={count} />}
    />
)
