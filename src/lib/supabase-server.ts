import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

// Cliente para uso no servidor (com permissões totais)
export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey)