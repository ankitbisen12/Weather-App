import classes from "./Header.module.css";

const Header = () => {
  return (
    <header className={classes.header}>
      <i className="fa-solid fa-cloud-bolt"> Weather App</i>
    </header>
  );
};

export default Header;
