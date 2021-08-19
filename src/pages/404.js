import { Link } from "gatsby"
import React from "react"

const NotFoundPage = () => (
    <>
        <h2>page not found</h2>
        <p>but you can return home from <Link to='/'>here</Link>.</p>
    </>
)

export default NotFoundPage
