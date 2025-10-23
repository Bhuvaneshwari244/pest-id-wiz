-- Detection history table is already created, just verify RLS is enabled
ALTER TABLE detection_history ENABLE ROW LEVEL SECURITY;