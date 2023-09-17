import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Table, Space, Button, message } from "antd";
import axios from "axios";
import { Modal } from 'antd';

function ProductManagement() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10, // Số sản phẩm trên mỗi trang
  });

  useEffect(() => {
    fetchData();
  }, [pagination.current]); // Sử dụng pagination.current thay vì currentPage

  const fetchData = () => {
    axios.get(`http://localhost:5000/api/products?page=${pagination.current}`)
      .then((response) => {
        setProducts(response.data.products);
        setLoading(false);
        setPagination({
          ...pagination,
          total: response.data.totalPages * pagination.pageSize,
          // Bạn cần tính tổng số sản phẩm dựa trên số trang và số sản phẩm trên mỗi trang
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleDelete = (id) => {
    Modal.confirm({
      title: 'Confirm Delete',
      content: 'Are you sure you want to delete this product?',
      okText: 'Delete',
      okType: 'danger',
      cancelText: 'Cancel',
      onOk: () => {
        axios.delete(`http://localhost:5000/api/products/${id}`)
          .then((response) => {
            message.success("Product deleted successfully.");
            fetchData(); // Sau khi xóa, làm mới dữ liệu
          })
          .catch((error) => {
            message.error("An error occurred while deleting the product.");
          });
      },
      onCancel: () => {
        // Hủy bỏ thao tác xóa
      },
    });
  };

  const columns = [
    {
      title: "Tên sản phẩm",
      dataIndex: "name",
      key: "name",
      render: (text, record) => (
        <Link to={`/admin/quan-ly-san-pham/${record._id}/edit`}>{text}</Link>
      ),
    },
    {
      title: "Giá sản phẩm",
      dataIndex: "price",
      key: "price",
      render(price) {
        const formattedPrice = price.toLocaleString("en-US");
        return <div>{formattedPrice}</div>;
      }
    
    },
    {
      title: "Số lượng sản phẩm",
      dataIndex: "total",
      key: "total",
    },
    {
      title: "Image",
      dataIndex: "imageUrl",
      key: "imageUrl",
      render: (imageUrl) => (
        <img
          src={imageUrl[0]}
          alt="product"
          style={{ height: "100px", width: "auto" }}
        />
      ),
    },
    {
      title: "Actions",
      key: "actions",
      render: (text, record) => (
        <Space size="middle">
          <Link to={`/admin/quan-ly-san-pham/${record._id}/edit`}>
            <Button type="primary">Edit</Button>
          </Link>
          <Button type="danger" onClick={() => handleDelete(record._id)}>
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  const handleTableChange = (pagination) => {
    setPagination(pagination);
  };

  return (
    <div>
      <h1>Product List</h1>
      <Link to="/admin/quan-ly-san-pham/tao-moi-san-pham">
        <Button type="primary" style={{ marginBottom: "20px" }}>
          Create Product
        </Button>
      </Link>
      <Table
        columns={columns}
        dataSource={products}
        loading={loading}
        pagination={pagination}
        onChange={handleTableChange} // Thêm sự kiện onChange để xử lý chuyển trang
      />
    </div>
  );
}

export default ProductManagement;
