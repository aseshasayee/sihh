-- Enhanced database schema with indexes and improvements

-- 1. Create ENUM types for better type safety
CREATE TYPE user_role AS ENUM ('student', 'teacher', 'eco-coordinator', 'admin');
CREATE TYPE task_difficulty AS ENUM ('easy', 'medium', 'hard');
CREATE TYPE submission_status AS ENUM ('pending', 'verified', 'rejected');
CREATE TYPE task_status AS ENUM ('active', 'inactive', 'completed');

-- 2. Schools Table (Enhanced)
CREATE TABLE schools (
    school_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    city TEXT,
    region TEXT,
    eco_points INT DEFAULT 0 CHECK (eco_points >= 0),
    contact_email TEXT,
    phone TEXT,
    address TEXT,
    website_url TEXT,
    created_at TIMESTAMP DEFAULT now(),
    updated_at TIMESTAMP DEFAULT now()
);

-- 3. Teachers Table (Enhanced)
CREATE TABLE teachers (
    teacher_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    school_id UUID REFERENCES schools(school_id) ON DELETE CASCADE,
    role user_role DEFAULT 'teacher',
    phone TEXT,
    department TEXT,
    bio TEXT,
    avatar_url TEXT,
    is_verified BOOLEAN DEFAULT false,
    created_at TIMESTAMP DEFAULT now(),
    updated_at TIMESTAMP DEFAULT now()
);

-- 4. Students Table (Enhanced)
CREATE TABLE students (
    student_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    school_id UUID REFERENCES schools(school_id) ON DELETE CASCADE,
    grade_level TEXT,
    eco_points INT DEFAULT 0 CHECK (eco_points >= 0),
    streak_count INT DEFAULT 0 CHECK (streak_count >= 0),
    longest_streak INT DEFAULT 0 CHECK (longest_streak >= 0),
    power_ups JSONB DEFAULT '{}',
    avatar_url TEXT,
    bio TEXT,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT now(),
    updated_at TIMESTAMP DEFAULT now()
);

-- 5. Badges Table (Enhanced)
CREATE TABLE badges (
    badge_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL UNIQUE,
    description TEXT,
    icon_url TEXT,
    criteria JSONB,
    points_required INT DEFAULT 0,
    is_active BOOLEAN DEFAULT true,
    rarity TEXT DEFAULT 'common', -- common, rare, epic, legendary
    created_at TIMESTAMP DEFAULT now()
);

-- 6. Student_Badges Table
CREATE TABLE student_badges (
    student_id UUID REFERENCES students(student_id) ON DELETE CASCADE,
    badge_id UUID REFERENCES badges(badge_id) ON DELETE CASCADE,
    unlocked_at TIMESTAMP DEFAULT now(),
    PRIMARY KEY (student_id, badge_id)
);

-- 7. Daily Tasks Table (Enhanced)
CREATE TABLE daily_tasks (
    task_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    description TEXT,
    instructions TEXT,
    eco_points INT NOT NULL CHECK (eco_points > 0),
    difficulty_level task_difficulty DEFAULT 'easy',
    category TEXT, -- waste-reduction, energy-saving, transportation, etc.
    requires_photo BOOLEAN DEFAULT false,
    requires_location BOOLEAN DEFAULT false,
    max_submissions_per_day INT DEFAULT 1,
    valid_from DATE DEFAULT CURRENT_DATE,
    valid_to DATE,
    is_active BOOLEAN DEFAULT true,
    created_by UUID REFERENCES teachers(teacher_id) ON DELETE SET NULL,
    created_at TIMESTAMP DEFAULT now(),
    updated_at TIMESTAMP DEFAULT now()
);

-- 8. School-Specific Tasks Table
CREATE TABLE school_tasks (
    school_task_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    school_id UUID REFERENCES schools(school_id) ON DELETE CASCADE,
    task_id UUID REFERENCES daily_tasks(task_id) ON DELETE CASCADE,
    assigned_by UUID REFERENCES teachers(teacher_id) ON DELETE SET NULL,
    status task_status DEFAULT 'active',
    deadline DATE,
    bonus_points INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT now(),
    UNIQUE(school_id, task_id)
);

