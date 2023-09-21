import { Col, Row } from 'antd';
import { FaCcMastercard, FaCcPaypal, FaCcVisa } from 'react-icons/fa';
import styles from "../css/Footer.module.css";
function FooterLayout() {
  return (
    <footer>
      <div className={styles.footerbody}>

      <Row gutter={[16, 16]}>
        {/* Cột 1 */}
        <Col xs={24} sm={12} md={6} lg={6}>
          <div className={styles.footerColumn}>
            <h4>Thông Tin Cửa Hàng</h4>
            <ul>
              <li>Đc : 39/ 14/ Quang Trung/ Hà Đông/ Hà Nội</li>
              <li>Mở Cửa : 8.00 Am - 20.00 Pm</li>
              <li>Liên Lạc : 0904944102</li>
              {/* <li>Shop</li> */}
            </ul>
          </div>
        </Col>
        {/* Cột 2 */}
        <Col xs={24} sm={12} md={6} lg={6}>
          <div className={styles.footerColumn}>
            <h4>Hỗ Trợ</h4>
            <ul>
              <li>Tìm Kiếm Sản phẩm </li>
              <li>Giỏ Hàng</li>
              <li>Đăng ký tài khoản</li>
              <li>Kiểm Tra Tình Trạng Đơn Hàng</li>
              {/* <li>FAQ</li> */}
            </ul>
          </div>
        </Col>
        {/* Cột 3 */}
        <Col xs={24} sm={12} md={6} lg={6}>
          <div className={styles.footerColumn}>
            <h4>Chính sách</h4>
            <ul>
              <li>Chính sách đổi trả</li>
              <li>Chính sách bảo mậ<table></table></li>
              <li>Chính sách vận chuyển</li>
              <li>Quy định sử dụng</li>
            </ul>
          </div>
        </Col>
        {/* Cột 4 */}
        <Col xs={24} sm={12} md={6} lg={6}>
          <div className={styles.footerColumn}>
            <h4>North Starr</h4>
            <p>Hân hạnh phục vụ quý khách </p>
            <input type="email" placeholder="Enter your email" />
            
          </div>
        </Col>
      </Row>
      <Row gutter={[16, 16]}>
        {/* Cột 1 */}
        <Col xs={24} sm={12} md={12} lg={12}>
          <div className={styles.footerColumn}>
            <h4>2023 NorthStar eCommerce</h4>
            <ul>
              <li>Privacy Policy</li>
              <li>Terms & Conditions</li>
            </ul>
          </div>
        </Col>
        {/* Cột 2 */}
        <Col xs={24} sm={24} md={12} lg={12}>
          <div className={styles.footerColumn}>
            <h4>Accepted Payments</h4>
            <div className={styles.paymentIcons}>
              <FaCcVisa style={{ fontSize: 24, marginRight: 8 }} />
              <FaCcMastercard style={{ fontSize: 24, marginRight: 8 }} />
              <FaCcPaypal style={{ fontSize: 24, marginRight: 8 }} />
              {/* Thêm các biểu tượng thanh toán khác ở đây */}
            </div>
          </div>
        </Col>
      </Row>
      </div>
    </footer>
  );
}

export default FooterLayout;
