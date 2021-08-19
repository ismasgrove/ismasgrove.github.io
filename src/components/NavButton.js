import React from 'react'
import { navigate } from 'gatsby'
import tw, { styled } from 'twin.macro'

const StyledButton = styled.button(() => [
  tw`mr-4 text-lg hover:cursor-pointer`
])

const StyledNavButton = ({ link, title }) => {
  return <StyledButton
  onClick={() => navigate(link)}
  >
    {title}
  </StyledButton>
}

export default function NavButton (props) {
  return (
    <StyledNavButton link={props.link} title={props.title}/>
  )
}
