import { createClient } from '@supabase/supabase-js'

export const supabase = createClient(
    'https://oqlgpxasmzovhnvguixz.supabase.co',
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9xbGdweGFzbXpvdmhudmd1aXh6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjM5NTE0NDIsImV4cCI6MTk3OTUyNzQ0Mn0.WxKnZTs4CvKnu9qlaVWKblnOnzLUeqbakREam1AjtQQ'
)