import React, { useEffect } from 'react';
import { Result, Button } from 'antd';
import { CheckCircleOutlined } from '@ant-design/icons';


function OrderSuccess() {
  useEffect(()=>{
    const orderData = JSON.parse(localStorage.getItem("orderData"));
console.log("Thông tin đơn hàng từ localStorage:", orderData);
  },[])
  
  return (
    <div className="order-success-container" style={{ height: "60vh",display:"flex", justifyContent:"center",alignItems:"center" }}>
      <Result
        icon={<CheckCircleOutlined />}
        title="Đặt hàng thành công!"
        subTitle="Cảm ơn bạn đã mua sắm tại cửa hàng của chúng tôi."
        extra={[
          <Button key="continue-shopping" type="primary">
            Tiếp tục mua sắm
          </Button>,
          <Button key="view-orders">Xem đơn hàng</Button>,
        ]}
      />
    </div>
  );
}

export default OrderSuccess;
