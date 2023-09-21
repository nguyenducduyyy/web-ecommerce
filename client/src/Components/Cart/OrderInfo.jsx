import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Modal, Button, notification ,Empty } from 'antd';
import { Row, Col, Card } from 'antd';
import { Link } from 'react-router-dom';
import { SmallDashOutlined } from '@ant-design/icons';
import { IoCartOutline, IoChatbubbleEllipsesOutline, IoRefreshOutline, IoLockClosedOutline } from 'react-icons/io5';
import styles from '../css/Home.module.css';

import '../css/OrderInfo.css';

const orderStatuses = [
  'Chờ xác nhận',
  'Đã xác nhận',
  'Đã gửi hàng',
  'Hoàn tất',
  // "Hủy",
];
function OrderInfo() {
  const [orders, setOrders] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState('Chờ xác nhận');
  const [orderStatus, setOrderStatus] = useState('Chờ xác nhận');
  const [selectedOrders, setSelectedOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isCancelingOrder, setIsCancelingOrder] = useState(false);
  const [isRatingOrder, setIsRatingOrder] = useState(false);

  const userJson = localStorage.getItem('user');
  const user = JSON.parse(userJson);
  const userId = user._id;

  useEffect(() => {
    // Gọi API để lấy danh sách các đơn hàng của người dùng
    axios
      .get(`http://localhost:5000/api/orders/${userId}`)
      .then((response) => {
        setOrders(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [userId, orderStatus]);

  useEffect(() => {
    // Lọc các đơn hàng theo trạng thái được chọn
    const filteredOrders = orders.filter((order) => order.status === selectedStatus);
    setSelectedOrders(filteredOrders);
  }, [selectedStatus, orders]);

  const showOrderDetails = (order) => {
    setSelectedOrder(order);
    setIsCancelingOrder(order.status === 'Chờ xác nhận');
    setIsRatingOrder(order.status === 'Hoàn tất');
  };

  const closeModal = () => {
    setSelectedOrder(null);
  };

  const isNoOrders = selectedOrders.length === 0;

  const handleCancelOrder = (order) => {
    // Thực hiện logic hủy đơn hàng ở đây, có thể gửi yêu cầu đến máy chủ
    // để cập nhật trạng thái đơn hàng và xử lý các tác vụ khác liên quan đến hủy đơn hàng.
    axios
      .post('http://localhost:5000/api/orders/cancel', { orderId: order._id })
      .then((response) => {
        // Xử lý kết quả từ máy chủ (nếu cần)
        console.log(response.data.message);
        notification.success({
          message: 'Hủy đơn hàng thành công',
          duration: 3, // Thời gian hiển thị thông báo (giây)
        });
        setOrderStatus('Hủy thành công'); // Cập nhật trạng thái
      })
      .catch((error) => {
        // Xử lý lỗi từ máy chủ (nếu cần)
        console.error(error);
      });
  };

  const handleRateOrder = (order) => {
    // Thực hiện logic đánh giá đơn hàng ở đây, có thể mở form đánh giá,
    // gửi yêu cầu đến máy chủ để lưu đánh giá, và xử lý các tác vụ khác
    // liên quan đến đánh giá đơn hàng.
  };

  return (
    <div>
      <h4 style={{ marginLeft: '5%', marginBottom: '20px', marginTop: '40px' }}>Đơn hàng của bạn</h4>

      <div style={{ marginLeft: '5%', marginRight: '5%' }}>
        <Row gutter={[16, 16]} justify="center">
          {orderStatuses.map((status) => (
            <Col xs={24} sm={12} md={6} lg={6} key={status}>
              <Card
                onClick={() => setSelectedStatus(status)}
                className={`custom-card ${selectedStatus === status ? 'selected' : ''}`}
              >
                <div className="card-content">
                  <div className="icon">
                    {status === 'Chờ xác nhận' && <IoCartOutline size={40} />}
                    {status === 'Đã xác nhận' && <IoChatbubbleEllipsesOutline size={40} />}
                    {status === 'Đã gửi hàng' && <IoRefreshOutline size={40} />}
                    {status === 'Hoàn tất' && <IoLockClosedOutline size={40} />}
                  </div>
                  <h5 className="status">{status}</h5>
                </div>
              </Card>
            </Col>
          ))}
        </Row>
      </div>

      <div style={{ marginLeft: '5%', marginRight: '5%', marginTop: '40px' , minHeight: '400px'}}>
        {/* Kiểm tra nếu không có đơn hàng nào trong trạng thái đã chọn */}
        {isNoOrders ? (
         <div style={{ minHeight: '400px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
         <Empty description={<span>Không có đơn hàng nào trong trạng thái đã chọn.</span>} />
       </div>
        ) : (
          selectedOrders.map((order) => (
            <div
              key={order._id}
              style={{
                border: '1px solid #ccc',
                padding: '20px',
                marginBottom: '20px',
                alignItems: 'center',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                borderRadius: '8px',
                backgroundColor: '#fff',
                
              }}
            >
              <div style={{ display: 'flex' }}>
                <div style={{ flex: '1', display: 'flex', alignItems: 'center' }}>
                  <div style={{ flex: '0 0 120px', marginRight: '20px' }}>
                    <img
                      src={order.cartItems[0].imageUrl}
                      alt={order.cartItems[0].name}
                      style={{ maxWidth: '100%', borderRadius: '8px' }}
                    />
                  </div>
                  <div>
                    <p
                      style={{
                        fontSize: '18px',
                        fontWeight: 'bold',
                        color: '#333',
                      }}
                    >
                      {order.cartItems[0].name}
                    </p>
                    <p style={{ color: '#666' }}>
                      <strong>Giá:</strong> {order.cartItems[0].price} đ
                    </p>
                    <p style={{ color: '#666' }}>
                      <strong>Số lượng:</strong> {order.cartItems[0].sizeAndQuantitySizeWant[0].quantity}
                    </p>
                  </div>
                </div>
                <div
                  style={{
                    flex: '1',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'self-end',
                    marginRight: '60px',
                  }}
                >
                  <p style={{ fontSize: '16px', color: '#444' }}>Tổng tiền thanh toán: {order.totalBill} đ</p>
                  <p style={{ fontSize: '16px', color: '#444' }}>Trạng thái: {order.status}</p>
                  <p style={{ fontSize: '14px', color: '#888' }}>Ngày tạo: {order.createdAt}</p>

                  <div>
                    <Button type="primary" onClick={() => showOrderDetails(order)} style={{ marginTop: '15px' }}>
                      Xem chi tiết đơn hàng
                    </Button>
                    {/* Nút "Hủy đơn hàng" */}
                    {order.status === 'Chờ xác nhận' && (
                      <Button
                        danger
                        onClick={() => handleCancelOrder(order)}
                        style={{ marginTop: '15px', marginLeft: '15px' }}
                      >
                        Hủy đơn hàng
                      </Button>
                    )}

                    {order.status === 'Hoàn tất' && (
                       <Link to={`/review?orderId=${order._id}`} key={order._id}>
                       <Button  danger style={{ marginTop: '15px' ,marginLeft:'15px'}}>
                         Đánh giá
                       </Button>
                     </Link>
                    )}
                  </div>
                </div>
              </div>

              <div
                style={{
                  textAlign: 'center',
                  marginTop: '10px',
                  fontSize: '32px',
                }}
              >
                <SmallDashOutlined />
              </div>
            </div>
          ))
        )}
      </div>

      {/* Modal hiển thị chi tiết đơn hàng */}
      <Modal title="Order Details" visible={!!selectedOrder} onCancel={closeModal} footer={null} width={1000}>
        {selectedOrder && (
          <div>
            <h4>Thông tin đơn hàng</h4>

            <p>
              <strong>Order ID:</strong> {selectedOrder._id}
            </p>
            <p>
              <strong>Total Bill:</strong> {selectedOrder.totalBill}
            </p>
            <p>
              <strong>Selected Address:</strong> {selectedOrder.selectedAddress}
            </p>
            <p>
              <strong>Payment Method:</strong> {selectedOrder.paymentMethod}
            </p>
            <p>
              <strong>Status:</strong> {selectedOrder.status}
            </p>

            <h4>Sản phẩm trong đơn hàng</h4>
            {selectedOrder.cartItems.map((item) => (
              <div
                key={item.productId}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  marginBottom: '20px',
                }}
              >
                <div style={{ flex: '0 0 100px', marginRight: '20px' }}>
                  <img src={item.imageUrl} alt={item.name} style={{ maxWidth: '100px' }} />
                </div>
                <div>
                  <p>
                    <strong>Tên sản phẩm:</strong> {item.name}
                  </p>
                  <p>
                    <strong>Giá:</strong> {item.price}
                  </p>
                  <p>
                    <strong>Số lượng:</strong> {item.sizeAndQuantitySizeWant[0].quantity}
                  </p>
                  {/* Thêm chi tiết khác nếu cần */}
                </div>
              </div>
            ))}
          </div>
        )}
      </Modal>
    </div>
  );
}

export default OrderInfo;
