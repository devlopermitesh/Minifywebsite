import { Songs } from '@/types_db'
import React,{ useEffect } from 'react'
import MediaItem from './MediaItem'
import LikeButton from './LikeButton'
import { FaPause, FaPlay } from "react-icons/fa";
import { AiFillForward, AiFillStepBackward, AiFillStepForward } from 'react-icons/ai';
import { FaVolumeXmark } from "react-icons/fa6";
import { IoVolumeHigh } from 'react-icons/io5';
import Slider from './Slider';
import useSound from 'use-sound';
import usePlayer from '@/hook/usePlayer';
import PlayModeButton from './PlayMode';
interface PlayerContentProps {
    Song:Songs,
    keyIndex:string,
    SongUrl:string
}
export enum PlayMode{
    Queue,
    Repeat,
    Shuffle
}
const PlayerContent:React.FC<PlayerContentProps> = ({Song,keyIndex,SongUrl}) => {

    const player=usePlayer(state=>state)
    const [volume,setVolume]=React.useState(1)
    const [isPlaying,setIsPlaying]=React.useState(false)
    const [playMode, setPlayMode] = React.useState<PlayMode>(PlayMode.Queue);
    const Icon=isPlaying?FaPause:FaPlay
    const VolumeIcon=volume===1?IoVolumeHigh:FaVolumeXmark

    const onPlayNext=()=>{
        const currentIndex=player.ids.indexOf(player.activeId!)
        const nextIndex=currentIndex+1
        if(nextIndex>=player.ids.length){
            player.setActiveId(player.ids[0])
        }else{
            player.setActiveId(player.ids[nextIndex])
        }
    }
    const onPlayPrev=()=>{
        const currentIndex=player.ids.indexOf(player.activeId!)
        const prevIndex=currentIndex-1
        if(prevIndex<0){
            player.setActiveId(player.ids[player.ids.length-1])
        }else{
            player.setActiveId(player.ids[prevIndex])
        }
    }
    const [play, { pause, sound }] = useSound(SongUrl, {
        volume,
        onplay: () => setIsPlaying(true),
        onend: () => {
            switch (playMode) {
                case PlayMode.Queue:
                    onPlayNext();
                  setIsPlaying(true);

                    break;
                case PlayMode.Repeat:
                    sound?.play();
                  setIsPlaying(true);

                    break;
                case PlayMode.Shuffle:
                    const randomIndex = Math.floor(Math.random() * player.ids.length);
                    player.setActiveId(player.ids[randomIndex]);
                  setIsPlaying(true);

                    break;
                default:
                    setIsPlaying(false)
                    break;
            }

        },
        onpause: () => setIsPlaying(false),
        format: ['mp3']
    });
    useEffect(()=>{
        sound?.play()
        return ()=>{
            sound?.unload()
        }
    },[sound])

    const handlePlay=()=>{
        if(player.activeId===Song.id){
            if(isPlaying){

                pause()
            }else{

                play()
            }
        }
    }
    const toggleMute=()=>{
        if(volume===0){
            setVolume(1)
        }else{
            setVolume(0)
        }
    }
  return (
    <div key={keyIndex} className='grid grid-cols-2 md:grid-cols-3 h-full w-full  '>
        <div className='flex justify-start w-full items-center  flex-wrap h-full'>
            <div className='flex items-center'>
                <MediaItem Song={Song} keyvalue={Song.id}/>
            <LikeButton songId={Song.id} className='hidden md:block '/>
<PlayModeButton Mode={playMode} key={playMode} className='ml-auto z-50 cursor-pointer' changeMode={() =>{
setPlayMode(prevMode => {
    switch (prevMode) {
        case PlayMode.Queue:
            return PlayMode.Repeat;
        case PlayMode.Repeat:
            return PlayMode.Shuffle;
        case PlayMode.Shuffle:
            return PlayMode.Queue;
        default:
            return PlayMode.Queue;
    }
});

}
    }></PlayModeButton>
                </div>
                </div>
            {/* //mobile view  */}
            <div className='flex justify-end items-center md:hidden w-full border'>
<div className='h-10 w-10 bg-white text-black flex justify-center items-center rounded-full p-2 cursor-pointer'>
<Icon onClick={handlePlay} size={25} className='text-black text-sm z-50'/>
</div>
</div>
{/* desktop view  */}
<div className='hidden h-full md:flex justify-center items-center w-full max-w-[722px] gap-x-6 '>
    <AiFillStepBackward size={28} onClick={onPlayPrev} className='text-neutral-400 cursor-pointer hover:text-white transition z-50'/>
    <div className='flex justify-center items-center gap-x-2 '>
        <div className='h-10 w-10 bg-white text-black flex justify-center items-center rounded-full p-2 cursor-pointer'>
            <Icon onClick={handlePlay} size={25} className='text-black text-sm z-50'/>
            </div>
        </div>
        <AiFillStepForward size={28} onClick={onPlayNext} className='text-neutral-400 cursor-pointer hover:text-white transition z-50'/>
  
    </div>
    <div className='hidden md:flex w-full justify-center pr-2 '>
        <div className='flex items-center gap-x-2 w-[120px]'>
            <VolumeIcon onClick={toggleMute} size={32} className='text-neutral-400 cursor-pointer hover:text-white transition z-50'/>

            <Slider value={volume}  onchange={(value)=>setVolume(value)}/>
            </div>
            
    </div>

        </div>
  )
}

export default PlayerContent