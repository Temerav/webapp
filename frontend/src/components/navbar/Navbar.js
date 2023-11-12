import { Link, useMatch, useResolvedPath } from "react-router-dom"

const Navbar = () => {

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <Link to="/" className="navbar-brand">
        Webapp
      </Link>
      <ul className='navbar-nav mr-auto'>
        <CustomLink to="/admin" className='nav-link'>Admin</CustomLink>
        <CustomLink to="/about" className='nav-link'>About</CustomLink>
      </ul>
    </nav>
  )
}

function CustomLink({ to, children, ...props }) {
  const resolvedPath = useResolvedPath(to)
  const isActive = useMatch({ path: resolvedPath.pathname, end: true })

  return (
    <li className={isActive ? "active" : ""}>
      <Link to={to} {...props}>
        {children}
      </Link>
    </li>
  )
}

export default Navbar;