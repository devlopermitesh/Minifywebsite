"use client"
import React from 'react'
import { PlayMode as PlayModeType } from './PlayerContent'
import { MdOutlineRepeat, } from "react-icons/md";
import { IoShuffle,} from "react-icons/io5";
import { GiMusicalScore } from "react-icons/gi";
import { FaListUl } from 'react-icons/fa';
interface PlayModeProps {
  Mode: PlayModeType  ,
  changeMode:()=>void,
  className?:string
}
function GetIcon(Mode: PlayModeType) {
  switch (Mode) {
      case PlayModeType.Queue:
          return FaListUl;
      case PlayModeType.Repeat:
          return MdOutlineRepeat; // Repeat icon
      case PlayModeType.Shuffle:
          return IoShuffle; // Shuffle icon
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
