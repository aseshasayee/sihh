-- Storage buckets for file uploads
INSERT INTO storage.buckets (id, name, public) VALUES ('task-images', 'task-images', true);
INSERT INTO storage.buckets (id, name, public) VALUES ('profile-avatars', 'profile-avatars', true);
INSERT INTO storage.buckets (id, name, public) VALUES ('school-logos', 'school-logos', true);

-- Storage policies for task images
CREATE POLICY "Users can upload task images" ON storage.objects
  FOR INSERT WITH CHECK (bucket_id = 'task-images' AND auth.role() = 'authenticated');

CREATE POLICY "Users can view task images" ON storage.objects
  FOR SELECT USING (bucket_id = 'task-images');

CREATE POLICY "Users can update their own task images" ON storage.objects
  FOR UPDATE USING (bucket_id = 'task-images' AND auth.uid()::text = owner::text);

CREATE POLICY "Users can delete their own task images" ON storage.objects
  FOR DELETE USING (bucket_id = 'task-images' AND auth.uid()::text = owner::text);

-- Storage policies for profile avatars
CREATE POLICY "Users can upload profile avatars" ON storage.objects
  FOR INSERT WITH CHECK (bucket_id = 'profile-avatars' AND auth.role() = 'authenticated');

CREATE POLICY "Anyone can view profile avatars" ON storage.objects
  FOR SELECT USING (bucket_id = 'profile-avatars');

CREATE POLICY "Users can update their own avatars" ON storage.objects
  FOR UPDATE USING (bucket_id = 'profile-avatars' AND auth.uid()::text = owner::text);

-- Storage policies for school logos
CREATE POLICY "Teachers can upload school logos" ON storage.objects
  FOR INSERT WITH CHECK (bucket_id = 'school-logos' AND auth.role() = 'authenticated');

CREATE POLICY "Anyone can view school logos" ON storage.objects
  FOR SELECT USING (bucket_id = 'school-logos');
