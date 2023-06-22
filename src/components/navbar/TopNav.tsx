import styles from './TopNav.module.scss';
import ThirdTopNav from './ThirdTopNav';
import SecondTopNav from './SecondTopNav';
import ToggleThemeButton from './ToggleThemeButton';
import FirstTopNav from './FirstTopNav';

const TopNav = () => {
  return (
    <div className={styles['wrapper']}>
      <FirstTopNav />
      <SecondTopNav />
      <ThirdTopNav />
      <ToggleThemeButton />
    </div>
  );
};

export default TopNav;
