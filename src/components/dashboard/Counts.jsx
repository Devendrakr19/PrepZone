import React from 'react';

const Counts = () => {
  const countsData = [
    { id: 1, imgSrc: "/total_quest.svg", count: 1680, label: "Total Questions" },
    { id: 2, imgSrc: "/L1quest.svg", count: 840, label: "L1 Questions" },
    { id: 3, imgSrc: "/L2quest.svg", count: 540, label: "L2 Questions" },
    { id: 4, imgSrc: "/L3quest.svg", count: 336, label: "L3 Questions" },
    { id: 5, imgSrc: "/trade_quest.svg", count: 168, label: "Trade Count" },
  ];

  return (
    <div className='bg-white p-[20px] manrope shadow'>
      <div className='text-[18px] font-[600] text-[#545454]'>Question Categorization & Trade Metrics</div>
      <div className='flex w-full justify-between gap-[10px] flex-wrap'>
        {countsData.map((item) => (
          <div
            key={item.id}
            className='flex w-[18%] justify-around bg-[#FAFAFA] p-[10px] rounded'
          >
            <img src={item.imgSrc} alt={item.label} className='w-[30px]' />
            <div>
              <div className='text-[35px] font-[700] text-[#545454] manrope'>{item.count}</div>
              <div className='text-[14px] text-[#545454] font-[600] manrope'>{item.label}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Counts;
