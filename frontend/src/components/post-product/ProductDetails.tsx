import FloatingLabelInput from '../input/FloatingLabelInput';
import styles from './ProductDetails.module.scss';

const ProductDetails = ({
  product,
  onNumBedRoomsChange,
  onNumBathroomsChange,
  onBalconDirectionChange,
  onMainDirectionChange,
  onHasLegalDocsChange,
  onFurnitureStatusChange,
  onAreaChange,
  onPriceChange,
  onDepositChange,
}) => {
  return (
    <div className={styles['product-details-wrapper']}>
      <h2 className={styles['title']}>Thông tin chi tiết</h2>
      <div className={styles['product-details']}>
        <div className={styles['options']}>
          <FloatingLabelInput inputValue={product.numBedrooms} onInputValueChange={onNumBedRoomsChange} name='numBedrooms' label='Số phòng ngủ' required type='number' />
          <FloatingLabelInput inputValue={product.numBathrooms} onInputValueChange={onNumBathroomsChange} name='numBathrooms' label='Số phòng vệ sinh' required type='number' />
          <FloatingLabelInput inputValue={product.balconDirection} onInputValueChange={onBalconDirectionChange} name='balconDirection' label='Hướng ban công' />
          <FloatingLabelInput inputValue={product.mainDoorDirection} onInputValueChange={onMainDirectionChange} name='mainDoorDirection' label='Hướng cửa chính' />
          <FloatingLabelInput inputValue={product.hasLegalDocs} onInputValueChange={onHasLegalDocsChange} name='hasLegalDocs' label='Giấy tờ pháp lý' />
          <FloatingLabelInput inputValue={product.furnitureStatus} onInputValueChange={onFurnitureStatusChange} name='funitureStatus' label='Tình trạng nội thất' />
          <FloatingLabelInput inputValue={product.area} onInputValueChange={onAreaChange} name='area' label='Diện tích' required type='number' />
          <FloatingLabelInput inputValue={product.price} onInputValueChange={onPriceChange} name='price' label={product.productType === 'canban'? 'Giá': 'Giá cho thuê'} required type='number' />
          <FloatingLabelInput inputValue={product.deposit} onInputValueChange={onDepositChange} name='deposit' label='Số tiền cọc' type='number' />
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
