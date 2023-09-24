import { TopLoadingBarContext } from "@/contexts/top-loading-bar/TopLoadingBar.context";
import { useContext } from "react";
import LoadingBar from "react-top-loading-bar";

const Header = ({ children }) => {

  const topLoadingBarContext = useContext(TopLoadingBarContext);

  return (
    <>
      <LoadingBar 
        color='#FF7C05'
        progress={topLoadingBarContext?.progress} 
        onLoaderFinished={() => topLoadingBarContext?.setProgress(0)}
      />
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
