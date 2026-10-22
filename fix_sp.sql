DROP PROCEDURE IF EXISTS sp_payment_orders_create;
DELIMITER //
CREATE PROCEDURE sp_payment_orders_create(
    IN _user_id INT,
    IN _course_id INT,
    IN _order_number VARCHAR(100),
    IN _gateway_order_id VARCHAR(100),
    IN _amount DECIMAL(10,2),
    IN _currency VARCHAR(3)
)
BEGIN
    INSERT INTO payment_orders (users_id, course_id, order_number, gateway_order_id, amount, currency)
    VALUES (_user_id, _course_id, _order_number, _gateway_order_id, _amount, _currency);
    SELECT 1 AS success, 'Payment order created successfully' AS message, LAST_INSERT_ID() AS order_id;
END //
DELIMITER ;