-- 9. Submissions Table (Enhanced)
CREATE TABLE submissions (
    submission_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    student_id UUID REFERENCES students(student_id) ON DELETE CASCADE,
    task_id UUID REFERENCES daily_tasks(task_id) ON DELETE CASCADE,
    status submission_status DEFAULT 'pending',
    points_awarded INT DEFAULT 0 CHECK (points_awarded >= 0),
    feedback TEXT,
    verified_by UUID REFERENCES teachers(teacher_id) ON DELETE SET NULL,
    verified_at TIMESTAMP,
    submission_notes TEXT,
    submitted_at TIMESTAMP DEFAULT now(),
    updated_at TIMESTAMP DEFAULT now()
);

-- 10. IRL Task Images Table (Enhanced)
CREATE TABLE irl_task_images (
    image_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    submission_id UUID REFERENCES submissions(submission_id) ON DELETE CASCADE,
    image_url TEXT NOT NULL,
    thumbnail_url TEXT,
    gps_coordinates POINT, -- PostGIS point type for better geo queries
    location_name TEXT,
    file_size INT,
    mime_type TEXT,
    uploaded_at TIMESTAMP DEFAULT now()
);

-- 11. Quiz Table (Enhanced)
CREATE TABLE quizzes (
    quiz_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    description TEXT,
    questions JSONB NOT NULL,
    points INT DEFAULT 0 CHECK (points >= 0),
    time_limit_minutes INT,
    difficulty_level task_difficulty DEFAULT 'easy',
    category TEXT,
    is_active BOOLEAN DEFAULT true,
    created_by UUID REFERENCES teachers(teacher_id) ON DELETE SET NULL,
    created_at TIMESTAMP DEFAULT now(),
    updated_at TIMESTAMP DEFAULT now()
);

-- 12. Quiz Attempts Table (New)
CREATE TABLE quiz_attempts (
    attempt_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    student_id UUID REFERENCES students(student_id) ON DELETE CASCADE,
    quiz_id UUID REFERENCES quizzes(quiz_id) ON DELETE CASCADE,
    answers JSONB NOT NULL,
    score INT DEFAULT 0,
    points_earned INT DEFAULT 0,
    started_at TIMESTAMP DEFAULT now(),
    completed_at TIMESTAMP,
    time_taken_minutes INT
);

-- 13. Student Activity Log (New)
CREATE TABLE student_activity_log (
    log_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    student_id UUID REFERENCES students(student_id) ON DELETE CASCADE,
    activity_type TEXT NOT NULL, -- task_completed, badge_earned, quiz_taken, etc.
    activity_data JSONB,
    points_earned INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT now()
);

-- 14. School Statistics View
CREATE VIEW school_stats AS
SELECT 
    s.school_id,
    s.name,
    s.eco_points,
    COUNT(DISTINCT st.student_id) as total_students,
    COUNT(DISTINCT t.teacher_id) as total_teachers,
    COALESCE(SUM(st.eco_points), 0) as total_student_points,
    COUNT(DISTINCT sub.submission_id) as total_submissions
FROM schools s
LEFT JOIN students st ON s.school_id = st.school_id
LEFT JOIN teachers t ON s.school_id = t.school_id
LEFT JOIN submissions sub ON st.student_id = sub.student_id
GROUP BY s.school_id, s.name, s.eco_points;

-- INDEXES for better performance
CREATE INDEX idx_students_school_id ON students(school_id);
CREATE INDEX idx_students_eco_points ON students(eco_points DESC);
CREATE INDEX idx_teachers_school_id ON teachers(school_id);
CREATE INDEX idx_submissions_student_id ON submissions(student_id);
CREATE INDEX idx_submissions_task_id ON submissions(task_id);
CREATE INDEX idx_submissions_status ON submissions(status);
CREATE INDEX idx_submissions_submitted_at ON submissions(submitted_at DESC);
CREATE INDEX idx_daily_tasks_valid_dates ON daily_tasks(valid_from, valid_to);
CREATE INDEX idx_daily_tasks_category ON daily_tasks(category);
CREATE INDEX idx_school_tasks_school_id ON school_tasks(school_id);
CREATE INDEX idx_student_badges_student_id ON student_badges(student_id);
CREATE INDEX idx_student_activity_log_student_id ON student_activity_log(student_id);
CREATE INDEX idx_student_activity_log_created_at ON student_activity_log(created_at DESC);

