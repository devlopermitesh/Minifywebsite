import React from 'react'
import * as RadixSlider from "@radix-ui/react-slider";
interface SliderProps {
    value:number,
    onchange:(value:number)=>void

}
const Slider:React.FC<SliderProps> = ({value,onchange}) => {
  const handleChange = (newValue:number[]) => {
    onchange(newValue[0]);
  };
  return (
    <RadixSlider.Root className="relative flex items-center select-none touch-none w-full h-10" defaultValue={[1]} max={1} value={[value]} onValueChange={handleChange} step={0.1} aria-label='volume'>
    <RadixSlider.Track className="bg-neutral-600 relative grow rounded-full h-[3px]">
        <RadixSlider.Range className="absolute bg-white rounded-full h-full " />
    </RadixSlider.Track>
    <RadixSlider.Thumb className="SliderThumb" aria-label="Volume" />
</RadixSlider.Root>
  )
}

export default Slider