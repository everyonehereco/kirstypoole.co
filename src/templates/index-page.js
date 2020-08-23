import React from 'react'
import { Link, graphql } from 'gatsby'
import Image from 'gatsby-image'
import Content, { HTMLContent } from '../components/Content'

import Layout from '../components/Layout'
import BlogCard from '../components/BlogCard'

export const IndexPageTemplate = ({ image, body, posts }) => (
    <>
        <div class="container lg mx-auto mt-16 px-8">
            <div class="grid grid-cols-2 gap-6 mx-2">
                <div>
                    <h1 class="text-5xl pr-4 border-b-4 border-gray-700 inline-block font-semibold">
                        Kirsty Poole
                    </h1>
                    <div className="mt-6">
                        <HTMLContent className="markdown" content={body} />
                    </div>
                </div>
                <div class="md:justify-end md:flex ">
                    <div
                        class="w-full bg-cover bg-center"
                        style={{
                            backgroundImage: `url(${image.childImageSharp.fluid.src})`,
                        }}
                    ></div>
                </div>
            </div>
        </div>
        <div class="bg-base-gray mt-16 pb-16 px-8">
            <div class="container lg mx-auto">
                <h2 class="py-10 text-5xl font-semibold flex justify-center mx-2">
                    Blog
                </h2>
                <div class="grid grid-cols-2 gap-6 mx-2 pt-16">
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
