  import { Form, Input, InputNumber, Button, Select, Checkbox, message } from "antd";
  import axios from "axios";
  import { useState } from "react";
  import { Upload } from "antd";

  const defaultSizes = ["S", "M", "L", "XL", "XXL"];

  const { Option } = Select;

  function FormCreateProduct() {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const [fileList, setFileList] = useState([]);

    const handleImageChange = ({ fileList }) => {
    setFileList(fileList);
  };

    const handleSubmit = async (values) => {
      setLoading(true);
      try {
        const sizeQuantities = sizes.map((size) => ({
          name: size,
          description: getDescription(size),
          quantity: values[size],
        }));
        
        const data = { ...values, sizes: sizeQuantities };
        await axios.post("http://localhost:5000/api/products/create", {...data});
        console.log(data);
        
        const formData = new FormData();
      fileList.forEach((file) => {
        formData.append("images", file.originFileObj);
      });
      
      console.log([...formData]);
      const response = await axios.post(
        "http://localhost:5000/api/products/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      message.success("Images uploaded successfully");

      form.resetFields();
      } catch (error) {
        console.error(error.response.data);
        // show error message
      } finally {
        setLoading(false);
      }
    };
    

    const getDescription = (size) => {
      switch (size) {
        case "S":
          return "Size S phù hợp với người từ 45-50kg";
        case "M":
          return "Size M phù hợp với người từ 50-55kg";
        case "L":
          return "Size L phù hợp với người từ 55-65kg";
        case "XL":
          return "Size XL phù hợp với người từ 65-75kg";
        case "XXL":
          return "Size XXL phù hợp với người từ 75-85kg";
        default:
          return `Size ${size}`;
      }
    };

    //xu ly size
    const [sizes, setSizes] = useState(defaultSizes);

    

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
                <InputNumber min={0} />
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
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
    );
  }

  export default FormCreateProduct;
