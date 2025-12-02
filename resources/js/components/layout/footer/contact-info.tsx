import React from 'react';
import { CONTACT_INFO } from './constants';

interface ContactInfoItemProps {
  icon: React.ElementType;
  title: string;
  detail: string;
}

function ContactInfoItem({ icon: Icon, title, detail }: ContactInfoItemProps) {
  return (
    <div className='text-white mt-4 flex gap-4 sm:gap-6'>
      <Icon size={28} className="sm:size-[35px]" />
      <div className='text-white flex flex-col gap-0.5'>
        <p>{title}</p>
        <p>{detail}</p>
      </div>
    </div>
  );
}

export default function ContactInfo() {
  return (
    <div className='w-full md:w-[25%] mb-8 md:mb-0'>
      <p className='font-semibold text-white text-xl sm:text-2xl mt-4'>Contact Us</p>
      {CONTACT_INFO.map((info, idx) => (
        <ContactInfoItem key={idx} {...info} />
      ))}
    </div>
  );
}

