import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Card,
  Row,
  Col,
  Pagination,
  Select,
  Slider,
  Button,
  Checkbox,
  Radio,
} from "antd";
import { useNavigate} from "react-router-dom";
const { Option } = Select;

function ProductList() {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalProducts, setTotalProducts] = useState(0);
  const pageSize = 8; // Số sản phẩm trên mỗi trang
  const navigate = useNavigate();
  const [priceRange, setPriceRange] = useState([0, 500000]);

  const [brands, setBrands] = useState([]); // Danh sách các brand
  const [selectedBrands, setSelectedBrands] = useState([]);

  const [sortByPrice, setSortByPrice] = useState(""); // Thêm trạng thái cho việc sắp xếp giá
  const [sortByBestSelling, setSortByBestSelling] = useState(false);

  const [searchKeyword, setSearchKeyword] = useState("");

  useEffect(() => {
    fetchBrands();
    fetchProducts();
  }, [
    currentPage,
    priceRange,
    selectedBrands,
    sortByPrice,
    sortByBestSelling,
    searchKeyword,
  ]);

  const fetchProducts = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/homepage/products`,
        {
          params: {
            page: currentPage,
            pageSize: pageSize,
            minPrice: priceRange[0],
            maxPrice: priceRange[1],
            brands: selectedBrands.join(","),
            sortByPrice: sortByPrice,
            sortByBestSelling: sortByBestSelling.toString(),
            searchKeyword: searchKeyword,
          },
        }
      );

      setProducts(response.data.products);
      console.log(response.data.products);
      setTotalProducts(response.data.totalProducts);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchBrands = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/homepage/products/brands`
      );

      setBrands(response.data.brands);
    } catch (error) {
      console.error(error);
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handlePriceChange = (value) => {
    setPriceRange(value);
  };

  const handleSortByBestSellingChange = (e) => {
    setSortByBestSelling(e.target.checked);
  };

  const handleSearch = () => {
    fetchProducts();
  };

  const handleCardClick = (productId) => {
    console.log(productId);
    // Điều hướng đến trang chi tiết sản phẩm với productId
    
    navigate(`/products/${productId}`);
  };
  return (
    <div style={{ margin: "40px 5% 0" }}>
      <Row gutter={16}>
        <Col span={6}>
          <div style={{ marginBottom: 32 }}>
            <div style={{ color: "rgb(22, 119, 255)" }}>
              <h5>Lọc theo giá</h5>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginTop: "20px",
              }}
            >
              <div>{priceRange[0]}</div>
              <div>{priceRange[1]}</div>
            </div>
            <Slider
              range
              step={50000}
              min={0}
              max={500000}
              value={priceRange}
              onChange={handlePriceChange}
            />

            <Radio.Group
              onChange={(e) => setSortByPrice(e.target.value)}
              value={sortByPrice}
            >
              <Radio value="lowToHigh">Giá từ thấp đến cao</Radio>
              <Radio value="highToLow">Giá từ cao đến thấp</Radio>
            </Radio.Group>
          </div>

          <div style={{ marginBottom: 32 }}>
            <h5 style={{ color: "rgb(22, 119, 255)" }}>Thương hiệu</h5>

            <Checkbox.Group
              options={brands.map((brand) => ({ label: brand, value: brand }))}
              value={selectedBrands}
              onChange={(values) => setSelectedBrands(values)}
              style={{ width: "100%", marginTop: 8 }}
            />
          </div>

          <div style={{ marginBottom: 32 }}>
            <h5 style={{ color: "rgb(22, 119, 255)", marginBottom: "16px" }}>
              Top sản phẩm
            </h5>

            <Checkbox onChange={handleSortByBestSellingChange}>
              Sản phẩm bán chạy nhất
            </Checkbox>
          </div>

          <div style={{ marginBottom: 32 }}>
            <h5 style={{ color: "rgb(22, 119, 255)", marginBottom: "16px" }}>
              Tìm kiếm
            </h5>
            <div style={{ display: "flex", alignItems: "center" }}>
              <input
                type="text"
                placeholder="Tìm kiếm sản phẩm"
                value={searchKeyword}
                onChange={(e) => setSearchKeyword(e.target.value)}
                style={{
                  flex: 1,
                  padding: "8px",
                  border: "1px solid #ccc",
                  borderRadius: "4px",
                  marginRight: "8px",
                }}
              />
              <button
                type="button"
                onClick={handleSearch}
                style={{
                  background: "rgb(22, 119, 255)",
                  color: "#fff",
                  border: "none",
                  borderRadius: "4px",
                  padding: "8px 16px",
                  cursor: "pointer",
                }}
              >
                Tìm kiếm
              </button>
            </div>
          </div>
        </Col>
        
        <Col span={18}>
          <Row gutter={16}>
            {products.map((product) => (
              <Col key={product?._id} span={12}>
              {product && (
                <Card title={product.name} style={{ marginBottom: 16 ,cursor: "pointer"}} onClick={() => handleCardClick(product._id)}>
                  
                    <div style={{ display: "flex" }}>
                      <div style={{ flex: 1, paddingRight: "10px", textAlign: "center" }}>
                        <img
                          src={product.imageUrl[0]}
                          alt={product.name}
                          style={{
                            maxWidth: "100%",
                            maxHeight: "150px",
                            objectFit: "contain",
                          }}
                        />
                      </div>
                      <div style={{ flex: 1, paddingLeft: "10px" }}>
                        <p>Giá: {product.price}</p>
                        <p>Đã bán: {product.totalQuantitySold}</p>
                      </div>
                    </div>
                  
                </Card>
              )}
            </Col>
            ))}
          </Row>
          <Pagination
            current={currentPage}
            pageSize={pageSize}
            total={totalProducts}
            onChange={handlePageChange}
            style={{ marginTop: 16, textAlign: "center" }}
          />
        </Col>
      </Row>
    </div>
  );
}

export default ProductList;
