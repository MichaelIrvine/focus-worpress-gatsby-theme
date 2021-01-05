import React from "react"
import styled from "styled-components"

const StyledMenuButton = styled.button`
  display: inline-block;
  width: fit-content;
  padding: 0;
  @media (min-width: 768px) {
    display: none;
  }
`

const MenuButton = ({ open, setOpen }) => {
  return (
    <StyledMenuButton
      className="mobile-menu-button"
      open={open}
      onClick={() => setOpen(!open)}
    >
      {!open ? "Menu" : "Close"}
    </StyledMenuButton>
  )
}

export default MenuButton
