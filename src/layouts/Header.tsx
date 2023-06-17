const Header = ({ children }) => {
  return (
    <>
      <header
        style={{
          display: "flex",
          flexFlow: "column nowrap",
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          backgroundColor: "white",
          // boxShadow: '0 0 1px 0'
          // outline: '1px solid red'
        }}
      >
        {children}
      </header>
      <div className="nav-spacer"></div>
    </>
  );
};

export default Header;
