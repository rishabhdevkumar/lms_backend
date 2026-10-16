-- =====================================================================
-- BATCHES STORED PROCEDURES
-- Table: batches (id, batch_code, course_id, users_id, start_date, end_date, start_time, end_time, room, status, created_at, updated_at)
-- Table: batch_students (id, batches_id, users_id, enrolled_at)
-- =====================================================================

-- ---------------------------------------------------------------------
-- 1. sp_batches_add
-- ---------------------------------------------------------------------
DROP PROCEDURE IF EXISTS sp_batches_add;
DELIMITER $$
CREATE PROCEDURE sp_batches_add(
    IN _course_id INT,
    IN _users_id INT,
    IN _start_date DATE,
    IN _end_date DATE,
    IN _start_time TIME,
    IN _end_time TIME,
    IN _room VARCHAR(45),
    IN _status VARCHAR(20)
)
BEGIN
    DECLARE _batch_code VARCHAR(45);
    DECLARE _next_code INT DEFAULT 1;

    -- Default status to 'upcoming' if null or blank
    IF _status IS NULL OR TRIM(_status) = '' THEN
        SET _status = 'upcoming';
    END IF;

    IF NOT EXISTS (
        SELECT 1 FROM `course`
        WHERE `id` = _course_id
    ) THEN
        SELECT FALSE AS ok,
               'Course not found' AS msg;

    ELSEIF NOT EXISTS (
        SELECT 1 FROM `users`
        WHERE `id` = _users_id
          AND `role` = 'faculty'
    ) THEN
        SELECT FALSE AS ok,
               'Valid faculty instructor not found' AS msg;

    ELSEIF _start_date IS NOT NULL
       AND _end_date IS NOT NULL
       AND _end_date < _start_date THEN
        SELECT FALSE AS ok,
               'End date cannot be before start date' AS msg;

    ELSEIF _start_time IS NOT NULL
       AND _end_time IS NOT NULL
       AND _end_time <= _start_time THEN
        SELECT FALSE AS ok,
               'End time must be after start time' AS msg;

    ELSEIF _status NOT IN ('active', 'upcoming', 'completed') THEN
        SELECT FALSE AS ok,
               'Invalid batch status. Must be active, upcoming, or completed' AS msg;

    ELSE
        -- Auto-generate batch code BAT001, BAT002, etc.
        SELECT COALESCE(
            MAX(CAST(SUBSTRING(batch_code, 4) AS UNSIGNED)),
            0
        ) + 1
        INTO _next_code
        FROM `batches`
        WHERE batch_code REGEXP '^BAT[0-9]+$';

        SET _batch_code = CONCAT(
            'BAT',
            LPAD(_next_code, 3, '0')
        );

        INSERT INTO `batches` (
            batch_code,
            course_id,
            users_id,
            start_date,
            end_date,
            start_time,
            end_time,
            room,
            status,
            created_at,
            updated_at
        )
        VALUES (
            _batch_code,
            _course_id,
            _users_id,
            _start_date,
            _end_date,
            _start_time,
            _end_time,
            _room,
            _status,
            NOW(),
            NOW()
        );

        SELECT TRUE AS ok,
               'Batch created successfully' AS msg,
               JSON_OBJECT(
                   'id', LAST_INSERT_ID(),
                   'batch_code', _batch_code,
                   'course_id', _course_id,
                   'users_id', _users_id,
                   'start_date', _start_date,
                   'end_date', _end_date,
                   'start_time', _start_time,
                   'end_time', _end_time,
                   'room', _room,
                   'status', _status
               ) AS data;
    END IF;
END$$
DELIMITER ;


