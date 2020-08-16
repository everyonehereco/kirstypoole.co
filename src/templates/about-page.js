import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import Layout from '../components/Layout'
import Content, { HTMLContent } from '../components/Content'

export const AboutPageTemplate = ({ title, content, contentComponent }) => {
    const PageContent = contentComponent || Content

    return (
        <section className="container lg mx-auto mt-12">
            <div className="section">
                <h2 className="title is-size-3 has-text-weight-bold is-bold-light">
                    {title}
                </h2>
                <PageContent className="markdown" content={content} />
            </div>
        </section>
    )
}

AboutPageTemplate.propTypes = {
    title: PropTypes.string.isRequired,
    content: PropTypes.string,
    contentComponent: PropTypes.func,
}

const AboutPage = ({ data }) => {
    const { markdownRemark: post } = data

    return (
        <div class="bg-pink-100">
            <Layout>
                <AboutPageTemplate
                    contentComponent={HTMLContent}
                    title={post.frontmatter.title}
                    content={post.html}
                />
            </Layout>
        </div>
    )
}

AboutPage.propTypes = {
    data: PropTypes.object.isRequired,
}

export default AboutPage

export const aboutPageQuery = graphql`
    query AboutPage($id: String!) {
        markdownRemark(id: { eq: $id }) {
            html
            frontmatter {
                title
            }
        }
    }
`
