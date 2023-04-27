import { useState } from "react";
import { Form, Checkbox, InputNumber } from "antd";

const defaultSizes = ["S", "M", "L", "XL", "XXL"];

const UserManagement = () => {
  const [sizes, setSizes] = useState(defaultSizes);

  const handleSizeChange = (size, checked) => {
    if (checked) {
      setSizes([...sizes, size]);
    } else {
      setSizes(sizes.filter((s) => s !== size));
    }
  };

  return (
    <Form>
      {/* Other form items */}
      <Form.Item label="Size">
        {defaultSizes.map((size) => (
          <Checkbox
            key={size}
            checked={sizes.includes(size)}
            onChange={(e) => handleSizeChange(size, e.target.checked)}
          >
            {size}
          </Checkbox>
        ))}
      </Form.Item>
      {sizes.map((size) => (
        <Form.Item key={size} label={`${size} quantity`}>
          <InputNumber min={0} />
        </Form.Item>
      ))}
    </Form>
  );
};

export default UserManagement ;


//UserManagement