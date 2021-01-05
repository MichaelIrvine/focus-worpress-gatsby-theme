import React, { useState, useRef, useEffect } from "react"
import useOnClickOutside from "../hooks.js"
import Branding from "./branding"
import Nav from "./nav"
import MenuButton from "./menuButton"

const Header = () => {
  const [open, setOpen] = useState(false)

  const node = useRef()

  useEffect(() => {
    const handler = () => {
      if (open) {
        setOpen(false)
      }
    }

    window.addEventListener("scroll", handler, { passive: true })
    window.addEventListener("resize", handler)
    return () => {
      window.addEventListener("scroll", handler)
      window.addEventListener("resize", handler)
    }
  }, [open])

  useOnClickOutside(node, () => setOpen(false))
  return (
    <header>
      <Branding />
      <div className="nav-wrapper" ref={node}>
        <MenuButton open={open} setOpen={setOpen} />
        <Nav open={open} setOpen={setOpen} />
      </div>
    </header>
  )
}

export default Header
