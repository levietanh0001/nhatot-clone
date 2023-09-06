import FloatingLabelInput from '~/components/shared/input/FloatingLabelInput';
import styles from './PostDetails.module.scss';
import clsx from 'clsx';
import { useEffect, useState } from 'react';

const PostDetails = ({
  product,
  onPostTitleChange,
  onPostDescriptionChange,
}) => {
  const [focus, setFocus] = useState<boolean>(false);

  useEffect(() => {
    console.log({
      height: product.description ? '250px' : focus ? '250px' : '50px',
      description: product.description,
      focus: focus,
    });
  }, [product.description, focus]);

  return (
    <>
      <p className={styles['title']}>Tiêu đề tin đăng và mô tả chi tiết</p>
      <div className={styles['post']}>
        <FloatingLabelInput
          inputValue={product.postTitle}
          onInputValueChange={onPostTitleChange}
          id='product-title'
          name='postTitle'
          label='Tiêu đề tin đăng'
          required
        />
        <FloatingLabelInput
          inputValue={product.description}
          onInputValueChange={onPostDescriptionChange}
          wrapperClass={clsx(styles['product-description-wrapper'])}
          id='product-description'
          name='description'
          label='Mô tả chi tiết'
          inputType='textarea'
          required
          onFocus={() => setFocus(true)}
          onBlur={() => setFocus(false)}
          style={{
            height: product.description ? '250px' : focus ? '250px' : '50px',
          }}
        />
      </div>
    </>
  );
};

export default PostDetails;
