import AboutUs from "../components/footer/about-us/AboutUs";
import Breadcrumb from "../components/breadcrumb/Breadcrumb";
import TopNav from "../components/navbar";
import ContactUser from "../components/product/ContactUser";
import UserCard from "../components/user-profile/UserCard";
import UserProfile from "../components/user-profile/UserProfile";
import Footer from "../layouts/Footer";
import Header from "../layouts/Header";
import UserProfileLayout from "../layouts/UserProfileLayout";

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
