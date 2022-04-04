

--  This will create an initial user in the "" database
--  The initial user will have user id "admin"
--  The initial user will have password "changeme"

--  This is required to have an 'id' of 1.  There is hard coding in the app for this id of 1.

--  If no GUI for disabling accounts, disable the initial_user using
--    UPDATE user_tbl SET enabled_app_specific = 0 WHERE id = 1;

USE limelight ;


INSERT INTO user_mgmt_user (id, username, email, first_name, last_name, organization, enabled, created_date, global_admin_user) 
VALUES (1, 'admin', 'NONE', 'Admin', 'User', '', 1, NOW(), 1 );

INSERT INTO password_mgmt_user_password (user_id, password_hashed_new)
 VALUES (1, '$2a$13$PBkWfEOd2fHs22ocuDr8BuLZJ/Ngf3FQaNrWvRzb8INimKM7RyThi');
 
INSERT INTO user_tbl (id,user_mgmt_user_id,user_access_level,enabled_app_specific,last_login,last_login_ip)
VALUES ( 1,1,0,1,NOW(),'');

INSERT INTO zz_user_data_mirror_tbl (user_id,username,email,first_name,last_name,organization)
VALUES (1,'admin','NONE','Admin','User','');

