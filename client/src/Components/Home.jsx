import React from 'react';

import banner1 from '../Img/Grey Minimalist Special Offer Banner Landscape.png';
import banner2 from '../Img/Grey Modern Coming Soon Banner (Landscape) .png';

import { LeftCircleOutlined, RightCircleOutlined } from '@ant-design/icons';
import { Button, Card, Carousel, Col, Row } from 'antd';
import axios from 'axios';
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';
import { default as largeBannerImage, default as smallBannerImage1, default as smallBannerImage2 } from '../Img/Grey Modern Coming Soon Banner (Landscape) .png';
import CONFIG from '../config';
import styles from './css/Home.module.css';

import { IoCartOutline, IoChatbubbleEllipsesOutline, IoLockClosedOutline, IoRefreshOutline } from 'react-icons/io5';

const sliderSettings = {
  dots: false,
  infinite: true,
  speed: 500,
  slidesToShow: 4,
  slidesToScroll: 4,
  autoplay: true,
  autoplaySpeed: 4000,
};
function Home() {
  //xu ly banner
  const carouselRef = useRef(null);

  const nextBanner = () => {
    carouselRef.current.next();
  };

  const prevBanner = () => {
    carouselRef.current.prev();
  };

  //xu ly new arial
  const [newProducts, setNewProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [bestSellingProducts, setBestSellingProducts] = useState([]);
  //xu ly onclick khi an vo card

  const navigate = useNavigate();

  // Xử lý sự kiện khi nhấp vào card

  const handleCardClick = (productId) => {
    console.log(productId);
    // Điều hướng đến trang chi tiết sản phẩm với productId

    navigate(`/products/${productId}`);
  };

  useEffect(() => {
    console.log(CONFIG)
    // gọi new prd
    axios
      .get('http://localhost:5000/api/homepage')
      .then((response) => {
        setNewProducts(response.data.products);
        console.log(response.data.products);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });

    // gọi best selling
    axios
      .get('http://localhost:5000/api/homepage/products/best-selling-products')
      .then((response) => {
        setBestSellingProducts(response.data.bestSellingProducts);
        console.log(response.data.bestSellingProducts);
        
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <div>
      <div className={styles.banner}>
        <Carousel ref={carouselRef} autoplay={true} autoplaySpeed={4000}>
          <div>
            <img src={banner1} alt="Banner 1" className={styles.bannerImage} />
          </div>
          <div>
            <img src={banner2} alt="Banner 2" className={styles.bannerImage} />
          </div>
        </Carousel>

        <Button className={styles.prevButton} onClick={prevBanner} icon={<LeftCircleOutlined />} />
        <Button className={styles.nextButton} onClick={nextBanner} icon={<RightCircleOutlined />} />
      </div>

      <div className={styles.newArrivals}>
        <h2 className={styles.newArrivalsTitle}>Discover NEW Arrivals</h2>
        <h6 className={styles.newArrivalsTitle_h6}>Recently added shirts</h6>
        <Row gutter={[16, 16]} justify="center" className="newArrivals_row_img">
          {loading ? (
            <p>Loading...</p>
          ) : (
            newProducts.slice(0, 8).map((product) => (
              <Col key={product._id} xs={12} sm={8} md={6} lg={6}>
                <Card
                  cover={<img src={product.imageUrl[0]} alt={product.name} />}
                  onClick={() => handleCardClick(product._id)}
                  style={{ cursor: 'pointer' }}
                >
                  <Card.Meta title={product.name} description={product.price} />
                </Card>
              </Col>
            ))
          )}
        </Row>
      </div>

      <div className={styles.benefit}>
        <Row gutter={[16, 16]} justify="center">
          <Col xs={24} sm={12} md={6} lg={6}>
            <Card className={styles.benefitCard}>
              <div className={styles.benefitContent}>
                <div className={`${styles.benefitIcon} ${styles.freeShippingIcon}`}>
                  <IoCartOutline size={40} /> {/* Đặt kích thước của icon */}
                </div>
                <div className={styles.benefitTextContainer}>
                  <h5 className={styles.benefitTitle}>Free Shipping</h5> {/* Tùy chỉnh kích thước chữ */}
                  <p className={styles.benefitText}>Enjoy free shipping on all orders above $100</p>{' '}
                  {/* Tùy chỉnh kích thước chữ */}
                </div>
              </div>
            </Card>
          </Col>
          <Col xs={24} sm={12} md={6} lg={6}>
            <Card className={styles.benefitCard}>
              <div className={styles.benefitContent}>
                <div className={`${styles.benefitIcon} ${styles.freeShippingIcon}`}>
                  <IoChatbubbleEllipsesOutline size={40} /> {/* Đặt kích thước của icon */}
                </div>
                <div className={styles.benefitTextContainer}>
                  <h5 className={styles.benefitTitle}>SUPPORT 24/7</h5> {/* Tùy chỉnh kích thước chữ */}
                  <p className={styles.benefitText}>Our support team is there to help you for queries</p>{' '}
                  {/* Tùy chỉnh kích thước chữ */}
                </div>
              </div>
            </Card>
          </Col>
          <Col xs={24} sm={12} md={6} lg={6}>
            <Card className={styles.benefitCard}>
              <div className={styles.benefitContent}>
                <div className={`${styles.benefitIcon} ${styles.freeShippingIcon}`}>
                  <IoRefreshOutline size={40} /> {/* Đặt kích thước của icon */}
                </div>
                <div className={styles.benefitTextContainer}>
                  <h5 className={styles.benefitTitle}>30 DAYS RETURN</h5> {/* Tùy chỉnh kích thước chữ */}
                  <p className={styles.benefitText}>Simply return it within 30 days for an exchange.</p>{' '}
                  {/* Tùy chỉnh kích thước chữ */}
                </div>
              </div>
            </Card>
          </Col>

          <Col xs={24} sm={12} md={6} lg={6}>
            <Card className={styles.benefitCard}>
              <div className={styles.benefitContent}>
                <div className={`${styles.benefitIcon} ${styles.freeShippingIcon}`}>
                  <IoLockClosedOutline size={40} /> {/* Đặt kích thước của icon */}
                </div>
                <div className={styles.benefitTextContainer}>
                  <h5 className={styles.benefitTitle}>100% PAYMENT SECURE</h5> {/* Tùy chỉnh kích thước chữ */}
                  <p className={styles.benefitText}>Our payments are secured with 256 bit encryption</p>{' '}
                  {/* Tùy chỉnh kích thước chữ */}
                </div>
              </div>
            </Card>
          </Col>
        </Row>
      </div>

      <div className={styles.promo}>
        <div
          className={`${styles.promoSection} ${styles.firstSection}`}
          // style={{ backgroundImage: `url(${promoBackgroundImage})` }}
        >
          {/* <h3 className={styles.promoTitle}>Peace of Mind</h3>
          <p className={styles.promoText}>
            A one-stop platform for all your fashion needs, hassle-free. Buy with a peace of mind.
          </p>
          <Button className={styles.promoButton} type="primary">
            Buy Now
          </Button> */}
        </div>
        <div className={`${styles.promoSection} ${styles.secondSection}`}>
          {/* <h3 className={styles.promoTitle}>Buy 2 Get 1 Free</h3>
          <p className={styles.promoText}>End of season sale. Buy any 2 items of your choice and get 1 free.</p>
          <Button className={styles.promoButton} type="primary">
            Buy Now
          </Button> */}
        </div>
      </div>
      {/* // đây là best seller */}
      <div className={styles.newArrivals}>
        <h2 className={styles.newArrivalsTitle}>Discover Best Seller</h2>
        <h6 className={styles.newArrivalsTitle_h6}>Recently added shirts</h6>

        <Slider {...sliderSettings}>
          {bestSellingProducts.map((product) => (
            <div key={product._id} onClick={() => handleCardClick(product._id)}>
              <div
                style={{
                  border: '1px solid #ccc',
                  borderRadius: '8px',
                  padding: '10px',
                  margin: '0 8px',
                  cursor: 'pointer',
                }}
                // Thêm sự kiện onClick vào sản phẩm
              >
                <div style={{ textAlign: 'center' }}>
                  <img src={product.imageUrl} alt={product.name} style={{ maxWidth: '100%', borderRadius: '8px' }} />
                </div>
                <div>
                  <h5 style={{ fontSize: '18px', color: '#333', marginTop: '20px' }}>{product.name}</h5>
                  <p style={{ color: '#666' }}>
                    <strong>Giá:</strong> ${product.price}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>

      <div className={styles.bannerFooter}>
        <h2 className={styles.newArrivalsTitle}>DESERT NEUTRALS</h2>
        <h6 className={styles.newArrivalsTitle} style={{ color: 'rgb(168, 178, 186)' }}>
          Experience the magic of neutrals with utility pants, cropped tees, jackets,
        </h6>

        <h6 className={styles.newArrivalsTitle} style={{ color: 'rgb(168, 178, 186)' ,marginBottom: '40px' }}>
          {' '}
          and more that bring fun and style to your everyday fits.
        </h6>

        <button
          onClick={() => navigate('/products')}
          style={{
            
            backgroundColor: 'Black', // Màu nền mặc định
            color: 'white', // Màu chữ mặc định
            padding: '10px 20px', // Kích thước padding
            borderRadius: '10px', // Độ cong viền
            border: 'none', // Loại bỏ viền
            cursor: 'pointer', // Đổi con trỏ khi di chuột qua
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)', // Hiệu ứng bóng đổ
            display: 'block', // Hiển thị là block để căn giữa theo chiều ngang
            margin: '0 auto', // Margin tự động để căn giữa theo chiều ngang
            transition: 'background-color 0.3s, color 0.3s', // Thêm hiệu ứng transition
          }}
          onMouseEnter={(e) => {
            e.target.style.backgroundColor = 'White'; // Màu nền khi hover
            e.target.style.color = 'Black'; // Màu chữ khi hover
          }}
          onMouseLeave={(e) => {
            e.target.style.backgroundColor = 'Black'; // Màu nền khi không hover
            e.target.style.color = 'white'; // Màu chữ khi không hover
          }}
        >
          Go to Shop
        </button>

        <Row gutter={16} style={{ marginTop: '40px' }}>
          <Col xs={24} sm={24} md={16} className={`${styles.bannerColumn} ${styles.largeBannerColumn}`}>
            {/* Cột đầu - có một ảnh lớn */}
            <img src={largeBannerImage} alt="Large Banner" className={styles.largeBanner} />
          </Col>
          <Col xs={24} sm={12} md={8} className={`${styles.bannerColumn} ${styles.smallBannerColumn}`}>
            {/* Cột thứ hai - có hai ảnh nhỏ cân đối */}
            <div className={styles.smallBannerContainer}>
              <img src={smallBannerImage1} alt="Small Banner 1" className={styles.smallBanner} />
              <img src={smallBannerImage2} alt="Small Banner 2" className={styles.smallBanner} />
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
}

export default Home;
