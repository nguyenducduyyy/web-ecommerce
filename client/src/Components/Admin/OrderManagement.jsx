import { Avatar, Button, Card, List, Space, Tag, notification } from 'antd';
import axios from 'axios';
import moment from 'moment';
import 'moment/locale/vi';
import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import CONFIG from '../../config';

const socket = io.connect(CONFIG.SOCKET_URL);
const statusColors = [
  { status: 'Tất cả', color: '#1890ff' },
  { status: 'Chờ xác nhận', color: 'rgb(175 143 202)' },
  { status: 'Đã xác nhận', color: '#faad14' },
  { status: 'Đã gửi hàng', color: '#722ed1' },
  { status: 'Hoàn tất', color: '#87d068' },
  { status: 'Hủy', color: '#ff4d4f' },
];

function Order() {
  const [orders, setOrders] = useState([]);
  const [expandedOrderId, setExpandedOrderId] = useState(null);
  const [filterStatus, setFilterStatus] = useState('Tất cả'); // Thêm state cho việc lọc
  const [isCompleted, setIsCompleted] = useState(false); // Thêm state cho trạng thái hoàn tất

  const fetchOrders = async () => {
    try {
      const response = await axios.get(`${CONFIG.API_URL}orders`);
      const sortedOrders = response.data.sort((a, b) => {
        // Sắp xếp theo thời gian tạo đơn hàng mới nhất lên trước
        return new Date(b.createdAt) - new Date(a.createdAt);
      });
      setOrders(sortedOrders);
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  useEffect(() => {
    fetchOrders();

    socket.on('ORDER_CREATED', (data) => {
      const orderNotification = notification.open({
        message: 'New Order',
        description: `Đơn hàng mới : ${data.orderId}`,
        onClick: () => {
          orderNotification.close();
        },
      });

      fetchOrders();
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const toggleExpanded = (orderId) => {
    if (expandedOrderId === orderId) {
      setExpandedOrderId(null);
    } else {
      setExpandedOrderId(orderId);
    }
  };

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      await axios.put(`${CONFIG.API_URL}orders/update-status`, {
        orderId,
        newStatus,
      });

      notification.success({
        message: 'Cập nhật trạng thái thành công',
        description: `Đơn hàng ${orderId} đã được cập nhật thành trạng thái "${newStatus}".`,
      });

      fetchOrders();

      // Nếu trạng thái là "Hoàn tất," đặt isCompleted thành true
      if (newStatus === 'Hoàn tất') {
        setIsCompleted(true);
      }
    } catch (error) {
      console.error('Error updating order status:', error);

      notification.error({
        message: 'Cập nhật trạng thái thất bại',
        description: 'Đã xảy ra lỗi khi cập nhật trạng thái đơn hàng.',
      });
    }
  };

  const filteredOrders = filterStatus === 'Tất cả' ? orders : orders.filter((order) => order.status === filterStatus);

  return (
    <div>
      <div style={{ marginBottom: '40px' }}>
        <Space>
          {statusColors.map((item) => (
            <Tag key={item.status} color={item.color} onClick={() => setFilterStatus(item.status)}>
              {item.status}
            </Tag>
          ))}
        </Space>
      </div>

      <List
        dataSource={filteredOrders}
        renderItem={(order) => (
          <Card style={{ marginBottom: '8px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>Giá trị đơn hàng : {order.totalBill.toLocaleString('en-US')}</span>

              <span>
                Trạng thái:{' '}
                <span
                  style={{
                    color: statusColors.find((item) => item.status === order.status)?.color,
                  }}
                >
                  {order.status}
                </span>
              </span>

              <span>Thời gian : {moment(order.createdAt).locale('vi').format('DD/MM/YYYY - HH:mm')}</span>
              <Button onClick={() => toggleExpanded(order._id)} style={{ marginLeft: '10px' }}>
                {expandedOrderId === order._id ? 'Ẩn' : 'Thông tin đơn hàng'}
              </Button>
            </div>

            {expandedOrderId === order._id && (
              <>
                <p>
                  Tên: {order.userId.name} (Sdt : {order.userId.phone})
                </p>
                <p>Phương thức thanh toán : {order.paymentMethod}</p>

                <List
                  dataSource={order.cartItems}
                  renderItem={(item, index) => (
                    <List.Item key={index}>
                      <List.Item.Meta
                        avatar={<Avatar src={item.imageUrl} />}
                        title={item.name}
                        description={`Giá: ${item.price.toLocaleString('en-US')} `}
                      />
                      <div>
                        {item.sizeAndQuantitySizeWant.map((sizeQty, i) => (
                          <p key={i}>
                            Size: {sizeQty.sizeName} - Số lượng: {sizeQty.quantity}
                          </p>
                        ))}
                      </div>
                    </List.Item>
                  )}
                />
                <div style={{ display: 'flex', borderTop: '1px solid red', paddingTop: '20px', justifyContent: 'space-between' }}>
                  <h4>Tổng bill : {order.totalBill.toLocaleString('en-US')} Vnd</h4>
                  <div style={{ display: 'flex' }}>
                    {order.status === 'Chờ xác nhận' && (
                      <Button onClick={() => handleStatusChange(order._id, 'Đã xác nhận')} style={{ marginLeft: '10px' }}>
                        Xác nhận đơn hàng
                      </Button>
                    )}

                    {order.status === 'Đã xác nhận' && (
                      <Button onClick={() => handleStatusChange(order._id, 'Đã gửi hàng')} style={{ marginLeft: '10px' }}>
                        Gửi hàng
                      </Button>
                    )}

                    {order.status === 'Đã gửi hàng' && (
                      <Button onClick={() => handleStatusChange(order._id, 'Hoàn tất')} style={{ marginLeft: '10px' }}>
                        Hoàn tất
                      </Button>
                    )}

                    {/* Chỉ hiển thị nút "Hủy" nếu isCompleted là false */}
                    {!isCompleted && order.status !== 'Hủy' && (
                      <Button danger onClick={() => handleStatusChange(order._id, 'Hủy')} style={{ marginLeft: '10px' }}>
                        Hủy
                      </Button>
                    )}
                  </div>
                </div>
              </>
            )}
          </Card>
        )}
      />
    </div>
  );
}

export default Order;
