import React from 'react'

import Layout from '../../components/Layout'
import BlogRoll from '../../components/BlogRoll'

export default class BlogIndexPage extends React.Component {
    render() {
        return (
            <div>
                <Layout>
                    <div class="container lg mx-auto px-2">
                        <h1 class="font-semibold text-xl">Latest Stories</h1>
                        <section className="section">
                            <div className="container">
                                <div className="content">
                                    <BlogRoll />
                                </div>
                            </div>
                        </section>
                    </div>
                </Layout>
            </div>
        )
    }
}
