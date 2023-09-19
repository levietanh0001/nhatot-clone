import Paper from '@mui/material/Paper';

import HighchartsPieChart from '@components/ui/chart/HighchartsPieChart';
import { Skeleton } from '@mui/material';
import { placeholderImageSrc } from '@utils/constants.util';
import { timeAgo } from '@utils/date.util';
import { convertToInternationalCurrencySystem } from '@utils/number.util';
import { useContext, useEffect } from 'react';
import { useGetProductCountByGroup, useGetProducts } from '~/api/product.api';
import { useGetUserCountByGroup } from '~/api/user.api';
import MUITimeline from '~/components/ui/timeline/MUITimeline';
import { TopLoadingBarContext } from '~/contexts/top-loading-bar/TopLoadingBar.context';
import styles from './HomeDashboardContent.module.scss';


const HomeDashboardContent = () => {

  const topLoadingBarContext = useContext(TopLoadingBarContext);
  const { data: latestProductsData, isLoading: isLatestProductsLoading } =
    useGetProducts({ limit: 10, offset: 0 });
  const { data: userCountByGroupData } = useGetUserCountByGroup();
  const { data: productCountByGroupData } = useGetProductCountByGroup();

  useEffect(() => {

    if(isLatestProductsLoading) {
      topLoadingBarContext?.setProgress(30);
    } else {
      topLoadingBarContext?.setProgress(100);
    }

  }, [isLatestProductsLoading]);

  return (
    <>
      
      <div className={styles['wrapper']}>
        <h1 className={styles['title']}>Home</h1>

        <div className={styles['grid']}>
          <Paper
            className={styles['latest-products']}
            elevation={3}
            sx={{
              padding: '20px',
              backgroundColor: '#202020',
              borderRadius: '12px',
            }}
          >
            <div className={styles['title-wrapper']}>
              <div className={styles['title-head']}>
                <span className={styles['icon']}>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    height='1.25em'
                    viewBox='0 0 512 512'
                  >
                    {/*! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. */}
                    <path d='M480 32c0-12.9-7.8-24.6-19.8-29.6s-25.7-2.2-34.9 6.9L381.7 53c-48 48-113.1 75-181 75H192 160 64c-35.3 0-64 28.7-64 64v96c0 35.3 28.7 64 64 64l0 128c0 17.7 14.3 32 32 32h64c17.7 0 32-14.3 32-32V352l8.7 0c67.9 0 133 27 181 75l43.6 43.6c9.2 9.2 22.9 11.9 34.9 6.9s19.8-16.6 19.8-29.6V300.4c18.6-8.8 32-32.5 32-60.4s-13.4-51.6-32-60.4V32zm-64 76.7V240 371.3C357.2 317.8 280.5 288 200.7 288H192V192h8.7c79.8 0 156.5-29.8 215.3-83.3z' />
                  </svg>
                </span>
                <span className={styles['title']}>Latest Products</span>
              </div>

              <div className={styles['title-body']}>
                {isLatestProductsLoading && (
                  <Skeleton
                    sx={{
                      bgcolor: '#141414',
                      borderRadius: '12px',
                      margin: '15px 0 15px 0',
                    }}
                    variant='rectangular'
                    width='100%'
                    height='95%'
                  />
                )}

                {latestProductsData && (
                  <div className={styles['latest-products-content']}>
                    <ul>
                      {latestProductsData.map((product, index) => (
                        <li key={index}>
                          <div style={{ height: '100%' }}>
                            <img
                              style={{
                                borderRadius: '50%',
                                verticalAlign: 'middle',
                              }}
                              width='50px'
                              height='50px'
                              src={
                                product?.thumbnailImageUrl ??
                                placeholderImageSrc
                              }
                              alt='product thumbnail'
                            />
                          </div>
                          <div className={styles['product-info']}>
                            <span className={styles['post-title']}>
                              {product?.postTitle ?? ''}
                            </span>
                            <span className={styles['price']}>
                              {convertToInternationalCurrencySystem(
                                product?.price
                              )}
                              {product?.type === 'chothue' ? '/tháng' : ''}
                            </span>
                            <div
                              style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                width: '100%',
                              }}
                            >
                              <span className={styles['username']}>
                                {product?.username ?? ''}
                              </span>
                            </div>
                            <span className={styles['created-at']}>
                              {timeAgo(product?.createdAt)}
                            </span>
                          </div>
                        </li>
                      ))}
                    </ul>
                    <div className={styles['fade-in']}></div>
                  </div>
                )}

                <button className={styles['more-products-btn']}>
                  <span>More products</span>
                  <span>
                    <svg
                      fill='white'
                      xmlns='http://www.w3.org/2000/svg'
                      height='1em'
                      viewBox='0 0 512 512'
                    >
                      ! Font Awesome Free 6.4.2 by @fontawesome -
                      https://fontawesome.com License -
                      https://fontawesome.com/license (Commercial License)
                      Copyright 2023 Fonticons, Inc.
                      <path d='M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z' />
                    </svg>
                  </span>
                </button>
              </div>
            </div>
          </Paper>

          <Paper
            className={styles['total-users']}
            elevation={3}
            sx={{
              padding: '20px',
              backgroundColor: '#202020',
              borderRadius: '12px',
            }}
          >
            <div className={styles['title-wrapper']}>
              <div className={styles['title-head']}>
                <span className={styles['icon']}>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    height='1.25em'
                    viewBox='0 0 640 512'
                  >
                    {/*! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. */}
                    <path d='M144 0a80 80 0 1 1 0 160A80 80 0 1 1 144 0zM512 0a80 80 0 1 1 0 160A80 80 0 1 1 512 0zM0 298.7C0 239.8 47.8 192 106.7 192h42.7c15.9 0 31 3.5 44.6 9.7c-1.3 7.2-1.9 14.7-1.9 22.3c0 38.2 16.8 72.5 43.3 96c-.2 0-.4 0-.7 0H21.3C9.6 320 0 310.4 0 298.7zM405.3 320c-.2 0-.4 0-.7 0c26.6-23.5 43.3-57.8 43.3-96c0-7.6-.7-15-1.9-22.3c13.6-6.3 28.7-9.7 44.6-9.7h42.7C592.2 192 640 239.8 640 298.7c0 11.8-9.6 21.3-21.3 21.3H405.3zM224 224a96 96 0 1 1 192 0 96 96 0 1 1 -192 0zM128 485.3C128 411.7 187.7 352 261.3 352H378.7C452.3 352 512 411.7 512 485.3c0 14.7-11.9 26.7-26.7 26.7H154.7c-14.7 0-26.7-11.9-26.7-26.7z' />
                  </svg>
                </span>
                <span className={styles['title']}>Total Users</span>
              </div>

              {userCountByGroupData && (
                <div className={styles['title-body']}>
                  <span className={styles['data']}>{userCountByGroupData.all}</span>
                  &nbsp;
                  <span className={styles['unit']}>người dùng</span>
                </div>
              )}
            </div>
          </Paper>

          <Paper
            className={styles['total-products']}
            elevation={3}
            sx={{
              padding: '20px',
              backgroundColor: '#202020',
              borderRadius: '12px',
            }}
          >
            <div className={styles['title-wrapper']}>
              <div className={styles['title-head']}>
                <span className={styles['icon']}>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    height='1.25em'
                    viewBox='0 0 640 512'
                  >
                    {/*! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. */}
                    <path d='M0 488V171.3c0-26.2 15.9-49.7 40.2-59.4L308.1 4.8c7.6-3.1 16.1-3.1 23.8 0L599.8 111.9c24.3 9.7 40.2 33.3 40.2 59.4V488c0 13.3-10.7 24-24 24H568c-13.3 0-24-10.7-24-24V224c0-17.7-14.3-32-32-32H128c-17.7 0-32 14.3-32 32V488c0 13.3-10.7 24-24 24H24c-13.3 0-24-10.7-24-24zm488 24l-336 0c-13.3 0-24-10.7-24-24V432H512l0 56c0 13.3-10.7 24-24 24zM128 400V336H512v64H128zm0-96V224H512l0 80H128z' />
                  </svg>
                </span>
                <span className={styles['title']}>Total Products</span>
              </div>

              {productCountByGroupData && (
                <div className={styles['title-body']}>
                  <span className={styles['data']}>{productCountByGroupData.all}</span>
                  &nbsp;
                  <span className={styles['unit']}>sản phẩm</span>
                </div>
              )}

            </div>
          </Paper>

          <Paper
            className={styles['activities']}
            elevation={3}
            sx={{
              padding: '20px',
              backgroundColor: '#202020',
              borderRadius: '12px',
            }}
          >
            <div className={styles['title-wrapper']}>
              <div className={styles['title-head']}>
                <span className={styles['icon']}>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    height='1.25em'
                    viewBox='0 0 640 512'
                  >
                    {/*! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. */}
                    <path d='M128 72a24 24 0 1 1 0 48 24 24 0 1 1 0-48zm32 97.3c28.3-12.3 48-40.5 48-73.3c0-44.2-35.8-80-80-80S48 51.8 48 96c0 32.8 19.7 61 48 73.3V224H32c-17.7 0-32 14.3-32 32s14.3 32 32 32H288v54.7c-28.3 12.3-48 40.5-48 73.3c0 44.2 35.8 80 80 80s80-35.8 80-80c0-32.8-19.7-61-48-73.3V288H608c17.7 0 32-14.3 32-32s-14.3-32-32-32H544V169.3c28.3-12.3 48-40.5 48-73.3c0-44.2-35.8-80-80-80s-80 35.8-80 80c0 32.8 19.7 61 48 73.3V224H160V169.3zM488 96a24 24 0 1 1 48 0 24 24 0 1 1 -48 0zM320 392a24 24 0 1 1 0 48 24 24 0 1 1 0-48z' />
                  </svg>
                </span>
                <span className={styles['title']}>Activities</span>
              </div>
            </div>

            <div className={styles['timeline']}>
              <MUITimeline
                data={[...Array(6)].map(() => {
                  return {
                    name: 'Event name',
                    time: 'Event time',
                    Icon: (
                      <img
                        width='50px'
                        height='50px'
                        src={placeholderImageSrc}
                        alt='Event'
                        style={{ borderRadius: '50%' }}
                      />
                    ),
                  };
                })}
              />
            </div>
          </Paper>

          <Paper
            className={styles['users-by-role']}
            elevation={3}
            sx={{
              padding: '20px',
              backgroundColor: '#202020',
              borderRadius: '12px',
            }}
          >
            <div className={styles['title-wrapper']}>
              <div className={styles['title-head']}>
                <span className={styles['icon']}>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    height='1.25em'
                    viewBox='0 0 576 512'
                  >
                    {/*! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. */}
                    <path d='M0 96l576 0c0-35.3-28.7-64-64-64H64C28.7 32 0 60.7 0 96zm0 32V416c0 35.3 28.7 64 64 64H512c35.3 0 64-28.7 64-64V128H0zM64 405.3c0-29.5 23.9-53.3 53.3-53.3H234.7c29.5 0 53.3 23.9 53.3 53.3c0 5.9-4.8 10.7-10.7 10.7H74.7c-5.9 0-10.7-4.8-10.7-10.7zM176 192a64 64 0 1 1 0 128 64 64 0 1 1 0-128zm176 16c0-8.8 7.2-16 16-16H496c8.8 0 16 7.2 16 16s-7.2 16-16 16H368c-8.8 0-16-7.2-16-16zm0 64c0-8.8 7.2-16 16-16H496c8.8 0 16 7.2 16 16s-7.2 16-16 16H368c-8.8 0-16-7.2-16-16zm0 64c0-8.8 7.2-16 16-16H496c8.8 0 16 7.2 16 16s-7.2 16-16 16H368c-8.8 0-16-7.2-16-16z' />
                  </svg>
                </span>
                <span className={styles['title']}>Users By Role</span>
              </div>
            </div>

            {userCountByGroupData && (
              <div className={styles['pie']}>
                <HighchartsPieChart
                  options={{
                    series: [
                      {
                        data: [
                          {
                            name: 'Cá nhân',
                            y: parseInt(userCountByGroupData.canhan),
                            sliced: true,
                            selected: true,
                          },
                          {
                            name: 'Môi giới',
                            y: parseInt(userCountByGroupData.moigioi),
                          },
                        ],
                      },
                    ],
                    plotOptions: {
                      pie: {
                        colors: ['#50B432', '#ED561B'],
                        dataLabels: { style: { fontSize: '20px' } },
                      },
                    },
                  }}
                />
              </div>
            )}
          </Paper>

          <Paper
            className={styles['products-by-type']}
            elevation={3}
            sx={{
              padding: '20px',
              backgroundColor: '#202020',
              borderRadius: '12px',
            }}
          >
            <div className={styles['title-wrapper']}>
              <div className={styles['title-head']}>
                <span className={styles['icon']}>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    height='1.25em'
                    viewBox='0 0 576 512'
                  >
                    {/*! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. */}
                    <path d='M64 64C28.7 64 0 92.7 0 128V384c0 35.3 28.7 64 64 64H512c35.3 0 64-28.7 64-64V128c0-35.3-28.7-64-64-64H64zm64 320H64V320c35.3 0 64 28.7 64 64zM64 192V128h64c0 35.3-28.7 64-64 64zM448 384c0-35.3 28.7-64 64-64v64H448zm64-192c-35.3 0-64-28.7-64-64h64v64zM288 160a96 96 0 1 1 0 192 96 96 0 1 1 0-192z' />
                  </svg>
                </span>
                <span className={styles['title']}>Products By Type</span>
              </div>

              {productCountByGroupData && (
                <div className={styles['pie']}>
                  <HighchartsPieChart
                    options={{
                      series: [
                        {
                          data: [
                            {
                              name: 'Cần bán',
                              y: parseInt(productCountByGroupData.type.canban),
                              sliced: true,
                              selected: true,
                            },
                            {
                              name: 'Cho thuê',
                              y: parseInt(productCountByGroupData.type.chothue),
                            },
                          ],
                        },
                      ],
                      plotOptions: {
                        pie: {
                          colors: ['#50B432', '#ED561B'],
                          dataLabels: { style: { fontSize: '20px' } },
                        },
                      },
                    }}
                  />
                </div>
              )}

            </div>
          </Paper>

          <Paper
            className={styles['products-by-category']}
            elevation={3}
            sx={{
              padding: '20px',
              backgroundColor: '#202020',
              borderRadius: '12px',
            }}
          >
            <div className={styles['title-wrapper']}>
              <div className={styles['title-head']}>
                <span className={styles['icon']}>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    height='1.25em'
                    viewBox='0 0 512 512'
                  >
                    {/*! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. */}
                    <path d='M0 32C0 14.3 14.3 0 32 0H480c17.7 0 32 14.3 32 32s-14.3 32-32 32V448c17.7 0 32 14.3 32 32s-14.3 32-32 32H304V464c0-26.5-21.5-48-48-48s-48 21.5-48 48v48H32c-17.7 0-32-14.3-32-32s14.3-32 32-32V64C14.3 64 0 49.7 0 32zm96 80v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V112c0-8.8-7.2-16-16-16H112c-8.8 0-16 7.2-16 16zM240 96c-8.8 0-16 7.2-16 16v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V112c0-8.8-7.2-16-16-16H240zm112 16v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V112c0-8.8-7.2-16-16-16H368c-8.8 0-16 7.2-16 16zM112 192c-8.8 0-16 7.2-16 16v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V208c0-8.8-7.2-16-16-16H112zm112 16v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V208c0-8.8-7.2-16-16-16H240c-8.8 0-16 7.2-16 16zm144-16c-8.8 0-16 7.2-16 16v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V208c0-8.8-7.2-16-16-16H368zM328 384c13.3 0 24.3-10.9 21-23.8c-10.6-41.5-48.2-72.2-93-72.2s-82.5 30.7-93 72.2c-3.3 12.8 7.8 23.8 21 23.8H328z' />
                  </svg>
                </span>
                <span className={styles['title']}>Products By Category</span>
              </div>

              {productCountByGroupData && (
                <div className={styles['pie']}>
                  <HighchartsPieChart
                    options={{
                      series: [
                        {
                          data: [
                            {
                              name: 'Nhà ở',
                              y: parseInt(productCountByGroupData.category.nhao),
                              sliced: true,
                              selected: true,
                            },
                            {
                              name: 'Căn hộ chung cư',
                              y: parseInt(productCountByGroupData.category.canhochungcu),
                            },
                            {
                              name: 'Khác',
                              y: parseInt(productCountByGroupData.category.khac),
                            },
                          ],
                        },
                      ],
                      plotOptions: {
                        pie: {
                          colors: ['#50B432', '#ED561B', 'yellow'],
                          dataLabels: { style: { fontSize: '20px' } },
                        },
                      },
                    }}
                  />
                </div>
              )}

            </div>
          </Paper>
        </div>
      </div>
    </>
  );
};

export default HomeDashboardContent;
