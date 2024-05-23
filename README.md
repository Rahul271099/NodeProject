CREATE DATABASE customer_db;

USE customer_db;

drop database customer_db;
drop table CustomerDetails;



CREATE TABLE CustomerDetails (
    CustomerID INT AUTO_INCREMENT PRIMARY KEY,
    FirstName VARCHAR(50),
    LastName VARCHAR(50),
    Email VARCHAR(100),
    MobileNumber VARCHAR(15),
    Address VARCHAR(255),
    Pincode VARCHAR(10)
);

DELIMITER //

CREATE PROCEDURE InsertCustomer(
    IN firstName VARCHAR(50),
    IN lastName VARCHAR(50),
    IN myemail VARCHAR(100),
    IN mymobileNumber VARCHAR(15),
    IN address VARCHAR(255),
    IN pincode VARCHAR(10)
)
BEGIN
    DECLARE userExists INT DEFAULT 0;
    DECLARE status INT DEFAULT 0;
    DECLARE message VARCHAR(255) DEFAULT '';

    -- Check if user already exists
    SELECT COUNT(*) INTO userExists
    FROM CustomerDetails
    WHERE Email = myemail OR MobileNumber = mymobileNumber;

    IF userExists > 0 THEN
        SET status = 0;
        SET message = 'User with this email or mobile number already exists.';
    ELSE
        -- Insert new customer
        INSERT INTO CustomerDetails (FirstName, LastName, Email, MobileNumber, Address, Pincode)
        VALUES (firstName, lastName, myemail, mymobileNumber, address, pincode);
        SET status = 1;
        SET message = 'Customer details inserted successfully';
    END IF;

    -- Return status and message
    SELECT status AS status, message AS message;
END //

DELIMITER ;


SHOW PROCEDURE STATUS WHERE Name = 'InsertCustomer';

CALL InsertCustomer('John', 'Doe', 'john.doe@example.com', '+1234567890', '123 Elm Street', '123456');
CALL checkUserExsists('john2.doe@example.com', '+1238567890');



