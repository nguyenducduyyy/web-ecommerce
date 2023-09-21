import React, { useState, useEffect } from "react";
import { Form, Input, Button, message, Select } from "antd";
import axios from "axios";

const { Option } = Select;

const UserInfo = () => {
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState(null);
  const [formKey, setFormKey] = useState(1);

  // xu ly các tỉnh thành
  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);
  const [selectedProvince, setSelectedProvince] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [selectedWard, setSelectedWard] = useState("");


  const [showAdditionalAddress, setShowAdditionalAddress] = useState(false);
  //
  useEffect(() => {
    const fetchUserData = async () => {
      const storedUser = localStorage.getItem("user");

      if (storedUser) {
        const parsedUser = JSON.parse(storedUser);

        try {
          const response = await axios.get(
            `http://localhost:5000/api/auth/user/${parsedUser._id}`
          );
          const { user } = response.data;
          setUserData(user);
        } catch (error) {
          console.error("Lỗi khi lấy thông tin người dùng:", error);
        }
      }
    };

    fetchUserData();
  }, []);

  useEffect(() => {
    if (userData) {
      setFormKey((prevKey) => prevKey + 1);
    }
  }, [userData]);

  useEffect(() => {
    // Gọi API để lấy danh sách tỉnh/thành phố
    axios
      .get("https://provinces.open-api.vn/api/?depth=3")
      .then((response) => {
        setProvinces(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleProvinceChange = (value) => {
    setSelectedProvince(value);
    setSelectedDistrict("");
    setDistricts([]);
    setSelectedWard("");
    setWards([]);

    // Lấy danh sách quận/huyện của tỉnh/thành phố được chọn
    const selectedProvinceData = provinces.find(
      (province) => province.code === value
    );
    if (selectedProvinceData && selectedProvinceData.districts) {
      setDistricts(selectedProvinceData.districts);
    }
  };

  const handleDistrictChange = (value) => {
    setSelectedDistrict(value);
    setSelectedWard("");
    setWards([]);

    // Lấy danh sách phường/xã của quận/huyện được chọn
    const selectedDistrictData = districts.find(
      (district) => district.code === value
    );
    if (selectedDistrictData && selectedDistrictData.wards) {
      setWards(selectedDistrictData.wards);
    }
  };

  const handleAddAddress = () => {
    setShowAdditionalAddress(true);
  };

  const handleFinish = async (values) => {
    setLoading(true);

    const { homeAddress, ...otherValues } = values;

    const selectedProvinceData = provinces.find(
      (province) => province.code === selectedProvince
    );
    const selectedDistrictData = districts.find(
      (district) => district.code === selectedDistrict
    );
    const selectedWardData = wards.find((ward) => ward.code === selectedWard);

    const fullAddress = `${homeAddress} / ${selectedWardData?.name || ""} / ${
      selectedDistrictData?.name || ""
    } / ${selectedProvinceData?.name || ""}`;
    console.log(fullAddress);

    try {
      const updatedData = {
        userId: userData._id,
        updatedData: {
          ...otherValues,
          address: fullAddress,
        },
      };

      const response = await axios.post(
        "http://localhost:5000/api/auth/user/update",
        updatedData
      );
      setLoading(false);
      setUserData(response.data.user);
      message.info("Lưu thông tin thành công!");
    } catch (error) {
      setLoading(false);
      console.error("Lỗi khi cập nhật thông tin người dùng:", error);
    }
  };

  return (
    <div style={{ width: 400, margin: "0 auto", marginTop: 100 }}>
      <h2>Thông tin người dùng</h2>

      <Form key={formKey} onFinish={handleFinish} initialValues={userData}>
        <Form.Item
          name="name"
          label="Họ và tên"
          rules={[{ required: true, message: "Vui lòng nhập họ và tên!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="email"
          label="Email"
          rules={[
            { required: true, message: "Vui lòng nhập địa chỉ email!" },
            { type: "email", message: "Địa chỉ email không hợp lệ!" },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item>
          <Button onClick={handleAddAddress}>Thêm địa chỉ mới</Button>
        </Form.Item>

        <Form.Item
          name="phone"
          label="Số điện thoại"
          rules={[{ required: true, message: "Vui lòng nhập số điện thoại!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading}>
            Lưu thông tin
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default UserInfo;
