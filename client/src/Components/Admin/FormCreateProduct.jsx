import {
  Form,
  Input,
  InputNumber,
  Button,
  Select,
  Checkbox,
  message,
} from "antd";
import axios from "axios";
import { useState } from "react";
import { Upload } from "antd";

const defaultSizes = ["S", "M", "L", "XL", "XXL"];

const { Option } = Select;

function FormCreateProduct() {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [fileList, setFileList] = useState([]);
  const [sizes, setSizes] = useState(defaultSizes);
  

  const handleImageChange = ({ fileList }) => {
    setFileList(fileList);
  };

  const handleSubmit = async (values) => {
    setLoading(true);
    try {
      const sizeQuantities = sizes.map((size) => ({
        name: size,
        quantity: values[size] ?? 0,
      }));

      const data = { ...values, sizes: sizeQuantities };
      console.log(data);

      //data xử lý ảnh
      const formData = new FormData();
      fileList.forEach((file) => {
        formData.append("images", file.originFileObj);
      });
      
      const fileNames = fileList.map(file => file.name);
      
      formData.append("data", JSON.stringify(data));

      console.log([...formData]);
      await axios.post("http://localhost:5000/api/products/create",formData);
console.log([...formData]);
      message.success("Images uploaded successfully");

      form.resetFields();
    } catch (error) {
      console.error(error);
      // show error message
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Form form={form} onFinish={handleSubmit}>
        <Form.Item
          label="Name"
          name="name"
          rules={[
            {
              required: true,
              message: "Please input the name of the product!",
            },
          ]}
        >
          <Input placeholder="Product name" />
        </Form.Item>

        <Form.Item
          label="Price"
          name="price"
          rules={[
            {
              required: true,
              message: "Please input the price of the product!",
            },
          ]}
        >
          <InputNumber
            defaultValue={0}
            min={0}
            formatter={(value) =>
              `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
            }
            parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
          />
        </Form.Item>

        <Form.Item
          label="Description"
          name="description"
          rules={[
            {
              required: true,
              message: "Please input the description of the product!",
            },
          ]}
        >
          <Input.TextArea placeholder="Product description" />
        </Form.Item>

        <Form.Item
          label="Category"
          name="category"
          rules={[
            {
              required: true,
              message: "Please input the category of the product!",
            },
          ]}
        >
          <Input placeholder="Product category" />
        </Form.Item>

        <Form.Item
          label="Brand"
          name="brand"
          rules={[
            {
              required: true,
              message: "Please input the brand of the product!",
            },
          ]}
        >
          <Input placeholder="Product brand" />
        </Form.Item>

        <Form.Item label="Size">
          {sizes.map((size) => (
            <Form.Item key={size} label={`${size} quantity`} name={size}>
              <InputNumber min={0 } defaultValue={0}  />
            </Form.Item>
          ))}
          <Checkbox.Group
            options={defaultSizes}
            value={sizes}
            onChange={(checkedSizes) => setSizes(checkedSizes)}
          />
        </Form.Item>

        <Form.Item label="Image">
          <Upload
            name="image"
            listType="picture-card"
            fileList={fileList}
            onChange={handleImageChange}
            multiple={false}
          >
            {fileList.length < 5 && "+ Upload"}
          </Upload>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading}>
            Update
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default FormCreateProduct;
