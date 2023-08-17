import React from "react";

import banner1 from "../Img/Brown Minimalist Fashion Sale Banner.png";
import banner2 from "../Img/Thiết kế chưa có tên.png";
import styles from "./css/Home.module.css";
import { Carousel, Button } from "antd";
import { LeftCircleOutlined, RightCircleOutlined } from "@ant-design/icons";
import { useRef } from "react";
import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Row, Col, Card } from "antd";
import axios from "axios";
import FooterLayout from "./Layout/Footer";
import {
  IoCartOutline,
  IoChatbubbleEllipsesOutline,
  IoRefreshOutline,
  IoLockClosedOutline,
} from "react-icons/io5";

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

  //xu ly onclick khi an vo card

  const navigate = useNavigate();

  // Xử lý sự kiện khi nhấp vào card

  const handleCardClick = (productId) => {
    console.log(productId);
    // Điều hướng đến trang chi tiết sản phẩm với productId
    
    navigate(`/products/${productId}`);
  };

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/homepage")
      .then((response) => {
        setNewProducts(response.data.products);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
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

        <Button
          className={styles.prevButton}
          onClick={prevBanner}
          icon={<LeftCircleOutlined />}
        />
        <Button
          className={styles.nextButton}
          onClick={nextBanner}
          icon={<RightCircleOutlined />}
        />
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
                  style={{ cursor: "pointer" }}
                >
                  
                    <Card.Meta
                      title={product.name}
                      description={product.price}
                    />
                  
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
                <div
                  className={`${styles.benefitIcon} ${styles.freeShippingIcon}`}
                >
                  <IoCartOutline size={40} /> {/* Đặt kích thước của icon */}
                </div>
                <div className={styles.benefitTextContainer}>
                  <h5 className={styles.benefitTitle}>Free Shipping</h5>{" "}
                  {/* Tùy chỉnh kích thước chữ */}
                  <p className={styles.benefitText}>
                    Enjoy free shipping on all orders above $100
                  </p>{" "}
                  {/* Tùy chỉnh kích thước chữ */}
                </div>
              </div>
            </Card>
          </Col>
          <Col xs={24} sm={12} md={6} lg={6}>
            <Card className={styles.benefitCard}>
              <div className={styles.benefitContent}>
                <div
                  className={`${styles.benefitIcon} ${styles.freeShippingIcon}`}
                >
                  <IoChatbubbleEllipsesOutline size={40} />{" "}
                  {/* Đặt kích thước của icon */}
                </div>
                <div className={styles.benefitTextContainer}>
                  <h5 className={styles.benefitTitle}>SUPPORT 24/7</h5>{" "}
                  {/* Tùy chỉnh kích thước chữ */}
                  <p className={styles.benefitText}>
                    Our support team is there to help you for queries
                  </p>{" "}
                  {/* Tùy chỉnh kích thước chữ */}
                </div>
              </div>
            </Card>
          </Col>
          <Col xs={24} sm={12} md={6} lg={6}>
            <Card className={styles.benefitCard}>
              <div className={styles.benefitContent}>
                <div
                  className={`${styles.benefitIcon} ${styles.freeShippingIcon}`}
                >
                  <IoRefreshOutline size={40} /> {/* Đặt kích thước của icon */}
                </div>
                <div className={styles.benefitTextContainer}>
                  <h5 className={styles.benefitTitle}>30 DAYS RETURN</h5>{" "}
                  {/* Tùy chỉnh kích thước chữ */}
                  <p className={styles.benefitText}>
                    Simply return it within 30 days for an exchange.
                  </p>{" "}
                  {/* Tùy chỉnh kích thước chữ */}
                </div>
              </div>
            </Card>
          </Col>

          <Col xs={24} sm={12} md={6} lg={6}>
            <Card className={styles.benefitCard}>
              <div className={styles.benefitContent}>
                <div
                  className={`${styles.benefitIcon} ${styles.freeShippingIcon}`}
                >
                  <IoLockClosedOutline size={40} />{" "}
                  {/* Đặt kích thước của icon */}
                </div>
                <div className={styles.benefitTextContainer}>
                  <h5 className={styles.benefitTitle}>100% PAYMENT SECURE</h5>{" "}
                  {/* Tùy chỉnh kích thước chữ */}
                  <p className={styles.benefitText}>
                    Our payments are secured with 256 bit encryption
                  </p>{" "}
                  {/* Tùy chỉnh kích thước chữ */}
                </div>
              </div>
            </Card>
          </Col>
        </Row>
      </div>

      <div className={styles.promo}>
        <div className={`${styles.promoSection} ${styles.firstSection}`}>
          <h3 className={styles.promoTitle}>Peace of Mind</h3>
          <p className={styles.promoText}>
            A one-stop platform for all your fashion needs, hassle-free. Buy
            with a peace of mind.
          </p>
          <Button className={styles.promoButton} type="primary">
            Buy Now
          </Button>
        </div>
        <div className={styles.promoSection}>
          <h3 className={styles.promoTitle}>Buy 2 Get 1 Free</h3>
          <p className={styles.promoText}>
            End of season sale. Buy any 2 items of your choice and get 1 free.
          </p>
          <Button className={styles.promoButton} type="primary">
            Buy Now
          </Button>
        </div>
      </div>
    </div>
    
  );
}

export default Home;
