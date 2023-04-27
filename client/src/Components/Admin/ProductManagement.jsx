import React from "react";
import axios from "axios";
import { Form, Upload, Button, Input, message } from "antd";
import { useState } from "react";
//test

import { Route, Link } from "react-router-dom";

function ProductManagement() {
  const [fileList, setFileList] = useState([]);
  const [imageUrls, setImageUrls] = useState([]);

  const handleFileChange = ({ fileList }) => {
    setFileList(fileList);
  };

  const handleSubmit = async (values) => {
    try {
      const formData = new FormData();
      fileList.forEach((file) => {
        formData.append("images", file.originFileObj);
      });
  
      const response = await axios.post(
        "http://localhost:5000/api/products/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
  
      console.log(response.data); // In ra đường dẫn các ảnh đã upload
  
      message.success("Images uploaded successfully");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      //đây dùng để test
      <Form onFinish={handleSubmit}>
      <Form.Item
        label="Images"
        name="images"
        rules={[
          { required: true, message: "Please select at least one image" },
        ]}
      >
        <Upload
          name="images"
          listType="picture-card"
          fileList={fileList}
          onChange={handleFileChange}
          multiple={true}
        >
          {fileList.length < 5 && "+ Upload"}
        </Upload>
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>

      //
      <Link to="/admin/quan-ly-san-pham/tao-moi-san-pham">
        Tạo mới sản phẩm
      </Link>
    </div>
  );
}
export default ProductManagement;
