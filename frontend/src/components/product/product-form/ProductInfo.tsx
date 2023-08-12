import FloatingLabelInput from '~/components/common/input/FloatingLabelInput';
import {
  SelectInput,
  SelectOption,
} from '~/components/common/input/SelectInput';
import {
  formatNumberWithCommas
} from '~/utils/number.util';
import styles from './ProductInfo.module.scss';
import { useEffect } from 'react';

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

const balconDirectionOptions = [
  {
    value: '',
    label: 'Hướng ban công'
  },
  ...directionOptions
]

const mainDoorDirectionOptions = [
  {
    value: '',
    label: 'Hướng cửa chính'
  },
  ...directionOptions
]

const legalDocsStatus = [
  {
    label: 'Đã có sổ',
    value: 'dacoso',
  },
  {
    label: 'Đang chờ sổ',
    value: 'dangchoso',
  },
  {
    label: 'Giấy tờ khác',
    value: 'giaytokhac',
  },
];

const furnitureStatus = [
  {
    label: 'Cao cấp',
    value: 'caocap',
  },
  {
    label: 'Đầy đủ',
    value: 'daydu',
  },
  {
    label: 'Cơ bản',
    value: 'coban',
  },
  {
    label: 'Không',
    value: 'khong',
  },
];

const ProductInfo = ({
  product,
  onNumBedRoomsChange,
  onNumBathroomsChange,
  onBalconDirectionChange,
  onMainDirectionChange,
  onLegalDocsStatusChange,
  onFurnitureStatusChange,
  onAreaChange,
  onPriceChange,
  onDepositChange,
}) => {

  let balconDirectionLabel;
  balconDirectionOptions.forEach(option => {
    if(product.balconDirection === option.value) {
      balconDirectionLabel = option.label;
    }
  })
  const otherBalconDirectionOptions = balconDirectionOptions.filter(item => item.value !== product.balconDirection && item.value !== '');

  let mainDoorDirectionLabel;
  mainDoorDirectionOptions.forEach(option => {
    if(product.mainDoorDirection === option.value) {
      mainDoorDirectionLabel = option.label;
    }
  })

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
            inputValue={product.balconDirection}
          >
            {balconDirectionOptions.map((item, index) => (
              <SelectOption key={index} {...item} />
            ))}
          </SelectInput>
          <SelectInput
            name='mainDoorDirection'
            inputValue={product.mainDoorDirection}
            onInputValueChange={onMainDirectionChange}
          >
            {mainDoorDirectionOptions.map((item, index) => (
              <SelectOption key={index} {...item} />
            ))}
          </SelectInput>
          <SelectInput
            name='legalDocsStatus'
            inputValue={product.legalDocsStatus}
            onInputValueChange={onLegalDocsStatusChange}
          >
            <SelectOption label='Giấy tờ pháp lý' value='' />
            {legalDocsStatus.map((item, index) => (
              <SelectOption key={index} {...item} />
            ))}
          </SelectInput>
          {/* <FloatingLabelInput inputValue={product.legalDocsStatus} onInputValueChange={onlegalDocsStatusChange} name='legalDocsStatus' label='Giấy tờ pháp lý' /> */}
          <SelectInput
            name='furnitureStatus'
            inputValue={product.furnitureStatus}
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
            label={product.type === 'canban' ? 'Giá' : 'Giá cho thuê'}
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

export default ProductInfo;
