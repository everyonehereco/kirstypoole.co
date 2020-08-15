import React from 'react'
import { Link } from 'gatsby'
import github from '../img/github-icon.svg'
import logo from '../img/logo.svg'

const Navbar = class extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            active: false,
            navBarActiveClass: '',
        }
    }

    toggleHamburger = () => {
        // toggle the active boolean in the state
        this.setState(
            {
                active: !this.state.active,
            },
            // after state has been updated,
            () => {
                // set the class in state for the navbar accordingly
                this.state.active
                    ? this.setState({
                          navBarActiveClass: 'is-active',
                      })
                    : this.setState({
                          navBarActiveClass: '',
                      })
            },
        )
    }

    render() {
        return (
            <div className="container lg mx-auto flex flex-row mt-6">
                <div class="w-full">
                    <h1 class="block text-5xl">Kirsty Poole</h1>
                    <svg class="block w-2/5 h-1">
                        <path
                            stroke="#666"
                            stroke-width="3"
                            d="M.742 1.5h294.689"
                        />
                    </svg>
                </div>
                <nav
                    aria-label="main"
                    class="flex-1 flex justify-end self-center"
                >
                    {/* Hamburger menu */}
                    <div
                        className={`navbar-burger burger ${this.state.navBarActiveClass}`}
                        data-target="navMenu"
                        onClick={() => this.toggleHamburger()}
                    >
                        <span />
                        <span />
                        <span />
                    </div>
                    <div
                        id="navMenu"
                        className={`navbar-menu ${this.state.navBarActiveClass}`}
                    >
                        <div className="navbar-start">
                            <Link
                                className="navbar-item text-xl ml-10 py-2"
                                to="/"
                            >
                                Home
                            </Link>
                            <Link
                                className="navbar-item text-xl ml-10 py-2"
                                to="/blog"
                            >
                                Blog
                            </Link>
                            <Link
                                className="navbar-item text-xl ml-10 py-2"
                                to="/about"
                            >
                                About
                            </Link>
                        </div>
                    </div>
                </nav>
            </div>
        )
    }
}

export default Navbar
