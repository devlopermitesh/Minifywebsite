import React from 'react'
import * as Dialog from '@radix-ui/react-dialog'
import { IoCloseSharp } from "react-icons/io5";
import { twMerge } from 'tailwind-merge';
interface ModalProps {
 isopen:boolean,
 onchange:(open:boolean)=>void
 title:string   
 description:string
 children:React.ReactNode

}
const Modals: React.FC<ModalProps> = ({isopen,onchange,title,description,children}) => {
  return (
    <Dialog.Root open={isopen} onOpenChange={onchange}>
		{/* <Dialog.Trigger asChild>
			<button className="Button violet">{title}</button>
		</Dialog.Trigger> */}
		<Dialog.Portal>
			<Dialog.Overlay className="bg-neutral-900/90 backdrop-blur-sm fixed inset-0" />
			<Dialog.Content className={twMerge(`fixed drop-shadow-md border border-neutral-700 left-[50%] top-[50%] max-h-full h-full  
            md:h-auto md:max-h-[85vh] w-full md:w-[90vw] md:max-w-[450px] translate-x-[-50%] translate-y-[-50%] rounded-md bg-neutral-800 p-[25px] focus:outline-none`)} >
				<Dialog.Title className="text-white text-xl font-bold mb-4 text-center">{title}</Dialog.Title>
				<Dialog.Description className="text-white text-center mb-5 leading-normal text-sm">
                    {description}
				</Dialog.Description>
        {children}
				<Dialog.Close asChild className='absolute top-4 right-4  inline-flex items-center justify-center '>
					<button className="IconButton" onClick={()=>onchange(false)} aria-label="Close">
                        <IoCloseSharp />
					</button>
				</Dialog.Close>
			</Dialog.Content>
		</Dialog.Portal>
	</Dialog.Root>
  )
}

export default Modals