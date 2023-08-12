import AboutUs from '~/components/common/footer/about-us/AboutUs';
import TopNav from '~/components/common/navbar';
import UserCard from '~/components/user-profile/UserCard';
import UserProfile from '~/components/user-profile/UserProfile';
import Footer from '~/layouts/Footer';
import Header from '~/layouts/Header';
import UserProfileLayout from '~/layouts/UserProfileLayout';

const UserProfilePage = () => {
  return (
    <>
      <Header>
        <TopNav />
      </Header>
      <body>
        <main>
          <UserProfileLayout userInfo={<UserCard />} posts={<UserProfile />} />
        </main>
      </body>
      <Footer>
        <AboutUs />
      </Footer>
    </>
  );
};

export default UserProfilePage;
