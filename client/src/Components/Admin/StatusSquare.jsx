import React from "react";
import { Tag } from "antd";

const StatusSquare = ({ status, onClick }) => {
  const statusColors = {
    "Chờ xác nhận": "orange",
    "Đã xác nhận": "green",
    "Đã gửi hàng": "blue",
    // Thêm các trạng thái và màu sắc tương ứng
  };

  return (
    <>
    
    <Tag color={statusColors[status]} onClick={onClick}>
      {status}
    </Tag>
    </>
  );
};

export default StatusSquare;
