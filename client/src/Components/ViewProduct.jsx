import React from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Row, Col, Card, Image, Select, Form, Input, Button, message, Avatar, Rate, Typography, Empty ,Modal} from 'antd';
import styles from './css/ViewProduct.module.css';
import messengerIcon from '../Img/icon-mess.png';
import { MinusCircleOutlined } from '@ant-design/icons';
import { useState ,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
const { Option } = Select;
const { Title, Text, Paragraph } = Typography;

function ViewProduct() {
  const { id } = useParams();
  const [product, setProduct] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  const { Meta } = Card;
  const [selectedSizes, setSelectedSizes] = React.useState({});
  const [form] = Form.useForm();
  const [reviews, setReviews] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false); // State để kiểm soát sự hiển thị của modal
  const navigate = useNavigate();
  
  React.useEffect(() => {
    axios
      .get(`http://localhost:5000/api/homepage/products/${id}`)
      .then((response) => {
        setProduct(response.data.product);
        setReviews(response.data.reviews);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  }, [id]);


  const handleSizeChange = (sizeName, quantity) => {
    const maxQuantity = product.sizes.find((size) => size.name === sizeName).quantity;

    // Kiểm tra nếu số lượng nhập vào lớn hơn số lượng hiện có thì gán giá trị là số lượng hiện có
    if (quantity > maxQuantity) {
      quantity = maxQuantity;
    }

    setSelectedSizes((prevSelectedSizes) => ({
      ...prevSelectedSizes,
      [sizeName]: quantity,
    }));
  };

  const handleRemoveSize = (sizeName) => {
    setSelectedSizes((prevSizes) => {
      const updatedSizes = { ...prevSizes };
      delete updatedSizes[sizeName];
      return updatedSizes;
    });
  };

  const handleAddToCart = () => {
    form.validateFields().then((values) => {
      const selectedProduct = {
        productId: id,
        sizes: selectedSizes,
      };
      const userJson = localStorage.getItem('user');
      const user = JSON.parse(userJson);
      const userId = user._id;

      console.log(userId);
      console.log(selectedProduct);
      axios
        .post(`http://localhost:5000/api/cart/${userId}/add`, selectedProduct) // Thay đổi URL để gửi dữ liệu giỏ hàng cho user cụ thể
        .then((response) => {
          // Thực hiện chuyển hướng sau khi thêm sản phẩm thành công
          // navigate("/cart");
          message.success('Sản phẩm đã được thêm vào giỏ hàng.');
        })
        .catch((error) => {
          console.error(error);
        });
    });
  };

  const handleOpenChat = () => {
    // Xử lý khi nút được nhấp, ví dụ: mở modal chat hoặc trang chat
    setIsModalVisible(true);
  };

 
  const handleCloseChat = () => {
    setIsModalVisible(false); // Khi bạn đóng modal, ẩn modal đi
  };

  const handleSendMessage = () => {
    // Thực hiện xử lý gửi tin nhắn hoặc chuyển đến giao diện chat tương tác
    // Tùy thuộc vào yêu cầu của ứng dụng của bạn.
    // Ví dụ:
    console.log(product);
    const productId = product._id
    navigate(`/chat/${productId}`); // Chuyển đến giao diện chat
  };
  

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!product) {
    return <p>Product not found.</p>;
  }

  const sizes = product.sizes;

  const totalRatings = reviews.reduce((sum, review) => sum + review.rating, 0);
  const averageRating = totalRatings / reviews.length;
  return (
    <div className={styles.product_inf}>
      <Row gutter={[16, 16]} className={styles.imageRow}>
        <Col span={10}>
          <Row gutter={[16, 16]}>
            <Col span={18}>
              <Image src={product.imageUrl[0]} alt={product.name} className={styles.largeImage} />
            </Col>
            <Col span={6}>
              <Row gutter={[16, 16]}>
                {product.imageUrl.slice(1, 5).map((url, index) => (
                  <Col span={18} key={index} className={`${styles.img} ${styles.smallImage}`}>
                    <Image src={url} alt="" style={{ flex: 1 }} />
                  </Col>
                ))}
              </Row>
            </Col>
          </Row>
        </Col>
        <Col span={14}>
          <Card className={styles.card}>
            <Title level={4}>{product.name}</Title>
            <Paragraph style={{ fontSize: '16px', marginBottom: '8px' }}>Giá: {product.price} đ</Paragraph>
            Đánh giá : <Rate disabled allowHalf value={averageRating} style={{ fontSize: '16px', marginBottom: '16px' }} />
            <Paragraph
              style={{
                fontSize: '14px',
                marginBottom: '16px',
                whiteSpace: 'pre-line',
                color: 'rgb(199 128 128)',
                fontFamily: 'Arial, sans-serif',
                fontWeight: 'normal',
                fontStyle: 'normal',
              }}
            >
              {product.description}
            </Paragraph>
            <Form form={form} layout="vertical">
              <Row gutter={[16, 8]}>
                <Col span={24}>
                  <Form.Item style={{ margin: '0' }}>
                    <Select style={{ width: '25%' }} onChange={(value) => handleSizeChange(value)} placeholder="Chọn size">
                      {sizes.map((size) => {
                        if (size.quantity > 0) {
                          return (
                            <Option key={size._id} value={size.name}>
                              {size.name}
                            </Option>
                          );
                        }
                        return null; // Bỏ qua tùy chọn khi số lượng bằng 0
                      })}
                    </Select>
                  </Form.Item>
                </Col>

                <Row gutter={[16, 16]} style={{ width: '100%', margin: 0 }}>
                  {Object.entries(selectedSizes).map(([sizeName, value]) => (
                    <React.Fragment key={sizeName}>
                      <Col span={8}>
                        <Form.Item
                          label={
                            <span>
                              Size {sizeName} - Số Lượng : {product.sizes.find((size) => size.name === sizeName).quantity}
                            </span>
                          }
                          style={{ marginBottom: 0, width: '100%' }}
                        >
                          <div className={styles.formItemContainer}>
                            <Input
                              type="number"
                              min={0}
                              max={product.sizes.find((size) => size.name === sizeName).quantity}
                              placeholder="Nhập số lượng"
                              value={value}
                              onChange={(e) => handleSizeChange(sizeName, e.target.value)}
                              style={{ width: '100%' }}
                            />
                            <div className={styles.deleteButtonContainer}>
                              <Button onClick={() => handleRemoveSize(sizeName)} size="small" className={styles.delete_button}>
                                <div className={styles.delete_button_wrapper}>
                                  <MinusCircleOutlined className={styles.deleteButtonIcon} />
                                </div>
                              </Button>
                            </div>
                          </div>
                        </Form.Item>
                      </Col>
                    </React.Fragment>
                  ))}
                </Row>

                <Col span={24} style={{ marginTop: 16 }}>
                  <Form.Item style={{ margin: 0 }}>
                    <Button type="primary" onClick={handleAddToCart}>
                      Add to Cart
                    </Button>
                  </Form.Item>
                </Col>
              </Row>
            </Form>
          </Card>
        </Col>
      </Row>

      <div className={styles.product_reviews}>
        <Title level={4} style={{ color: 'rgb(199, 128, 128)' }}>
          Đánh giá sản phẩm
        </Title>
        {reviews.length === 0 ? (
          <Empty
            description="Chưa có đánh giá nào về sản phẩm"
            style={{ minHeight: '280px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}
          />
        ) : (
          <ul className={styles.reviewList}>
            {reviews.map((review) => (
              <li key={review._id} className={styles.reviewItem}>
                <Row gutter={[16, 16]}>
                  <Col span={6}>
                    <Avatar src={review.userId.picture} size={48} className={styles.avatar} />
                    <Title level={5} className={styles.userName}>
                      {review.userId.name}
                    </Title>
                  </Col>
                  <Col span={18}>
                    <Row gutter={[16, 16]} style={{ rowGap: '8px' }}>
                      <Col span={24}>
                        <Rate disabled allowHalf value={review.rating} className={styles.rating} />
                        <Text className={styles.createdAt}>{review.createdAt}</Text>
                      </Col>
                      <Col span={24}>
                        <Paragraph className={styles.comment}>{review.comment}</Paragraph>
                      </Col>
                    </Row>
                  </Col>
                </Row>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className={styles.product_inf}>
        {/* ... (phần mã của bạn) */}
        <img
          src={messengerIcon} // Đường dẫn đến hình biểu tượng Messenger
          alt="Messenger"
          onClick={handleOpenChat} // Xử lý khi hình biểu tượng Messenger được nhấp
          style={{
            position: 'fixed',
            bottom: '60px',
            right: '40px',
            zIndex: 1, // Để hình biểu tượng hiển thị trên các phần khác
            cursor: 'pointer', // Đổi con trỏ khi di chuột qua hình biểu tượng
            width: '50px', // Độ rộng của hình biểu tượng
            height: '50px', // Độ cao của hình biểu tượng
            // Áp dụng hiệu ứng rung rung khi di chuột qua hình
            transition: 'transform 0.2s ease-in-out',
            animation: 'vibrate 0.3s ease infinite',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'scale(1.1)'; // Tăng kích thước khi di chuột vào
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'scale(1)'; // Khôi phục kích thước khi di chuột ra
          }}
        />
        <Modal
        title="Thông tin sản phẩm"
        visible={isModalVisible}
        onCancel={handleCloseChat}
        footer={[
          <Button key="message" type="primary" onClick={handleSendMessage}>
            Nhắn tin cho chúng tôi
          </Button>,
        ]}
      >
        {/* Hiển thị thông tin sản phẩm ở đây */}
        <div>
          <img src={product.imageUrl} alt={product.name} />
          <p>Tên sản phẩm: {product.name}</p>
          {/* Các thông tin khác về sản phẩm */}
        </div>
      </Modal>
      </div>
      
    </div>
  );
}

export default ViewProduct;