-- TRIGGERS for updated_at timestamps
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_schools_updated_at BEFORE UPDATE ON schools
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_teachers_updated_at BEFORE UPDATE ON teachers
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_students_updated_at BEFORE UPDATE ON students
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_daily_tasks_updated_at BEFORE UPDATE ON daily_tasks
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_submissions_updated_at BEFORE UPDATE ON submissions
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_quizzes_updated_at BEFORE UPDATE ON quizzes
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- RLS (Row Level Security) Policies
ALTER TABLE students ENABLE ROW LEVEL SECURITY;
ALTER TABLE teachers ENABLE ROW LEVEL SECURITY;
ALTER TABLE submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE irl_task_images ENABLE ROW LEVEL SECURITY;

-- Students can only see their own data
CREATE POLICY "Students can view own profile" ON students
    FOR SELECT USING (auth.uid()::text = student_id::text);

CREATE POLICY "Students can update own profile" ON students
    FOR UPDATE USING (auth.uid()::text = student_id::text);

-- Teachers can see students from their school
CREATE POLICY "Teachers can view school students" ON students
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM teachers 
            WHERE teacher_id::text = auth.uid()::text 
            AND teachers.school_id = students.school_id
        )
    );

-- Students can only see their own submissions
CREATE POLICY "Students can view own submissions" ON submissions
    FOR SELECT USING (auth.uid()::text = student_id::text);

CREATE POLICY "Students can create own submissions" ON submissions
    FOR INSERT WITH CHECK (auth.uid()::text = student_id::text);

-- Sample data for badges
INSERT INTO badges (name, description, icon_url, criteria, points_required, rarity) VALUES
('First Steps', 'Complete your first eco-task', '/badges/first-steps.svg', '{"tasks_completed": 1}', 0, 'common'),
('Eco Warrior', 'Earn 100 eco-points', '/badges/eco-warrior.svg', '{"eco_points": 100}', 100, 'common'),
('Green Streak', 'Complete tasks for 7 consecutive days', '/badges/green-streak.svg', '{"streak_days": 7}', 0, 'rare'),
('Tree Hugger', 'Complete 10 tree-related tasks', '/badges/tree-hugger.svg', '{"tree_tasks": 10}', 0, 'rare'),
('Recycling Champion', 'Complete 25 recycling tasks', '/badges/recycling-champion.svg', '{"recycling_tasks": 25}', 0, 'epic'),
('Carbon Neutral', 'Earn 1000 eco-points', '/badges/carbon-neutral.svg', '{"eco_points": 1000}', 1000, 'epic'),
('Planet Protector', 'Complete 100 tasks', '/badges/planet-protector.svg', '{"tasks_completed": 100}', 0, 'legendary');

-- Sample daily tasks
INSERT INTO daily_tasks (title, description, instructions, eco_points, difficulty_level, category, requires_photo) VALUES
('Use Reusable Water Bottle', 'Replace single-use plastic bottles with a reusable one', 'Take a photo of you using your reusable water bottle today', 10, 'easy', 'waste-reduction', true),
('Take Public Transport', 'Use public transportation instead of private vehicle', 'Share your public transport ticket or take a photo', 15, 'easy', 'transportation', true),
('Plant a Seed', 'Plant a seed or sapling in your garden or a pot', 'Document the planting process with photos', 25, 'medium', 'biodiversity', true),
('Recycle Plastic Waste', 'Properly sort and recycle plastic waste', 'Take a photo of your sorted recyclables', 20, 'easy', 'waste-reduction', true),
('Save Electricity', 'Turn off unused lights and electronics for 2+ hours', 'Take a photo showing lights/devices turned off', 15, 'easy', 'energy-saving', true),
('Compost Organic Waste', 'Start or contribute to a compost bin', 'Show your compost setup or organic waste collection', 30, 'medium', 'waste-reduction', true),
('Walk or Bike Instead', 'Choose walking or cycling over motorized transport', 'Track your route or take a photo of your bike/walk', 20, 'medium', 'transportation', true),
('Reduce Water Usage', 'Take shorter showers and fix leaky taps', 'Document your water-saving efforts', 15, 'easy', 'water-conservation', false),
('Create Eco-Art', 'Make art using recycled materials', 'Share photos of your eco-friendly artwork', 25, 'medium', 'creativity', true),
('Organize Community Cleanup', 'Lead or participate in a local cleanup drive', 'Document the cleanup activity with before/after photos', 50, 'hard', 'community', true);
