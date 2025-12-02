import React from 'react';
import { MdCall } from "react-icons/md";
import { SUPPORT_TEAM } from './constants';

interface SupportMemberProps {
  name: string;
  phone: string;
  showIcon?: boolean;
}

function SupportMember({ name, phone, showIcon }: SupportMemberProps) {
  return (
    <div className='text-white mt-4 flex gap-3 sm:gap-4'>
      {showIcon ? <MdCall size={28} className="sm:size-[35px]" /> : <div className='w-[28px] sm:w-[35px]'></div>}
      <div className={`text-white flex flex-col${showIcon ? '' : ' ml-3 sm:ml-[20px]'}`}>
        <p>{name}</p>
        <p>{phone}</p>
      </div>
    </div>
  );
}

export default function SupportTeam() {
  return (
    <div className='w-full md:w-[25%] mb-8 md:mb-0'>
      <p className='font-semibold text-white text-xl sm:text-2xl mt-4'>Our Call Support Team</p>
      {SUPPORT_TEAM.map((member, idx) => (
        <SupportMember 
          key={idx} 
          {...member}
        />
      ))}
    </div>
  );
}

