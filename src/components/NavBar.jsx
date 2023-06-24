import NavLogo from "./NavLogo";

const NavBar = ({ children }) => {
  return (
    <nav className="nav-bar">
      <NavLogo />
      {children}
    </nav>
  );
};

export default NavBar;
