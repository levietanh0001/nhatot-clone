const Header = ({ children }) => {
  return (
    <>
      <header
        style={{
          display: "flex",
          flexFlow: "column nowrap",
          position: "sticky",
          top: 0,
          left: 0,
          right: 0,
          backgroundColor: "white",
          zIndex: 2,
          // paddingBottom: '20px',
          // boxShadow: '0 0 1px 0'
          // outline: '1px solid red'
        }}
      >
        {children}
      </header>
    </>
  );
};

export default Header;
