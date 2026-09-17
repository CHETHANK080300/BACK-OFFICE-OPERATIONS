-- CRAM Database Schema (PostgreSQL/Normalized)

-- 1. Risk Parameters Table
CREATE TABLE risk_parameters (
    parameter_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    parameter_name VARCHAR(255) NOT NULL,
    description TEXT,
    risk_level VARCHAR(50) NOT NULL, -- Low, Medium, High, Very High
    score INT NOT NULL CHECK (score >= 0 AND score <= 100),
    status VARCHAR(50) DEFAULT 'Draft', -- Active, Inactive, Pending Approval, Draft
    version INT DEFAULT 1,
    effective_date TIMESTAMP,
    expiry_date TIMESTAMP,
    created_by UUID,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_by UUID,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 2. Risk Weights Table
CREATE TABLE risk_weights (
    weight_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    factor_name VARCHAR(255) NOT NULL,
    weight_percentage DECIMAL(5,2) NOT NULL,
    status VARCHAR(50) DEFAULT 'Active',
    version INT DEFAULT 1,
    last_modified TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 3. Risk Ratings Table
CREATE TABLE risk_ratings (
    rating_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    min_score INT NOT NULL,
    max_score INT NOT NULL,
    rating VARCHAR(50) NOT NULL, -- Low, Medium, High, Very High
    CONSTRAINT valid_range CHECK (min_score < max_score)
);

-- 4. Decision Matrix Table
CREATE TABLE decision_matrix (
    decision_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    rating VARCHAR(50) NOT NULL,
    decision VARCHAR(50) NOT NULL, -- Approve, Review, Reject, Escalate
    advanced_rules JSONB
);

-- 5. Customer Risk Assessments Table
CREATE TABLE customer_risk_assessments (
    assessment_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    customer_id VARCHAR(100) NOT NULL,
    customer_name VARCHAR(255) NOT NULL,
    customer_type VARCHAR(50),
    segment VARCHAR(100),
    industry VARCHAR(100),
    geography VARCHAR(100),
    final_score DECIMAL(5,2),
    rating VARCHAR(50),
    decision VARCHAR(50),
    status VARCHAR(50) DEFAULT 'Completed',
    assessment_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 6. Assessment Breakdown (Normalized child table)
CREATE TABLE assessment_breakdown (
    breakdown_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    assessment_id UUID REFERENCES customer_risk_assessments(assessment_id),
    parameter_name VARCHAR(255),
    score INT,
    weight DECIMAL(5,2),
    weighted_score DECIMAL(5,2)
);

-- 7. Workflows Table
CREATE TABLE workflows (
    workflow_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    module VARCHAR(100) NOT NULL,
    approval_levels INT NOT NULL,
    escalation_time_hours INT,
    status VARCHAR(50) DEFAULT 'Active'
);

-- 8. Workflow Steps
CREATE TABLE workflow_steps (
    step_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    workflow_id UUID REFERENCES workflows(workflow_id),
    level INT NOT NULL,
    approver_role VARCHAR(100) NOT NULL
);

-- 9. Audit Logs Table
CREATE TABLE audit_logs (
    audit_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    user_id UUID,
    user_name VARCHAR(255),
    action VARCHAR(100), -- CREATE, UPDATE, DELETE, APPROVE
    module VARCHAR(100),
    old_value JSONB,
    new_value JSONB,
    ip_address VARCHAR(50),
    session_id VARCHAR(255)
);

-- 10. Roles & Permissions
CREATE TABLE roles (
    role_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    role_name VARCHAR(100) UNIQUE NOT NULL,
    description TEXT,
    permissions JSONB -- Map of module to permission level (Read, Write, Admin)
);
