-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create schools table
CREATE TABLE schools (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  address TEXT,
  contact_email VARCHAR(255),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create students table
CREATE TABLE students (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  school_id UUID REFERENCES schools(id),
  full_name VARCHAR(255) NOT NULL,
  grade INTEGER,
  eco_points INTEGER DEFAULT 0,
  streak_days INTEGER DEFAULT 0,
  last_activity_date DATE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create teachers table
CREATE TABLE teachers (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  school_id UUID REFERENCES schools(id),
  full_name VARCHAR(255) NOT NULL,
  subject VARCHAR(255),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create badges table
CREATE TABLE badges (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  icon VARCHAR(50),
  points_required INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create tasks table
CREATE TABLE tasks (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  points INTEGER DEFAULT 0,
  category VARCHAR(100),
  difficulty_level VARCHAR(50),
  is_active BOOLEAN DEFAULT true,
  created_by UUID REFERENCES teachers(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create student_badges table (many-to-many)
CREATE TABLE student_badges (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  student_id UUID REFERENCES students(id) ON DELETE CASCADE,
  badge_id UUID REFERENCES badges(id),
  earned_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(student_id, badge_id)
);

-- Create task_submissions table
CREATE TABLE task_submissions (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  student_id UUID REFERENCES students(id) ON DELETE CASCADE,
  task_id UUID REFERENCES tasks(id),
  submission_text TEXT,
  image_url VARCHAR(500),
  status VARCHAR(50) DEFAULT 'pending',
  points_awarded INTEGER DEFAULT 0,
  reviewed_by UUID REFERENCES teachers(id),
  submitted_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  reviewed_at TIMESTAMP WITH TIME ZONE
);

-- Insert sample schools
INSERT INTO schools (name, address, contact_email) VALUES
('Green Valley High School', '123 Eco Street, Green Valley', 'admin@greenvalley.edu'),
('Eco Academy', '456 Sustainability Ave, Eco City', 'info@ecoacademy.edu'),
('Nature Institute', '789 Forest Road, Natural Town', 'contact@natureinstitute.edu');

-- Insert sample badges
INSERT INTO badges (name, description, icon, points_required) VALUES
('Tree Planter', 'Planted your first tree', '🌱', 50),
('Water Saver', 'Saved 100 liters of water', '💧', 100),
('Recycling Hero', 'Recycled 50 items', '♻️', 150),
('Eco Warrior', 'Completed 10 eco challenges', '🌳', 200),
('Carbon Reducer', 'Reduced carbon footprint significantly', '🌍', 250),
('Green Leader', 'Led a school eco initiative', '🏆', 300);

-- Insert sample tasks
INSERT INTO tasks (title, description, points, category, difficulty_level) VALUES
('Use Reusable Water Bottle', 'Use a reusable water bottle for the entire day', 10, 'Water Conservation', 'Easy'),
('Take Public Transport', 'Use public transportation instead of a car', 15, 'Transportation', 'Easy'),
('Plant a Seed', 'Plant a seed in your garden or a pot', 25, 'Gardening', 'Medium'),
('Recycle Plastic Waste', 'Properly recycle at least 5 plastic items', 20, 'Recycling', 'Easy'),
('Organize Beach Cleanup', 'Organize or participate in a beach cleanup', 50, 'Community', 'Hard'),
('Create Compost Bin', 'Set up a composting system at home', 40, 'Waste Management', 'Medium');

-- Enable Row Level Security (RLS)
ALTER TABLE students ENABLE ROW LEVEL SECURITY;
ALTER TABLE teachers ENABLE ROW LEVEL SECURITY;
ALTER TABLE task_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE student_badges ENABLE ROW LEVEL SECURITY;

-- Create RLS policies
-- Students can only see their own data
CREATE POLICY "Students can view own profile" ON students
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Students can update own profile" ON students
  FOR UPDATE USING (auth.uid() = user_id);

-- Teachers can see students in their school
CREATE POLICY "Teachers can view students in same school" ON students
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM teachers 
      WHERE teachers.user_id = auth.uid() 
      AND teachers.school_id = students.school_id
    )
  );

-- Students can view their own submissions
CREATE POLICY "Students can view own submissions" ON task_submissions
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM students 
      WHERE students.user_id = auth.uid() 
      AND students.id = task_submissions.student_id
    )
  );

-- Students can create their own submissions
CREATE POLICY "Students can create own submissions" ON task_submissions
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM students 
      WHERE students.user_id = auth.uid() 
      AND students.id = task_submissions.student_id
    )
  );

-- Create functions for automatic timestamp updates
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at columns
CREATE TRIGGER update_schools_updated_at BEFORE UPDATE ON schools
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_students_updated_at BEFORE UPDATE ON students
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_teachers_updated_at BEFORE UPDATE ON teachers
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_tasks_updated_at BEFORE UPDATE ON tasks
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
