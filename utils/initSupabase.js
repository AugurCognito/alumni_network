import { createClient } from '@supabase/supabase-js'

export const supabase = createClient(
    'https://hhwsjrpyfypmiacusavr.supabase.co',
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imhod3NqcnB5ZnlwbWlhY3VzYXZyIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjQxODExNTIsImV4cCI6MTk3OTc1NzE1Mn0.YRRmIkAoTCIWObmTGJOSmwWKFPEB935OkYV_2cGvITo'
    )