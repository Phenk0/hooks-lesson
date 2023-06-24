import Search from "./Search";
import NavLogo from "./NavLogo";
import NumResults from "./NumResults";

const NavBar = ({ movies }) => {
  return (
    <nav className="nav-bar">
      <NavLogo />
      <Search />
      <NumResults movies={movies} />
    </nav>
  );
};

export default NavBar;
