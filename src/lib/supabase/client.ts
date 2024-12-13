import { createClient } from '@supabase/supabase-js';
import { PUBLIC_SUPABASE_ANON_KEY } from '$env/static/public';
export const supabase = createClient(
  'https://pcdtmlvcxmrzdlvlrxye.supabase.co',
  PUBLIC_SUPABASE_ANON_KEY
);