-- ---------------------------------------------------------------------
-- 2. sp_batches_update
-- ---------------------------------------------------------------------
DROP PROCEDURE IF EXISTS sp_batches_update;
DELIMITER $$
CREATE PROCEDURE sp_batches_update(
    IN _id INT,
    IN _batch_code VARCHAR(45),
    IN _course_id INT,
    IN _users_id INT,
    IN _start_date DATE,
    IN _end_date DATE,
    IN _start_time TIME,
    IN _end_time TIME,
    IN _room VARCHAR(45),
    IN _status VARCHAR(20)
)
BEGIN
    DECLARE _existing_code VARCHAR(45);

    IF NOT EXISTS (
        SELECT 1 FROM `batches` WHERE `id` = _id
    ) THEN
        SELECT FALSE AS ok,
               'Batch not found' AS msg;

    ELSEIF _batch_code IS NOT NULL AND TRIM(_batch_code) <> '' AND EXISTS (
        SELECT 1 FROM `batches`
        WHERE `batch_code` = _batch_code
          AND `id` <> _id
    ) THEN
        SELECT FALSE AS ok,
               'Batch code already exists' AS msg;

    ELSEIF NOT EXISTS (
        SELECT 1 FROM `course`
        WHERE `id` = _course_id
    ) THEN
        SELECT FALSE AS ok,
               'Course not found' AS msg;

    ELSEIF NOT EXISTS (
        SELECT 1 FROM `users`
        WHERE `id` = _users_id
          AND `role` = 'faculty'
    ) THEN
        SELECT FALSE AS ok,
               'Valid faculty instructor not found' AS msg;

    ELSEIF _start_date IS NOT NULL
       AND _end_date IS NOT NULL
       AND _end_date < _start_date THEN
        SELECT FALSE AS ok,
               'End date cannot be before start date' AS msg;

    ELSEIF _start_time IS NOT NULL
       AND _end_time IS NOT NULL
       AND _end_time <= _start_time THEN
        SELECT FALSE AS ok,
               'End time must be after start time' AS msg;

    ELSEIF _status NOT IN ('active', 'upcoming', 'completed') THEN
        SELECT FALSE AS ok,
               'Invalid batch status. Must be active, upcoming, or completed' AS msg;

    ELSE
        SELECT `batch_code` INTO _existing_code FROM `batches` WHERE `id` = _id;

        UPDATE `batches`
        SET
            `batch_code` = COALESCE(NULLIF(TRIM(_batch_code), ''), _existing_code),
            `course_id` = _course_id,
            `users_id` = _users_id,
            `start_date` = _start_date,
            `end_date` = _end_date,
            `start_time` = _start_time,
            `end_time` = _end_time,
            `room` = _room,
            `status` = _status,
            `updated_at` = NOW()
        WHERE `id` = _id;

        SELECT TRUE AS ok,
               'Batch updated successfully' AS msg;
    END IF;
END$$
DELIMITER ;


-- ---------------------------------------------------------------------
-- 3. sp_batches_remove_student
-- ---------------------------------------------------------------------
DROP PROCEDURE IF EXISTS sp_batches_remove_student;
DELIMITER $$
CREATE PROCEDURE sp_batches_remove_student(
    IN _batch_id INT,
    IN _users_id INT
)
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM `batches`
        WHERE `id` = _batch_id
    ) THEN
        SELECT FALSE AS ok,
               'Batch not found' AS msg;

    ELSEIF NOT EXISTS (
        SELECT 1 FROM `users`
        WHERE `id` = _users_id
          AND `role` = 'student'
    ) THEN
        SELECT FALSE AS ok,
               'Student not found' AS msg;

    ELSEIF NOT EXISTS (
        SELECT 1 FROM `batch_students`
        WHERE `batches_id` = _batch_id
          AND `users_id` = _users_id
    ) THEN
        SELECT FALSE AS ok,
               'Student is not enrolled in this batch' AS msg;

    ELSE
        DELETE FROM `batch_students`
        WHERE `batches_id` = _batch_id
          AND `users_id` = _users_id;

        SELECT TRUE AS ok,
               'Student removed from batch successfully' AS msg;
    END IF;
END$$
DELIMITER ;


-- ---------------------------------------------------------------------
-- 4. sp_batches_delete
-- ---------------------------------------------------------------------
DROP PROCEDURE IF EXISTS sp_batches_delete;
DELIMITER $$
CREATE PROCEDURE sp_batches_delete(
    IN _id INT
)
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM `batches`
        WHERE `id` = _id
    ) THEN
        SELECT FALSE AS ok,
               'Batch not found' AS msg;

    ELSEIF EXISTS (
        SELECT 1 FROM `batch_students`
        WHERE `batches_id` = _id
    ) THEN
        SELECT FALSE AS ok,
               'Cannot delete batch because students are enrolled. Remove students first.' AS msg;

    ELSE
        DELETE FROM `batches`
        WHERE `id` = _id;

        SELECT TRUE AS ok,
               'Batch deleted successfully' AS msg;
    END IF;
END$$
DELIMITER ;


