import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export async function uploadFile(file: File, userId: string) {
    const filePath = `${userId}/${Date.now()}_${file.name}`;
    const { data, error } = await supabase.storage.from('documents').upload(filePath, file);
    if(error){
        throw error
    }

    return data.path;
}