import {
  formatNumberWithCommas,
  sanitizeNumberString,
} from '~/utils/number.util';
import FloatingLabelInput from '../input/FloatingLabelInput';
import { SelectInput, SelectOption } from '../input/SelectInput';
import styles from './ProductDetails.module.scss';

const directionOptions = [
  {
    value: 'dong',
    label: 'Đông',
  },
  {
    value: 'tay',
    label: 'Tây',
  },
  {
    value: 'nam',
    label: 'Nam',
  },
  {
    value: 'bac',
    label: 'Bắc',
  },
  {
    value: 'dongnam',
    label: 'Đông Nam',
  },
  {
    value: 'dongbac',
    label: 'Đông Bắc',
  },
  {
    value: 'taynam',
    label: 'Tây Nam',
  },
  {
    value: 'taybac',
    label: 'Tây Bắc',
  },
];

const legalDocsStatus = [
  {
    label: 'Đã có sổ',
    value: 1,
  },
  {
    label: 'Đang chờ sổ',
    value: 0,
  },
  {
    label: 'Giấy tờ khác',
    value: -1,
  },
];

const furnitureStatus = [
  {
    label: 'Cao cấp',
    value: 'highquality',
  },
  {
    label: 'Đầy đủ',
    value: 'full',
  },
  {
    label: 'Cơ bản',
    value: 'basic',
  },
  {
    label: 'Không',
    value: 'none',
  },
];

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
          <FloatingLabelInput
            inputValue={product.numBedrooms}
            onInputValueChange={onNumBedRoomsChange}
            name='numBedrooms'
            label='Số phòng ngủ'
            required
            type='text'
          />
          <FloatingLabelInput
            inputValue={product.numBathrooms}
            onInputValueChange={onNumBathroomsChange}
            name='numBathrooms'
            label='Số phòng vệ sinh'
            required
            type='text'
          />
          <SelectInput
            name='balconDirection'
            onInputValueChange={onBalconDirectionChange}
          >
            <SelectOption label='Hướng ban công' value='' />
            {directionOptions.map((item, index) => (
              <SelectOption key={index} {...item} />
            ))}
          </SelectInput>
          {/* <FloatingLabelInput inputValue={product.balconDirection} onInputValueChange={onBalconDirectionChange} name='balconDirection' label='Hướng ban công' /> */}
          <SelectInput
            name='mainDoorDirection'
            onInputValueChange={onMainDirectionChange}
          >
            <SelectOption label='Hướng cửa chính' value='' />
            {directionOptions.map((item, index) => (
              <SelectOption key={index} {...item} />
            ))}
          </SelectInput>
          {/* <FloatingLabelInput inputValue={product.mainDoorDirection} onInputValueChange={onMainDirectionChange} name='mainDoorDirection' label='Hướng cửa chính' /> */}
          <SelectInput
            name='hasLegalDocs'
            onInputValueChange={onHasLegalDocsChange}
          >
            <SelectOption label='Giấy tờ pháp lý' value='' />
            {legalDocsStatus.map((item, index) => (
              <SelectOption key={index} {...item} />
            ))}
          </SelectInput>
          {/* <FloatingLabelInput inputValue={product.hasLegalDocs} onInputValueChange={onHasLegalDocsChange} name='hasLegalDocs' label='Giấy tờ pháp lý' /> */}
          <SelectInput
            name='hasLegalDocs'
            onInputValueChange={onFurnitureStatusChange}
          >
            <SelectOption label='Tình trạng nội thất' value='' />
            {furnitureStatus.map((item, index) => (
              <SelectOption key={index} {...item} />
            ))}
          </SelectInput>
          {/* <FloatingLabelInput inputValue={product.furnitureStatus} onInputValueChange={onFurnitureStatusChange} name='funitureStatus' label='Tình trạng nội thất' /> */}
          <FloatingLabelInput
            inputValue={product.area}
            // inputValue={product.area ? sanitizeNumberString(product.area) : ''}
            onInputValueChange={onAreaChange}
            name='area'
            label='Diện tích'
            required
            type='text'
            inputMode='decimal'
          />
          <FloatingLabelInput
            inputValue={
              product.price ? formatNumberWithCommas(product.price) : ''
            }
            onInputValueChange={onPriceChange}
            name='price'
            label={product.productType === 'canban' ? 'Giá' : 'Giá cho thuê'}
            required
            type='text'
            inputMode='decimal'
          />
          <FloatingLabelInput
            inputValue={
              product.deposit ? formatNumberWithCommas(product.deposit) : ''
            }
            onInputValueChange={onDepositChange}
            name='deposit'
            label='Số tiền cọc'
            type='text'
          />
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
