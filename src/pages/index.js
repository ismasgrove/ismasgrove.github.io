import React from 'react'
import { Link } from 'gatsby'
import 'twin.macro'

/*
      <Link to='/posts/what-is-this'>
        post
      </Link>
      <br/>
      <Link to='/posts/post-2'>
        post2
      </Link>
*/

export default function Home () {
  return (
    <div tw='prose'>
      <h2>work in progress</h2>
      <p>you can click <Link to='/posts/what-is-this'>here</Link> for more details</p>
    </div>
  )
}
