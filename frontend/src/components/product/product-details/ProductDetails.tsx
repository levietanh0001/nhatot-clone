import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useGetProduct } from '~/hooks/product.hook';
import ContentWithStickyBox from '~/layouts/ContentWithStickyBox';
import AboutProduct from './AboutProduct';
import ContactUser from './ContactUser';

const ProductDetails = () => {

  const { productId, slug } = useParams();
  console.log({ productId, slug });
  const { data, error, isLoading, isError } = useGetProduct(productId, slug);
  const navigate = useNavigate();

  useEffect(() => {

    if(isError) {
      console.error(error);
      navigate('/404');
    }
  }, [isError]);

  return (
    <>
      {!isLoading && (
        <>
          {/* {JSON.stringify(data)} */}
          <ContentWithStickyBox
            content={<AboutProduct data={data} />}
            stickyBox={
              <ContactUser 
                data={data} 
                // user={user}
              />
            }
          />
        </>
      )}
    </>
  );
};

export default ProductDetails;
