import React from 'react'
import { Link, graphql } from 'gatsby'
import Image from 'gatsby-image'
import Content, { HTMLContent } from '../components/Content'

import Layout from '../components/Layout'
import BlogCard from '../components/BlogCard'

export const IndexPageTemplate = ({ image, body, posts }) => (
    <>
        <div class="container lg mx-auto mt-12">
            <div class="grid grid-cols-12 gap-4 mx-2">
                <div class="col-span-12 md:col-span-7">
                    <HTMLContent content={body} />
                </div>
                <div class="hidden md:justify-end md:flex md:col-span-5">
                    <img
                        class="w-84 shadow-lg"
                        src={image.childImageSharp.fluid.src}
                    />
                </div>
            </div>
        </div>
        <div class="bg-gray-600 bg-opacity-50 mt-10 pb-16">
            <div class="container lg mx-auto">
                <h2 class="py-8 text-3xl font-semibold flex justify-center mx-2">
                    Blog
                </h2>
                <div class="grid grid-cols-1 gap-6 mx-2 md:grid-cols-3">
                    {posts &&
                        posts.map(({ node: post }) => {
                            return (
                                <Link to={post.fields.slug}>
                                    <BlogCard
                                        title={post.frontmatter.title}
                                        img={
                                            post.frontmatter.featuredimage
                                                .childImageSharp.fluid.src
                                        }
                                        description={
                                            post.frontmatter.description
                                        }
                                        date={post.frontmatter.date}
                                    ></BlogCard>
                                </Link>
                            )
                        })}
                </div>
            </div>
        </div>
    </>
)

const IndexPage = ({ data }) => {
    const { frontmatter } = data.markdownRemark

    return (
        <Layout>
            <IndexPageTemplate
                image={frontmatter.image}
                body={data.markdownRemark.html}
                posts={data.allMarkdownRemark.edges}
            />
        </Layout>
    )
}

export default IndexPage

export const pageQuery = graphql`
    query IndexPageTemplate {
        markdownRemark(frontmatter: { templateKey: { eq: "index-page" } }) {
            html
            frontmatter {
                image {
                    childImageSharp {
                        fluid(maxWidth: 2048, quality: 100) {
                            ...GatsbyImageSharpFluid
                        }
                    }
                }
            }
        }
        allMarkdownRemark(
            sort: { order: DESC, fields: [frontmatter___date] }
            filter: { frontmatter: { templateKey: { eq: "blog-post" } } }
            limit: 3
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
                        templateKey
                        description
                        date(formatString: "MMMM DD, YYYY")
                        featuredimage {
                            childImageSharp {
                                fluid(maxWidth: 250, quality: 100) {
                                    ...GatsbyImageSharpFluid
                                }
                            }
                        }
                    }
                }
            }
        }
    }
`
