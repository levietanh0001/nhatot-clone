const Header = ({ children }) => {
  return (
    <>
      <header
        style={{
          display: 'flex',
          flexFlow: 'column nowrap',
          position: 'sticky',
          marginBottom: '7px',
          top: 0,
          left: 0,
          right: 0,
          backgroundColor: 'var(--app-background-color)',
          zIndex: 2,
        }}
      >
        {children}
        <div className='header-bottom-spacer'></div>
      </header>
    </>
  );
};

export default Header;
