import React, { useState } from 'react';
import styles from './Glossary.module.scss';

const Glossary: React.FC = () => {

  const [expand, setExpand] = useState<boolean>(false);

  return (
    <div className={styles['outer-wrapper']}>
      <div className='container'>
        <div className={styles['inner-wrapper']}>
          <h2 className={styles['h2']}>
            <strong>
              MUA BÁN VÀ CHO THUÊ BẤT ĐỘNG SẢN UY TÍN, NHANH CHÓNG TRÊN NHÀ TỐT
            </strong>
          </h2>
          <p className={styles['small-title']}>Nhà Tốt: Nền Tảng Công nghệ Bất động sản được phát triển bởi Chợ Tốt</p>
          <div 
            className={styles['content-container']}
            style={{
              height: expand? 'auto': '200px'
            }}
          >
            <div 
            className={styles['content']}
            style={{
              height: expand? 'auto': '200px'
            }}
            >
              <p>
                Bất động sản là một loại tài sản có giá trị lớn và tính thanh khoản cao, do đó, mua bán và cho thuê bất động sản luôn là hoạt động kinh doanh thu hút rất nhiều nhà đầu tư, từ cá nhân đến doanh nghiệp.
              </p>
              <p>
                Mua bán bất động sản là việc mua đi bán lại các loại bất động sản khác nhau như mua bán đất, mua bán đất nền, đất vườn, đất nông nghiệp hay đất rẫy, đất trồng... Một lô đất hoặc căn nhà bán thành công có thể mang lại cho người bán hàng trăm triệu cho tới vài tỉ đồng.
              </p>
              <p>
                Cho thuê bất động sản là hoạt động cho phép một người sử dụng tài sản bất động sản của người khác trong một thời gian nhất định, trong đó người sử dụng trả tiền cho người sở hữu tài sản. Quá trình này cũng được thực hiện thông qua việc ký kết hợp đồng cho thuê bất động sản.
              </p>
              <p>
                Tuy nhiên, để thành công trong lĩnh vực cạnh tranh này cũng đòi hỏi kiến thức chuyên sâu về thị trường bất động sản, kỹ năng đàm phán và quản lý rủi ro để giảm thiểu tổn thất cũng như tối đa hóa lợi nhuận.
              </p>
              <p>
                Với tiền thân là chuyên trang BĐS Chợ Tốt Nhà, mỗi ngày, có hàng ngàn giao dịch BĐS diễn ra tại Nhà Tốt - nền tảng công nghệ BĐS Nhà Tốt trực thuộc Chợ Tốt. Trong đó, có 5 loại hình BĐS được quan tâm mua bán và cho thuê nhiều nhất.
              </p>

              Các loại hình mua bán và cho thuê bất động sản trên Nhà Tốt
              <ul>
                <li>Mua bán và cho thuê đất</li>
                <li>Mua bán đất là hoạt động giao dịch mua và bán các loại đất đai giữa người bán và người mua, với mục đích chuyển quyền sở hữu đất từ người bán sang người mua và nhận được giá trị tương ứng.</li>
              </ul>

              Tùy thuộc vào mục đích sử dụng và tính chất của từng giao dịch mà chúng ta có thể phân loại những hình thức mua bán đất khác nhau, phổ biến nhất có thể kể đến:

              Mua bán đất nền: Là loại giao dịch mua bán các khu đất chưa qua quy hoạch hoặc đã được quy hoạch và được phân lô bán nền, người mua sẽ tự xây dựng công trình trên đất.
              Mua bán đất xây dựng: Là loại giao dịch mua bán các khu đất đã xây dựng các công trình nhà ở, tòa nhà, cơ sở sản xuất kinh doanh... Người mua sẽ nhận được sự sở hữu của tòa nhà và đất mà tòa nhà đó đứng trên.
              Mua bán đất cho thuê: Là loại giao dịch mua bán đất với mục đích cho thuê đất cho một thời gian nhất định, với điều kiện người mua không sử dụng đất cho mục đích kinh doanh hay đầu tư.
              Mua bán đất tái định cư: Là loại giao dịch mua bán đất giữa chính phủ hoặc các doanh nghiệp với người dân để thực hiện các dự án tái định cư, thay thế đất của người dân bị thu hồi để thực hiện các dự án công trình.
              Mua bán đất kinh doanh: Là loại giao dịch mua bán đất để đầu tư và kinh doanh, nhằm mục đích tạo lợi nhuận từ việc mua bán hoặc sử dụng đất cho các hoạt động kinh doanh.
              Cho thuê đất là hoạt động mà người sở hữu đất cho người khác sử dụng đất trong một khoảng thời gian nhất định và nhận một khoản tiền thuê đất tương ứng.

              Người thuê đất sẽ được sử dụng đất như mục đích đã được thỏa thuận giữa hai bên trong hợp đồng thuê đất, như thuê đất xây nhà, thuê đất làm vườn, trồng cây, sản xuất kinh doanh,... hoặc các mục đích khác.

              Đối với bên cho thuê đất, việc cho thuê đất có thể đem lại thu nhập ổn định, tạo ra giá trị từ tài sản đất đai của mình. Đối với bên thuê đất, việc thuê đất có thể giúp họ tiết kiệm chi phí đầu tư ban đầu để sở hữu đất, đồng thời có thể tận dụng tối đa tiềm năng của đất để phục vụ cho mục đích của mình.

              Mua bán và cho thuê nhà đất - nhà ở
              Mua bán nhà đất và cho thuê nhà ở là hoạt động kinh doanh đa dạng và phổ biến trong lĩnh vực bất động sản. Các nhà đầu tư hoặc chủ nhà có thể mua bán và cho thuê các căn nhà để đầu tư và tạo ra thu nhập từ lợi nhuận khi mua bán hoặc từ tiền thuê của người thuê nhà.

              Tùy theo loại nhà và mục đích cho thuê mà có nhiều hình thức và thời hạn mua bán, cho thuê nhà ở khác nhau. Trong đó có 3 loại nhà ở thu hút đầu tư nhất gồm: mua bán và cho thuê nhà nguyên căn, thuê nhà mặt tiền, mua bán và cho thuê nhà phố, mua bán và cho thuê nhà biệt thự.

              Mua bán và cho thuê căn hộ chung cư
              Những vị trí đắc địa, gần trung tâm thành phố, có nhiều tiện ích xung quanh là nơi tập trung của các giao dịch mua bán và cho thuê căn hộ chung cư. Các căn hộ chung cư vừa có tính thanh khoản cao, dễ mua bán lại thường có xu hướng tăng giá theo thời gian, đặc biệt khi khu vực xung quanh phát triển, tiện ích được nâng cấp hoặc có các dự án mới được triển khai.

              Giá nhà đất đắt đỏ tại các thành phố lớn cũng là một trong những lý do thúc đẩy xu hướng mua bán căn hộ chung cư hoặc cho thuê căn hộ chung cư ở dài hạn.

              Kinh doanh cho thuê phòng trọ
              Kinh doanh cho thuê phòng trọ là một lĩnh vực kinh doanh phổ biến tại Việt Nam, đặc biệt là trong các khu vực đô thị phát triển nhanh, nơi tập trung đông sinh viên, công nhân và người lao động.

              Để kinh doanh cho thuê nhà trọ, ngoài việc chuẩn bị phòng cho thuê sạch sẽ, đầy đủ tiện nghi căn bản, chủ nhà cần đăng ký kinh doanh nhà trọ. Giá cho thuê nhà trọ sẽ tùy thuộc từng khu vực, những thành phố lớn hoặc khu đông dân cư, nhiều tiện ích cộng đồng sẽ có giá thuê trọ cao hơn các khu vực còn lại.

              Sang nhượng, cho thuê mặt bằng kinh doanh và văn phòng
              Trong các loại hình BĐS, cho thuê hoặc sang nhượng văn phòng, mặt bằng kinh doanh có thể xem là hình thức kinh doanh ít rủi ro nhất.

              Việc thuê văn phòng giúp doanh nghiệp hoặc cửa hàng tiết kiệm chi phí hơn rất nhiều so với xây dựng mặt bằng kinh doanh. Hơn thế nữa, các doanh nghiệp cũng có thể tập trung vào hoạt động kinh doanh chính mà không phải lo lắng quá nhiều về bảo trì, sửa chữa và cải tạo văn phòng khi thuê.

              Bên cạnh đó, sang nhượng mặt bằng hoặc cho thuê mặt bằng kinh doanh, cho thuê văn phòng giúp mang lại thu nhập tự động cho nhà đầu tư hoặc chủ sở hữu.

              Các hình thức mua bán và cho thuê bất động sản
              Hình thức mua bán bất động sản:

              Mua bán trực tiếp: Người mua và người bán trực tiếp đàm phán và ký kết hợp đồng mua bán bất động sản.
              Mua bán qua trung gian: Sử dụng dịch vụ của môi giới bất động sản để tìm kiếm và đàm phán giá cả, và họ sẽ giúp người mua và người bán ký kết hợp đồng mua bán.
              Mua bán đấu giá: Tài sản bất động sản được đưa vào đấu giá công khai và người mua đưa ra giá cao nhất sẽ trở thành người chiến thắng.
              Hình thức cho thuê bất động sản:

              Cho thuê dài hạn: Thời gian cho thuê từ 1 năm trở lên, người thuê có thể sử dụng tài sản và trả tiền thuê hàng tháng.
              Cho thuê ngắn hạn: Thời gian cho thuê thường trong khoảng vài ngày đến vài tháng, thường được sử dụng cho các mục đích du lịch hoặc thương mại như kinh doanh, triển lãm, sự kiện.
              Cho thuê văn phòng: Thường áp dụng cho doanh nghiệp, tổ chức với nhu cầu sử dụng một không gian làm việc.
              Cho thuê căn hộ dịch vụ: Có thể được thuê trong một hoặc một vài ngày, các dịch vụ và tiện nghi được cung cấp tương tự như khách sạn.
              Các hình thức này còn có thể kết hợp với nhau để phù hợp với nhu cầu của 2 bên.

              Những ưu điểm nổi bật của mua bán và cho thuê bất động sản
              Bên cạnh lợi nhuận lớn, kinh doanh BĐS cũng có nhiều ưu điểm thu hút đầu tư khác như:

              Giá trị tài sản tăng theo thời gian: Bất động sản vừa tài sản có giá trị vật chất cao vừa có xu hướng tăng theo thời gian. Đây chính là lý do hấp dẫn thu hút không ít nhà đầu tư từ cá nhân đến doanh nghiệp tham gia mua bán và cho thuê BĐS.
              Đầu tư dài hạn: Đầu tư BĐS là một hình thức đầu tư lâu dài, cần có tầm nhìn xa và khả năng nắm bắt thông tin biến động thị trường nhanh nhạy. Nếu đáp ứng được những điều kiện trên, nhà đầu tư có thể tích lũy và dự trù nguồn lực tài chính rất vững mạnh trong tương lai.
              Tạo ra thu nhập thụ động: BĐS mang lại nguồn thu nhập thụ động hàng tháng từ nguồn tiền cho thuê hoặc giao dịch trả góp hàng tháng.
              Đa dạng về loại hình BĐS: Nhà đầu tư có nhiều sự lựa chọn về loại hình BĐS phù hợp với nhu cầu và nguồn tài chính của mình như mua bán đất nền, đất vườn, đất ruộng, cho thuê nhà xưởng, cho thuê cửa hàng...
              Bất kỳ hình thức kinh doanh nào cũng có những ưu nhược điểm riêng. Song song với lợi nhuận khổng lồ, những rủi ro mà kinh doanh BĐS có thể mang lại cũng gây ảnh hưởng không nhỏ nếu nhà đầu tư không am hiểu rõ sản phẩm hoặc thông tin trong ngành.

              Tóm lại, tình hình mua bán và cho thuê bất động sản đang phát triển sôi động, tuy nhiên, những rủi ro cũng luôn tiềm ẩn, vì vậy, khi tham gia vào hoạt động mua bán đất, nhà đầu tư hay người tìm mua đều nên cẩn trọng và nắm rõ các quy định pháp luật để tránh gặp phải các vấn đề ngoài ý muốn.

              Lưu ý trong kinh doanh bất động sản
              Dưới đây là vài điều cần biết khi tham gia vào hoạt động mua bán và cho thuê BĐS:

              Tìm hiểu thị trường BĐS: Trước khi tham gia mua bán hoặc cho thuê BĐS, hãy tìm hiểu kỹ về thị trường BĐS của khu vực đó, bao gồm giá cả, xu hướng tăng giảm giá, pháp lý, tình hình kinh tế, văn hóa và đời sống của địa phương đó.
              Xác định mục tiêu đầu tư: Xác định rõ mục đích đầu tư trước khi tham gia vào hoạt động mua bán và cho thuê BĐS, có thể là để đầu tư, để sử dụng hay để cho thuê lại giúp mang lại kế hoạch đầu tư hiệu quả.
              Kiểm tra pháp lý của BĐS: Hãy kiểm tra kỹ về pháp lý của BĐS trước khi quyết định mua hoặc thuê, đừng quên đảm bảo rằng BĐS đó không bị tranh chấp, không có các khoản nợ liên quan hay bất kỳ vấn đề nào về quyền sở hữu.
              Tìm người đại diện uy tín: Nếu không có kinh nghiệm hoặc không có đủ thời gian để tự quản lý BĐS của mình, nhà đầu tư nên tìm một người đại diện uy tín giúp quản lý BĐS và cho những lời khuyên giá trị.
              Đưa ra quyết định cẩn trọng: Các quyết định mua bán BĐS nên dựa trên thông tin có sẵn thay vì cảm tính. Hãy đọc kỹ các tài liệu liên quan, hỏi ý kiến của các chuyên gia hoặc những người có kinh nghiệm trước khi quyết định.
              Kiểm tra kỹ hợp đồng: Để đảm bảo quyền lợi, khi mua bán hoặc cho thuê BĐS, các bên nên đọc kỹ các điều khoản trong hợp đồng trước khi ký kết, cũng như kiểm tra kỹ giấy tờ pháp lý liên quan đến đất đai như sổ đỏ, giấy chứng nhận quyền sử dụng đất Bên cạnh đó, việc nắm rõ các quy định của pháp luật Việt Nam hiện hành liên quan đến giao dịch bất động sản sẽ giúp nhà đầu tư lẫn người mua tránh vi phạm pháp luật hay gặp phải những rủi ro pháp lý.
              Giá cả hợp lý: Khi tham gia vào hoạt động mua bán và cho thuê BĐS, giá cả nên được điều chỉnh sao cho phù hợp với thị trường và nhu cầu đôi bên để việc giao dịch thuận lợi hơn.
              Nền tảng công nghệ bất động sản Nhà Tốt
              Kế thừa từ chuyên trang BĐS Chợ Tốt Nhà, Nhà Tốt là một trong những website và ứng dụng di động tìm kiếm, mua bán và cho thuê bất động sản hàng đầu tại Việt Nam.

              Với giao diện dễ sử dụng, thao tác đơn giản và luôn chú trọng trong việc xây dựng môi trường mua bán đáng tin cậy, Nhà Tốt ngày càng thu hút nhiều người dùng và trở nên mạnh hơn trong thị trường bất động sản tầm trung; vừa giúp người dùng yên tâm tìm chọn BĐS ưng ý đồng thời giúp người bán tiếp cận với nhiều khách hàng tiềm năng hơn, tăng cơ hội giao dịch thành công.

              Vì sao tôi nên lựa chọn mua bán và cho thuê BĐS tại Nhà Tốt?
              80% tin đăng tại Nhà Tốt có khách liên hệ chỉ trong 12h đầu tiên!

              Không chỉ mạnh trong lĩnh vực Mua bán nhà đất, Nhà Tốt còn là nền tảng đăng tin BĐS đi đầu thị trường Cho thuê, đặc biệt là Cho thuê phòng trọ.

              Trên toàn quốc, người bán có thể có đến 26 lượt xem và 4 lượt liên hệ ngay trong ngày đầu tiên chỉ với 1 tin đăng, khi chọn đăng tin mua bán & cho thuê BĐS trên Nhà Tốt!

              Đội ngũ Nhà Tốt là ai?
              Người dùng của Nhà Tốt sẽ được hỗ trợ nhiệt tình bởi đội ngũ chuyên nghiệp và có kinh nghiệm trong lĩnh vực BĐS, bao gồm các chuyên gia bất động sản, chuyên viên tư vấn BĐS giàu kinh nghiệm, đội ngũ nhân viên chăm sóc khách hàng cam kết mang lại sự hỗ trợ và giúp đỡ tốt nhất trong quá trình tìm kiếm, đăng tin và giao dịch bất động sản.

              Homepage Nhà Tốt có Chat bot hỗ trợ riêng và khách hàng có thể yêu cầu để được đội ngũ Nhà Tốt gọi lại hỗ trợ bất cứ lúc nào.

              Nhà Tốt của ai? Nhà Tốt Chợ Tốt có mối quan hệ gì?
              Nhà Tốt (tên gọi cũ là Chợ Tốt Nhà) là một sản phẩm của Tập đoàn Chợ Tốt, một trong những tập đoàn lớn nhất Việt Nam trong lĩnh vực thương mại điện tử và truyền thông.

              Được thành lập từ năm 2012, Chợ Tốt cung cấp nhiều dịch vụ trực tuyến, bao gồm mua bán, rao vặt, tuyển dụng và nhiều lĩnh vực khác. Với Nhà Tốt, Chợ Tốt muốn cung cấp cho người dùng một nền tảng công nghệ trực tuyến để quản lý, tìm kiếm, đăng tin, mua bán và cho thuê bất động sản một cách tinh gọn, hiệu quả nhất!

              Cho đến nay, Nhà Tốt có hơn 10 triệu người dùng và là một trong những địa chỉ uy tín và được khách hàng tin tưởng trong lĩnh vực bất động sản tại Việt Nam.
            </div>
            {!expand && <span className={styles['fade-out']}></span>}
          </div>
          <button 
            className={styles['read-more']}
            onClick={() => setExpand(!expand)}
          >{expand? 'Thu gọn': 'Mở rộng'}</button>
        </div>
      </div>
    </div>
  );
};

export default Glossary;
