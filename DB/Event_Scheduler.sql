CREATE EVENT IF NOT EXISTS products_update
	ON SCHEDULE EVERY 1 DAY
    STARTS '2023-06-12 00:00:00'
	ON COMPLETION PRESERVE ENABLE
	DO
	UPDATE PPAP.PRODUCT 
    SET PRICE = PRICE * 0.98
    WHERE PRODUCT_STATUS = '판매중';
    
CREATE EVENT IF NOT EXISTS status_update
	ON SCHEDULE EVERY 1 DAY
    STARTS '2023-06-12 00:00:00'
	ON COMPLETION PRESERVE ENABLE
	DO
	UPDATE PPAP.PRODUCT 
    SET PRODUCT_STATUS = '반품처리'
    WHERE EXPIRE_DATE < NOW() AND PRODUCT_STATUS = '판매중'; 
    

select * from information_schema.events;