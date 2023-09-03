
const Header = ({ children }) => {
  return (
    <>
      <header
        style={{
          display: 'flex',
          flexFlow: 'column nowrap',
          position: 'sticky',
          top: 0,
          left: 0,
          right: 0,
          backgroundColor: 'var(--app-background-color)',
          zIndex: 2,
        }}
      >
        {children}
      </header>
    </>
  );
};

export default Header;
