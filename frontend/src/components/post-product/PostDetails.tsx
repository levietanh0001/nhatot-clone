import FloatingLabelInput from '../input/FloatingLabelInput';
import styles from './PostDetails.module.scss';

const PostDetails = ({
  product,
  onProductTitleChange,
  onProductDescriptionChange,
}) => {
  return (
    <>
      <p className={styles['title']}>Tiêu đề tin đăng và mô tả chi tiết</p>
      <div className={styles['post']}>
        <FloatingLabelInput
          onInputChange={onProductTitleChange}
          id='product-title'
          label='Tiêu đề tin đăng'
          required
        />
        <FloatingLabelInput
          onInputChange={onProductDescriptionChange}
          wrapperClass={styles['product-description-wrapper']}
          id='product-description'
          label='Mô tả chi tiết'
          inputType='textarea'
          required
        />
      </div>
    </>
  );
};

export default PostDetails;
