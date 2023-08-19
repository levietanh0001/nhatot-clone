import styles from './TopNav.module.scss';
import ThirdTopNav from './ThirdTopNav';
import SecondTopNav from './SecondTopNav';
import FirstTopNav from './FirstTopNav';


const TopNav = () => {
  return (
    <div className={styles['wrapper']}>
      <div className={styles['inner-wrapper']}>
        <FirstTopNav />
        <SecondTopNav />
        <ThirdTopNav />
        <div className="nav-spacer"></div>
      </div>
    </div>
  );
};

export default TopNav;
