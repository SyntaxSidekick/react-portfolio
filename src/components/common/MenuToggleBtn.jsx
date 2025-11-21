const MenuToggle = ({ menuOpen, onToggle }) => {
  return (
    <button
      className="menu-toggle"
      aria-label={menuOpen ? "Close menu" : "Open menu"}
      aria-controls="main-navigation"
      aria-expanded={menuOpen}
      onClick={onToggle}
    >
      <i
        className={menuOpen ? "fa-solid fa-xmark" : "fa-solid fa-bars"}
        aria-hidden="true"
      ></i>
    </button>
  );
};

export default MenuToggle;
