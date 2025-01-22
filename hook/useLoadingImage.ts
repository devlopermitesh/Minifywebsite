import { Songs } from "@/types_db";
import { useSupabaseClient } from "@supabase/auth-helpers-react";

export const useLoadingImage=(song:Songs):string | null => {
    const supaBaseClient=useSupabaseClient()
if(!song){
return null
}
try {
    const {data}=supaBaseClient.storage.from('images').getPublicUrl(song.Image_path)
    return data.publicUrl
    
} catch (error) {
    console.log(error)
    return null
}

}