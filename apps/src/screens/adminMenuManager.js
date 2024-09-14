import React, { useState, useEffect } from "react";
import AdminHeader from "../components/adminHeader";
import { Table, Button, Modal, Select, Input } from "antd";
import "./../styles/screens/adminHomeScreen.css";
const { Option } = Select;
const AdminMenuManagerScreen = () => {
    const [allMenu, setAllMenu] = useState([]);
    // trạng thái modal edit
    const [isModalVisible, setIsModalVisible] = useState(false);
    // item hiện tại đang được chọn để edit
    const [editingItem, setEditingItem] = useState(null);
    // các giá trị của form edit
    const [editedValues, setEditedValues] = useState({
		name: "",
		type: "",
		price: "",
	});
    const columns = [
        {
            title: "Item ID",
            dataIndex: "item_id",
            key: "item_id",
        },
        {
            title: "Item Name",
            dataIndex: "item_name",
            key: "item_name",
        },
        {
            title: "Type",
            dataIndex: "type",
            key: "type",
        },
        
        {
            title: "Price",
            dataIndex: "price",
            key: "price",
            render: (price) => new Intl.NumberFormat("vi-VN").format(price),
        },
        {
            title: "Action",
            key: "action",
            render: (_, record) => (
                <Button type="primary" onClick={() => {showEditModal(record)}}>
                    Edit
                </Button>
            )
        }
    ];
    useEffect(() => {
        const fetchMenu = async () => {
            const response = await fetch(
				"http://localhost:8080/menu/listMenu", 
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
                    },
                }
            );
            const data = await response.json();
            setAllMenu(data.data);
			
        };
        fetchMenu();
    }, []);
    const showEditModal = (item) =>{
        setEditingItem(item);
        setEditedValues({
            name: item.item_name,
            type: item.type,
            price: item.price,
        });
        setIsModalVisible(true);
    }
    const handleCancel = () => {
        setIsModalVisible(false);
    }
    const handleOk = async () => {
        setIsModalVisible(false);
    }
 const handleInputChange = (e) => {
    console.log(`target`,e.target)
		setEditedValues({ ...editedValues, [e.target.name]: e.target.value });
 };

	return (
		<div className="admin-menu-screen">
			<AdminHeader label="menuManager" />
			<Table
				dataSource={allMenu}
				columns={columns}
				rowKey="item_id"
				pagination={{ pageSize: 8 }}
			/>
			<Modal
				title="Edit Menu Item"
				open={isModalVisible}
				onCancel={handleCancel}
				onOk={handleOk}
			>
				<div>
					<label>Item Name:</label>
					<Input name="name" value={editedValues.name} onChange={handleInputChange} />
				</div>
				<div style={{ marginTop: 10 }}>
					<label>Type:</label>
					<Select value={editedValues.type} style={{ width: "100%" }}>
						<Option value="drink">Đồ uống</Option>
						<Option value="food-nuong">Đồ nướng than hoa</Option>
						<Option value="food-lau">Lẩu thái Tomyum</Option>
					</Select>
				</div>
				<div style={{ marginTop: 10 }}>
					<label>Price:</label>
					<Input
						name="price"
						type="number"
						value={editedValues.price}
						onChange={handleInputChange}
					/>
				</div>
			</Modal>
		</div>
	);
};
export default AdminMenuManagerScreen;
