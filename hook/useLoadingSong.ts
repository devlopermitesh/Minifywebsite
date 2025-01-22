import { Songs } from "@/types_db";
import { useSupabaseClient } from "@supabase/auth-helpers-react";

export const useLoadingSong=(song:Songs|null):string | null => {
    const supaBaseClient=useSupabaseClient()
if(!song){
return null
}
try {
    const {data}=supaBaseClient.storage.from('songs').getPublicUrl(song.song_path)
    return data.publicUrl
    
} catch (error) {
    console.log(error)
    return null
}

}