import FloatingLabelInput from '~/components/input/FloatingLabelInput';
import styles from './PostDetails.module.scss';

const PostDetails = ({
  product,
  onPostTitleChange,
  onPostDescriptionChange,
}) => {
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
          wrapperClass={styles['product-description-wrapper']}
          id='product-description'
          name='description'
          label='Mô tả chi tiết'
          inputType='textarea'
          required
        />
      </div>
    </>
  );
};

export default PostDetails;
