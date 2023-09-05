
const Header = ({ children }) => {
  return (
    <>
      <div
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
      </div>
    </>
  );
};

export default Header;
