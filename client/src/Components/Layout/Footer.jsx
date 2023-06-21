import { Row, Col } from 'antd';
import { FaCcVisa, FaCcMastercard, FaCcPaypal } from 'react-icons/fa';
import styles from "../css/Footer.module.css"
function FooterLayout() {
  return (
    <footer>
      <div className={styles.footerbody}>

      <Row gutter={[16, 16]}>
        {/* Cột 1 */}
        <Col xs={24} sm={12} md={6} lg={6}>
          <div className={styles.footerColumn}>
            <h4>Company Info</h4>
            <ul>
              <li>About Us</li>
              <li>Latest Posts</li>
              <li>Contact Us</li>
              <li>Shop</li>
            </ul>
          </div>
        </Col>
        {/* Cột 2 */}
        <Col xs={24} sm={12} md={6} lg={6}>
          <div className={styles.footerColumn}>
            <h4>Help Links</h4>
            <ul>
              <li>Tracking</li>
              <li>Order Status</li>
              <li>Delivery</li>
              <li>Shipping Info</li>
              <li>FAQ</li>
            </ul>
          </div>
        </Col>
        {/* Cột 3 */}
        <Col xs={24} sm={12} md={6} lg={6}>
          <div className={styles.footerColumn}>
            <h4>Useful Links</h4>
            <ul>
              <li>Special Offers</li>
              <li>Gift Cards</li>
              <li>Advertising</li>
              <li>Terms of Use</li>
            </ul>
          </div>
        </Col>
        {/* Cột 4 */}
        <Col xs={24} sm={12} md={6} lg={6}>
          <div className={styles.footerColumn}>
            <h4>Get in the Know</h4>
            <p>Subscribe to our newsletter for the latest updates.</p>
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
