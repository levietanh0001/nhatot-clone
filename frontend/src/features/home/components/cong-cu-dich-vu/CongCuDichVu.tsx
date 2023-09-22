import styles from "./CongCuDichVu.module.scss";

import CongCu from "./CongCu"
import DichVu from "./DichVu"


const CongCuDichVu = () => {
  return (
    <div className="container">
      <div className={styles['wrapper']}>
        <CongCu />
        <DichVu />
      </div>
    </div>
  )
}

export default CongCuDichVu