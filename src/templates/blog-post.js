import React from 'react'
import PropTypes from 'prop-types'
import { kebabCase } from 'lodash'
import { Helmet } from 'react-helmet'
import { graphql, Link } from 'gatsby'
import Layout from '../components/Layout'
import Content, { HTMLContent } from '../components/Content'

export const BlogPostTemplate = ({
    content,
    contentComponent,
    description,
    title,
    helmet,
    img,
    date,
    readingTime,
}) => {
    const PostContent = contentComponent || Content

    return (
        <section>
            <div class="h-10 bg-black w-full">
                <div className="flex container lg mx-auto px-8 h-full items-center">
                    <a
                        className="align-middle text-white text-sm font-light"
                        href="/"
                    >
                        Back to Home
                    </a>
                </div>
            </div>
            <div
                className="bg-cover bg-center h-64 w-full text-center"
                style={{
                    backgroundImage: `url(${img})`,
                }}
            >
                <h1 className="font-semibold text-white text-5xl text-shadow pt-12">
                    {title}
                </h1>
                <p className="text-white text-shadow pt-8">{description}</p>
            </div>
            {helmet || ''}
            <div className="container lg mx-auto py-12 mt-4 px-8">
                <p class="text-xs font-normal my-4 px-24">
                    {date} - {readingTime}
                </p>
                <PostContent className="markdown post" content={content} />
            </div>
        </section>
    )
}

BlogPostTemplate.propTypes = {
    content: PropTypes.node.isRequired,
    contentComponent: PropTypes.func,
    description: PropTypes.string,
    title: PropTypes.string,
    helmet: PropTypes.object,
}

const BlogPost = ({ data }) => {
    const { markdownRemark: post } = data

    return (
        <Layout>
            <BlogPostTemplate
                content={post.html}
                contentComponent={HTMLContent}
                description={post.frontmatter.description}
                helmet={
                    <Helmet titleTemplate="%s | Blog">
                        <title>{`${post.frontmatter.title}`}</title>
                        <meta
                            name="description"
                            content={`${post.frontmatter.description}`}
                        />
                    </Helmet>
                }
                img={post.frontmatter.featuredimage.childImageSharp.fluid.src}
                title={post.frontmatter.title}
                date={post.frontmatter.date}
                readingTime={post.fields.readingTime.text}
            />
        </Layout>
    )
}

BlogPost.propTypes = {
    data: PropTypes.shape({
        markdownRemark: PropTypes.object,
    }),
}

export default BlogPost

export const pageQuery = graphql`
    query BlogPostByID($id: String!) {
        markdownRemark(id: { eq: $id }) {
            id
            html
            frontmatter {
                date(formatString: "MMMM DD, YYYY")
                title
                description
                featuredimage {
                    childImageSharp {
                        fluid(maxWidth: 1000, quality: 100) {
                            ...GatsbyImageSharpFluid
                        }
                    }
                }
            }
            fields {
                readingTime {
                    text
                }
            }
        }
    }
`
