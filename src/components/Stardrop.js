import React, { useState } from "react";
import { Button, Dropdown, Menu } from "antd";
import styled from "@emotion/styled";
import { BtDown } from "../styles/writelog";
import Star from "./Star";
const items = [
  {
    key: "1",
    label: <Star num={1} />,
  },
  {
    key: "2",
    label: <Star num={2} />,
  },
  {
    key: "3",
    label: <Star num={3} />,
  },
  {
    key: "4",
    label: <Star num={4} />,
  },
  {
    key: "5",
    label: <Star num={5} />,
  },
  {
    key: "6",
    label: <Star num={6} />,
  },
  {
    key: "7",
    label: <Star num={7} />,
  },
  {
    key: "8",
    label: <Star num={8} />,
  },
  {
    key: "9",
    label: <Star num={9} />,
  },
  {
    key: "10",
    label: <Star num={10} />,
  },
];

const Stardrop = ({ onChange, valueStar }) => {
  const [selectedItem, setSelectedItem] = useState(valueStar);

  const handleMenuClick = value => {
    setSelectedItem(value.key);
    onChange(Number(value.key));
  };

  const menu = (
    <Menu onClick={handleMenuClick}>
      {items.map(item => (
        <Menu.Item key={item.key}>{item.label}</Menu.Item>
      ))}
    </Menu>
  );
  return (
    <BtDown>
      <Dropdown
        overlay={menu}
        trigger={["click"]}
        placement="top"
        arrow
        className="custom-dropdown"
      >
        <Button>
          {selectedItem || valueStar ? (
            <Star num={selectedItem || valueStar} />
          ) : (
            "평점"
          )}
        </Button>
      </Dropdown>
    </BtDown>
  );
};
export default Stardrop;
