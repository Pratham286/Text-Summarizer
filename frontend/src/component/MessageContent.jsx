import React from 'react'

const MessageContent = ({role, content}) => {

  return (
    <div className={`mb-4 flex ${role === 'user' && 'justify-end'} ${role==='assistant' && 'justify-start'}`}>
      <div className={`max-w-xs md:max-w-md lg:max-w-lg xl:max-w-xl px-5 py-3.5 rounded-2xl shadow-lg transition-all duration-300 hover:shadow-xl ${
        role === 'user' 
          ? 'bg-slate-800 text-white rounded-br-md border border-slate-700 hover:bg-slate-750' 
          : 'bg-slate-900 text-slate-100 rounded-bl-md border border-slate-800 hover:border-slate-700'
      }`}>
        <p className="text-[15px] leading-[1.6] whitespace-pre-wrap break-words font-normal tracking-wide">
          {content}
        </p>
      </div>
    </div>
  )
}

export default MessageContent