import Header from "../../layouts/Header";
import HeaderBottom from "./HeaderBottom";
import LowerTopNav from "./LowerTopNav";
import UpperTopNav from "./UpperTopNav";


const TopNav = () => {

  return (
    <Header>
      <UpperTopNav />
      <LowerTopNav />
      <HeaderBottom />
    </Header>
  );
};

export default TopNav;
