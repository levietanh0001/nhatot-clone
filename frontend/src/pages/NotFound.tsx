import { Link } from 'react-router-dom';
import AboutUs from '~/components/common/footer/about-us/AboutUs';
import TopNav from '~/components/common/navbar';
import Footer from '~/components/layouts/Footer';
import Header from '~/components/layouts/Header';

const NotFound = () => {
  return (
    <>
      <Header>
        <TopNav />
      </Header>
      <body
        style={{
          backgroundColor: 'var(--secondary-background-color)',
          marginBottom: '15px',
        }}
      >
        <div className='container'>
          <div
            className='404-state'
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              padding: '75px 15px 30px 15px',
            }}
          >
            <img
              height='200px'
              width='100%'
              style={{
                height: 'auto',
                maxWidth: '400px',
                marginBottom: '30px',
              }}
              src='https://static.chotot.com/storage/empty_state/desktop/404_error.png'
              alt='PageNotFound'
              loading='lazy'
            />
            <div className='warning' style={{ marginBottom: '30px' }}>
              <h1
                style={{
                  textAlign: 'center',
                  fontSize: '1.25rem',
                  fontWeight: 600,
                  margin: 0,
                }}
              >
                Lỗi - Không tìm thấy trang
              </h1>
              <p
                style={{
                  textAlign: 'center',
                  fontSize: '1rem',
                  margin: 0,
                  marginTop: '7px',
                }}
              >
                Trang bạn đang tìm không tồn tại. Vui lòng kiểm tra lại đường
                dẫn hoặc bấm 'Quay về trang chủ'
              </p>
            </div>

            <Link to='/'>
              <button
                style={{
                  width: '113px',
                  height: '32px',
                  padding: '8px 16px',
                  color: 'white',
                  fontSize: '0.875rem',
                  backgroundColor: 'var(--orange-800)',
                  border: 0,
                  borderRadius: '4px',
                }}
              >
                Về trang chủ
              </button>
            </Link>
          </div>
        </div>
      </body>
      <Footer>
        <AboutUs />
      </Footer>
    </>
  );
};

export default NotFound;
