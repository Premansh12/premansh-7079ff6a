
CREATE POLICY "Photography files are publicly readable"
ON storage.objects
FOR SELECT
USING (bucket_id = 'photography');
