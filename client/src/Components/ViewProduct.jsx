import React from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import {
  Row,
  Col,
  Card,
  Image,
  Select,
  Form,
  Input,
  Button,
  Space,
} from "antd";
import styles from "./css/ViewProduct.module.css";
import { MinusCircleOutlined } from "@ant-design/icons";
const { Option } = Select;

function ViewProduct() {
  const { id } = useParams();
  const [product, setProduct] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  const { Meta } = Card;
  const [selectedSizes, setSelectedSizes] = React.useState({});
  const [form] = Form.useForm();

  React.useEffect(() => {
    axios
      .get(`http://localhost:5000/api/homepage/products/${id}`)
      .then((response) => {
        setProduct(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  }, [id]);

  const handleSizeChange = (sizeName, quantity) => {
    const maxQuantity = product.sizes.find(
      (size) => size.name === sizeName
    ).quantity;

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
      // Perform add to cart logic
      // You can access selectedSizes and values.quantity here
    });
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!product) {
    return <p>Product not found.</p>;
  }

  const sizes = product.sizes;

  return (
    <div className={styles.product_inf}>
      <Row gutter={[16, 16]} className={styles.imageRow}>
        <Col span={10}>
          <Row gutter={[16, 16]}>
            <Col span={18}>
              <Image
                src={product.imageUrl[0]}
                alt={product.name}
                className={styles.largeImage}
              />
            </Col>
            <Col span={6}>
              <Row gutter={[16, 16]}>
                {product.imageUrl.slice(1, 5).map((url, index) => (
                  <Col
                    span={18}
                    key={index}
                    className={`${styles.img} ${styles.smallImage}`}
                  >
                    <Image src={url} alt="" style={{ flex: 1 }} />
                  </Col>
                ))}
              </Row>
            </Col>
          </Row>
        </Col>
        <Col span={14}>
          <Card>
            <Meta
              title={product.name}
              description={`Price: ${product.price}`}
            />
            <span>★★★★★</span>
            <p>Ở đây là giới thiệu</p>
            <Form form={form} layout="vertical">
              <Row gutter={[16, 8]}>
                <Col span={24}>
                  <Form.Item>
                    <Select
                      style={{ width: "25%" }}
                      onChange={(value) => handleSizeChange(value)}
                      placeholder="Select size"
                    >
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

                <Row gutter={[16, 16]} style={{ width: "100%", margin:0 , }}>
                  {Object.entries(selectedSizes).map(([sizeName, value]) => (
                    <React.Fragment key={sizeName}>
                      <Col span={8}>
                        <Form.Item
                          label={
                            <span>
                              Size {sizeName} - Quantity :{" "}
                              {
                                product.sizes.find(
                                  (size) => size.name === sizeName
                                ).quantity
                              }
                            </span>
                          }
                          style={{ marginBottom: 0, width: "100%" }}
                        >
                          <div className={styles.formItemContainer}>
                            <Input
                              type="number"
                              min={0}
                              max={
                                product.sizes.find(
                                  (size) => size.name === sizeName
                                ).quantity
                              }
                              placeholder="Quantity"
                              value={value}
                              onChange={(e) =>
                                handleSizeChange(sizeName, e.target.value)
                              }
                              style={{ width: "100%" }}
                            />
                            <div className={styles.deleteButtonContainer}>
                              <Button
                                onClick={() => handleRemoveSize(sizeName)}
                                size="small"
                                className={styles.delete_button}
                              >
                                <div className={styles.delete_button_wrapper}>
                                  <MinusCircleOutlined
                                    className={styles.deleteButtonIcon}
                                  />
                                </div>
                              </Button>
                            </div>
                          </div>
                        </Form.Item>
                      </Col>
                    </React.Fragment>
                  ))}
                </Row>

                <Col span={24} style={{marginTop:16}}>
                <Form.Item>
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
      <div>{product.description}</div>
    </div>
  );
}

export default ViewProduct;