-- ---------------------------------------------------------------------
-- 5. sp_batch_students_add
-- ---------------------------------------------------------------------
DROP PROCEDURE IF EXISTS sp_batch_students_add;
DELIMITER $$
CREATE PROCEDURE sp_batch_students_add(
    IN _batch_id INT,
    IN _users_id INT
)
BEGIN
    IF NOT EXISTS (
        SELECT 1
        FROM `batches`
        WHERE `id` = _batch_id
    ) THEN
        SELECT FALSE AS ok,
               'Batch not found' AS msg;

    ELSEIF NOT EXISTS (
        SELECT 1
        FROM `users`
        WHERE `id` = _users_id
          AND `role` = 'student'
    ) THEN
        SELECT FALSE AS ok,
               'Student not found' AS msg;

    ELSEIF EXISTS (
        SELECT 1
        FROM `batch_students`
        WHERE `batches_id` = _batch_id
          AND `users_id` = _users_id
    ) THEN
        SELECT FALSE AS ok,
               'Student is already enrolled in this batch' AS msg;
    ELSE
        INSERT INTO `batch_students` (
            batches_id,
            users_id,
            enrolled_at
        )
        VALUES (
            _batch_id,
            _users_id,
            NOW()
        );

        SELECT TRUE AS ok,
               'Student enrolled successfully' AS msg,
               JSON_OBJECT(
                   'id', LAST_INSERT_ID(),
                   'batch_id', _batch_id,
                   'users_id', _users_id
               ) AS data;
    END IF;
END$$
DELIMITER ;


-- ---------------------------------------------------------------------
-- 6. sp_batches_getall
-- ---------------------------------------------------------------------
DROP PROCEDURE IF EXISTS sp_batches_getall;
DELIMITER $$
CREATE PROCEDURE sp_batches_getall()
BEGIN
    SELECT 
        b.id,
        b.batch_code,
        b.course_id,
        c.course_name,
        c.short_name AS course_short_name,
        b.users_id,
        u.name AS instructor_name,
        u.email AS instructor_email,
        u.phone AS instructor_phone,
        b.start_date,
        b.end_date,
        b.start_time,
        b.end_time,
        b.room,
        b.status,
        b.created_at,
        b.updated_at,
        COUNT(bs.id) AS enrolled_students_count
    FROM `batches` b
    LEFT JOIN `course` c ON b.course_id = c.id
    LEFT JOIN `users` u ON b.users_id = u.id
    LEFT JOIN `batch_students` bs ON b.id = bs.batches_id
    GROUP BY b.id
    ORDER BY b.id DESC;
END$$
DELIMITER ;


-- ---------------------------------------------------------------------
-- 7. sp_batches_get_by_id
-- ---------------------------------------------------------------------
DROP PROCEDURE IF EXISTS sp_batches_get_by_id;
DELIMITER $$
CREATE PROCEDURE sp_batches_get_by_id(
    IN _id INT
)
BEGIN
    SELECT 
        b.id,
        b.batch_code,
        b.course_id,
        c.course_name,
        c.short_name AS course_short_name,
        b.users_id,
        u.name AS instructor_name,
        u.email AS instructor_email,
        u.phone AS instructor_phone,
        b.start_date,
        b.end_date,
        b.start_time,
        b.end_time,
        b.room,
        b.status,
        b.created_at,
        b.updated_at,
        COUNT(bs.id) AS enrolled_students_count
    FROM `batches` b
    LEFT JOIN `course` c ON b.course_id = c.id
    LEFT JOIN `users` u ON b.users_id = u.id
    LEFT JOIN `batch_students` bs ON b.id = bs.batches_id
    WHERE b.id = _id
    GROUP BY b.id;
END$$
DELIMITER ;


-- ---------------------------------------------------------------------
-- 8. sp_batches_get_students
-- ---------------------------------------------------------------------
DROP PROCEDURE IF EXISTS sp_batches_get_students;
DELIMITER $$
CREATE PROCEDURE sp_batches_get_students(
    IN _batch_id INT
)
BEGIN
    SELECT 
        bs.id AS enrollment_id,
        bs.batches_id AS batch_id,
        bs.enrolled_at,
        u.id AS user_id,
        u.roll_no,
        u.name,
        u.email,
        u.phone,
        u.gender,
        u.status AS student_status
    FROM `batch_students` bs
    JOIN `users` u ON bs.users_id = u.id
    WHERE bs.batches_id = _batch_id
    ORDER BY u.name ASC;
END$$
DELIMITER ;
