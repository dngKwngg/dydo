const connection = require("../config/connection");
// {
//     "name" : "Chùa",
//     "address" : "Láng Hạ",
//     "area" : "Láng",
//     "hotline": "0123456890",
//     "opening_month": 12,
//     "opening_year": 2022,
//     "quantity_table": 30

// }
//thêm cơ sở mới
exports.addNewRestaurant = async (req, res) => {
	const {
		name,
		address,
		area,
		hotline,
		opening_month,
		opening_year,
		quantity_table,
	} = req.body;
	function isValidHotline(hotline) {
		for (let i of hotline) {
			if (i < "0" || i > "9") return false;
		}
		return true;
	}
	if (!isValidHotline(hotline) || !(hotline.length === 10)) {
		return res.status(400).json({
			status: "Failed",
			message: "Re-enter hotline",
		});
	}
	if (
		!Number.isInteger(opening_month) ||
		!(opening_month > 0 && opening_month < 13)
	) {
		return res.status(400).json({
			status: "Failed",
			message: "Re-enter opening_month",
		});
	}
	if (!Number.isInteger(opening_year) || !(opening_year > 0)) {
		return res.status(400).json({
			status: "Failed",
			message: "Re-enter opening_year",
		});
	}
    if (!Number.isInteger(quantity_table) || !(quantity_table > 0)) {
		return res.status(400).json({
			status: "Failed",
			message: "Re-enter quantity_table",
		});
	}
	connection.query(
		`INSERT INTO restaurant_centre (name, address, area, hotline, opening_month, opening_year, quantity_table) VALUES (?, ?, ?, ?, ?, ?, ?)`,
		[
			name,
			address,
			area,
			hotline,
			opening_month,
			opening_year,
			quantity_table,
		],
		(err, result, fields) => {
			if (err) {
				return res.status(500).json({
					status: "Failed",
					error: err,
				});
			}
			return res.status(200).json({
				status: "Success",
				message: "Done add new restaurant",
			});
		}
	);
};

//update một cơ sở không còn hoạt động (chỉ admin của cửa hàng tại 1 cơ sở mới đóng cửa được cơ sở đấy)
exports.closeRestaurant = async (req,res) => {
    const centre_id = req.body.centre_id; // sau này sẽ đổi thành req.user
    connection.query(
        `UPDATE restaurant_centre SET active = 0 WHERE centre_id = ?`, [centre_id],
        (err, result, fields)  => {
            if(err) {
                return res.status(400).json({
                    status: "Failed",
                    error: err,
                });
            }
            return res.status(200).json({
                status: "Success",
                message: "Done close this restaurant"
            })
        }
    );
}
