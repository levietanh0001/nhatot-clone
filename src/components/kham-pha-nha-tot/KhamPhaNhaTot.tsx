import { Link } from 'react-router-dom';
import styles from './KhamPhaNhaTot.module.scss';

const Card = ({ imgSrc, imgAlt, title, content, href }) => {
  return (
    <Link to={href} className={styles['card-wrapper']}>
      {/* <a href='#' className={styles['card-wrapper']}> */}
        <div className={styles['card']}>
          <div className={styles['media']}>
            <img src={imgSrc} alt={imgAlt} />
          </div>
          <div className={styles['details']}>
            <h3 className={styles['title']}>{title}</h3>
            <p className={styles['content']}>{content}</p>
          </div>
        </div>
      {/* </a> */}
    </Link>
  );
};

const KhamPhaNhaTot = () => {
  return (
    <div className='container' style={{ backgroundColor: 'var(--secondary-background-color)' }}>
      <h1 className={styles['h2']}>Khám phá Nhà tốt</h1>
      <div className={styles['cards']}>
        <Card
          imgSrc={data[0].imgSrc}
          imgAlt={data[0].imgAlt}
          title={data[0].title}
          content={data[0].content}
          href={data[0].href}
        />
        <div className={styles['separator']}></div>
        <Card
          imgSrc={data[1].imgSrc}
          imgAlt={data[1].imgAlt}
          title={data[1].title}
          content={data[1].content}
          href={data[1].href}
        />
        <div className={styles['separator']}></div>
        <Card
          imgSrc={data[2].imgSrc}
          imgAlt={data[2].imgAlt}
          title={data[2].title}
          content={data[2].content}
          href={data[2].href}
        />
        <div className={styles['separator']}></div>
        <Card
          imgSrc={data[3].imgSrc}
          imgAlt={data[3].imgAlt}
          title={data[3].title}
          content={data[3].content}
          href={data[3].href}
        />
      </div>
    </div>
  );
};

const data = [
  {
    imgSrc:
      'https://cdn.chotot.com/admincentre/I93AudxXzRuihZo-pP_GYUQdlDlWmS6ue6nA5Ql89e4/preset:raw/plain/be568cbf2ae0720df2cd3ee09ecf35c4-2818605396260909486.jpg',
    imgAlt: 'Mua bán bất động sản',
    href: '/mua-ban-bds',
    title: 'Mua bán',
    content: `213214 tin đăng mua bán`,
  },
  {
    imgSrc:
      'https://cdn.chotot.com/admincentre/Ze85oPvJOgPXMSQm6u1xiqvu2RGQHNgD6FnILbx9Psc/preset:raw/plain/dc76e8acaeb3b34307e8dbb80d5bbf27-2818605517951121494.jpg',
    imgAlt: 'Cho thuê bất động sản',
    href: 'cho-thue-bds',
    title: 'Cho thuê',
    content: `324223 tin đăng cho thuê`,
  },
  {
    imgSrc:
      'https://cdn.chotot.com/admincentre/e4OAdVx0dKh5BE-rE99uclbZ4wL3TzmkdmXUmtlUrCw/preset:raw/plain/db20d2a83102192e7e5e1cdb0719b25d-2818605604419105198.jpg',
    imgAlt: 'Dự án bất động sản',
    href: 'du-an-bds',
    title: 'Dự án',
    content: `432 dự án`,
  },
  {
    imgSrc:
      'https://cdn.chotot.com/admincentre/5OIZyA3Q60nJFVl-IrJBT0uPFi6bMMiihVTcn1kdgCo/preset:raw/plain/300b5970c2b458ac694446d6f5e6aecc-2818605007279154711.jpg',
    imgAlt: 'Môi giới bất động sản',
    href: '#',
    title: 'Môi giới',
    content: `123 chuyên trang`,
  },
];

export default KhamPhaNhaTot;
