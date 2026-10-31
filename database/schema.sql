CREATE DATABASE IF NOT EXISTS priyojit_central_admin CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE priyojit_central_admin;
CREATE TABLE IF NOT EXISTS admins (
 id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(120) NOT NULL, email VARCHAR(190) NOT NULL UNIQUE,
 password_hash VARCHAR(255) NOT NULL, role ENUM('owner','admin','viewer') NOT NULL DEFAULT 'owner',
 is_active BOOLEAN NOT NULL DEFAULT TRUE, created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE IF NOT EXISTS projects (
 id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(150) NOT NULL, slug VARCHAR(120) NOT NULL UNIQUE,
 category VARCHAR(80) NOT NULL DEFAULT 'Web App', description TEXT, frontend_url VARCHAR(500),
 api_base_url VARCHAR(500), status ENUM('planned','development','connected','maintenance') NOT NULL DEFAULT 'planned',
 integration_key_hash VARCHAR(255), created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
 updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
CREATE TABLE IF NOT EXISTS audit_logs (
 id BIGINT AUTO_INCREMENT PRIMARY KEY, admin_id INT, action VARCHAR(120) NOT NULL,
 details TEXT, ip_address VARCHAR(64), created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
 FOREIGN KEY(admin_id) REFERENCES admins(id) ON DELETE SET NULL
);
CREATE TABLE IF NOT EXISTS project_events (
 id BIGINT AUTO_INCREMENT PRIMARY KEY, project_id INT NOT NULL, event_type VARCHAR(100) NOT NULL,
 payload JSON, created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
 FOREIGN KEY(project_id) REFERENCES projects(id) ON DELETE CASCADE
);
CREATE TABLE IF NOT EXISTS app_users (
 id BIGINT AUTO_INCREMENT PRIMARY KEY, project_id INT NOT NULL, external_user_id VARCHAR(190),
 name VARCHAR(150), email VARCHAR(190), status VARCHAR(40) DEFAULT 'active',
 metadata JSON, last_seen_at DATETIME, created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
 UNIQUE KEY project_external_user (project_id, external_user_id),
 FOREIGN KEY(project_id) REFERENCES projects(id) ON DELETE CASCADE
);
