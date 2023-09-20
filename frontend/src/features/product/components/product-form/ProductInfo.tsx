import FloatingLabelInput from '@/components/input/FloatingLabelInput';
import {
  SelectInput,
  SelectOption,
} from '@/components/input/SelectInput';
import {
  formatNumberWithCommas
} from '@/utils/number.util';
import styles from './ProductInfo.module.scss';


function directions(what) {
  return [
    {
      value: 'dong',
      label: `${what} Đông`,
    },
    {
      value: 'tay',
      label: `${what} Tây`,
    },
    {
      value: 'nam',
      label: `${what} Nam`,
    },
    {
      value: 'bac',
      label: `${what} Bắc`,
    },
    {
      value: 'dongnam',
      label: `${what} Đông Nam`,
    },
    {
      value: 'dongbac',
      label: `${what} Đông Bắc`,
    },
    {
      value: 'taynam',
      label: `${what} Tây Nam`,
    },
    {
      value: 'taybac',
      label: `${what} Tây Bắc`,
    },
  
  ];
}

const directionOptions = [
  {
    value: 'dong',
    label: 'đông',
  },
  {
    value: 'tay',
    label: 'tây',
  },
  {
    value: 'nam',
    label: 'nam',
  },
  {
    value: 'bac',
    label: 'bắc',
  },
  {
    value: 'dongnam',
    label: 'đông nam',
  },
  {
    value: 'dongbac',
    label: 'đông bắc',
  },
  {
    value: 'taynam',
    label: 'Tây Nam',
  },
  {
    value: 'taybac',
    label: 'tây bắc',
  },

];

const balconDirectionOptions = [
  {
    value: '',
    label: 'Hướng ban công'
  },
  // ...directionOptions
  ...directions('Ban công hướng')
]

const mainDoorDirectionOptions = [
  {
    value: '',
    label: 'Hướng cửa chính'
  },
  // ...directionOptions
  ...directions('Cửa chính hướng')
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
    label: 'Nội thất cao cấp',
    value: 'caocap',
  },
  {
    label: 'Nội thất đầy đủ',
    value: 'daydu',
  },
  {
    label: 'Nội thất cơ bản',
    value: 'coban',
  },
  {
    label: 'Không nội thất',
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
            what='Ban công hướng'
          >
            {balconDirectionOptions.map((item, index) => (
              <SelectOption key={index} {...item} />
            ))}
          </SelectInput>
          <SelectInput
            name='mainDoorDirection'
            inputValue={product.mainDoorDirection}
            onInputValueChange={onMainDirectionChange}
            what='Cửa chính hướng'
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
