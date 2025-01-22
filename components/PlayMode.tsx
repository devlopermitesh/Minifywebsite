"use client"
import React from 'react'
import { PlayMode as PlayModeType } from './PlayerContent'
import { ImLoop } from "react-icons/im";
import { MdOutlineRepeatOne } from "react-icons/md";
import { IoShuffleOutline } from "react-icons/io5";
import { GiMusicalScore } from "react-icons/gi";
interface PlayModeProps {
  Mode: PlayModeType  ,
  changeMode:()=>void,
  className?:string
}

function GetIcon(Mode: PlayModeType) {
    switch (Mode) {
        case PlayModeType.Queue:
            return IoShuffleOutline; // Shuffle icon
        case PlayModeType.Repeat:
            return MdOutlineRepeatOne; // Repeat one icon
        case PlayModeType.Shuffle:
            return ImLoop; // Loop icon
        default:
            return GiMusicalScore; // Default musical score icon
    }
}

const PlayModeButton: React.FC<PlayModeProps> = ({ Mode,changeMode,className }) => {
  const Icon = GetIcon(Mode);   // Get the icon based on the Mode
  
  return (
    <div className={`flex justify-center items-center ml-auto p-2 rounded-full bg-gray-800 hover:bg-gray-700 transition ${className}`}>
      {/* Provide a size for the icon */}
      <Icon onClick={changeMode} size={27} className='cursor-pointer text-green-500 transition hover:text-green-400' />
    </div>
  );
}

export default PlayModeButton;
