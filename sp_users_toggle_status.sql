DROP PROCEDURE IF EXISTS `sp_users_toggle_status`;

DELIMITER $$

CREATE PROCEDURE `sp_users_toggle_status`(
    IN _user_id INT,
    IN _is_active TINYINT
)
BEGIN
    IF _user_id IS NULL OR _user_id <= 0 THEN
        SELECT 0 AS success,
               0 AS ok,
               'Invalid user ID' AS message,
               'Invalid user ID' AS msg;

    ELSEIF _is_active IS NULL OR _is_active NOT IN (0, 1) THEN
        SELECT 0 AS success,
               0 AS ok,
               'Status must be 0 or 1' AS message,
               'Status must be 0 or 1' AS msg;

    ELSEIF NOT EXISTS (
        SELECT 1
        FROM `users`
        WHERE `id` = _user_id
    ) THEN
        SELECT 0 AS success,
               0 AS ok,
               'User not found' AS message,
               'User not found' AS msg;
    ELSE
        UPDATE `users`
        SET `is_active` = _is_active,
            `status` = CASE WHEN _is_active = 1 THEN 'Active' ELSE 'Deactive' END
        WHERE `id` = _user_id;

        IF _is_active = 0 THEN
            SELECT 1 AS success,
                   1 AS ok,
                   'Account locked successfully' AS message,
                   'Account locked successfully' AS msg;
        ELSE
            SELECT 1 AS success,
                   1 AS ok,
                   'Account activated successfully' AS message,
                   'Account activated successfully' AS msg;
        END IF;
    END IF;
END$$

DELIMITER ;
