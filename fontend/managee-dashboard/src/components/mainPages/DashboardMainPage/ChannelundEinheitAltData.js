import React, { useState } from 'react';
import { AgCharts } from "ag-charts-react";
import { DownOutlined } from '@ant-design/icons';
import { Dropdown, Space, Menu } from 'antd';
import { EinHeitSealedClass } from '../../../BusinessLogic/EinHeitSealedClass';

export default function ChannelundEinheitAltData() {
  const EinheitClassInst = new EinHeitSealedClass();
  const [controllerState, setcontrollerState] = useState("");
  const [channelState, setchannelState] = useState("");
  const [einheitState, seteinheitState] = useState("");

  const [options, setOptions] = useState({
    title: {
      text: "AltData",
    },
    data: [
      { month: "Jan", subscriptions: 222 },
      { month: "Feb", subscriptions: 240 },
      { month: "Mar", subscriptions: 280 },
      { month: "Apr", subscriptions: 300 },
      { month: "May", subscriptions: 350 },
      { month: "Jun", subscriptions: 420 },
      { month: "Jul", subscriptions: 300 },
      { month: "Aug", subscriptions: 270 },
      { month: "Sep", subscriptions: 260 },
      { month: "Oct", subscriptions: 385 },
      { month: "Nov", subscriptions: 320 },
      { month: "Dec", subscriptions: 330 },
    ],
    series: [
      {
        type: "area",
        xKey: "month",
        yKey: "subscriptions",
        yName: "Subscriptions",
        fill: '#4FD1C5', // Set the color of the area chart here
        stroke: '#4FD1C5',
      },
    ],
  });

  const controllerMenu = (
    <Menu
      onClick={e => setcontrollerState(e.key)}

      items={[
        { label: "1st ", key: '1' },
        { type: 'divider' },
        { label: "2nd ", key: '2' },
      ]}
    />
  );

  const EinHeit = (
    <Menu
      onClick={e => seteinheitState(e.key)}

      items={[
        { label: "cosphi", key: EinheitClassInst.cosphi },
        { type: 'divider' },
        { label: "voltage", key: EinheitClassInst.voltage },
        { type: 'divider' },
        { label: "frequency", key: EinheitClassInst.frequency },
        { type: 'divider' },
        { label: "schienleistung", key: EinheitClassInst.apparent },
        { type: 'divider' },
        { label: "current", key: EinheitClassInst.current },
        { type: 'divider' },
        { label: "BliendListung", key: EinheitClassInst.reactive },
        { type: 'divider' },
        { label: "power", key: EinheitClassInst.power },

      ]}
    />
  );

  const channelMenuItems = [

  ];
  for (let count = 1; count <= 18; count++) {
    channelMenuItems.push({
      label: `${count}`,
      key: `${count}`,
    });
  }

  const channelMenu = <Menu onClick={e => setchannelState(e.key)} items={channelMenuItems} style={{ maxHeight: '5rem', overflowY: 'auto' }} />; // Create Menu from channelMenuItems



  return (
    <div className='bg-white lg:w-[48%] lg:h-[30rem] h-[40rem] w-full m-3 rounded-[1rem] grid grid-rows-[4fr_1fr] border-white-300 shadow-md '>
    <div className='w-full h-full bg-black'>
      <AgCharts className='w-full h-full' options={options} />
    </div>

    <div className='p-[1rem] p-1 w-full h-full bg-transparent flex flex-row flex-wrap gap-1  items-center justify-center '>
      <Dropdown getPopupContainer={() => document.body} overlay={controllerMenu} className='border h-[2.5rem] border-black rounded-lg p-2 cursor-pointer bg-[#4FD1C5] text-white border-[#4FD1C5]'>
        <a >
          <Space>
            controller: {controllerState}
            <DownOutlined />
          </Space>
        </a>
      </Dropdown>
      <Dropdown getPopupContainer={() => document.body} className='border border-black rounded-lg p-2 h-[2.5rem] cursor-pointer bg-[#4FD1C5] text-white border-[#4FD1C5]' overlay={channelMenu}>
        <a >
          <Space>
            channel: {channelState}
            <DownOutlined />
          </Space>
        </a>
      </Dropdown>
      <Dropdown getPopupContainer={() => document.body} className='mr-[1rem] border border-black rounded-lg p-2 h-[2.5rem] cursor-pointer bg-[#4FD1C5] text-white border-[#4FD1C5]' overlay={EinHeit}>
        <a >
          <Space>
            einheit: {einheitState}
            <DownOutlined />
          </Space>
        </a>
      </Dropdown>

      <div id='RequestBtm' className='mr-[1rem] hover:bg-white h-[2.5rem] hover:text-[#4FD1C5] border border-black rounded-lg p-2 cursor-pointer bg-[#4FD1C5] text-white border-[#4FD1C5] items-center justify-center text-white flex flex-row'>
        <p>Suchen</p>
    </div>
 
    </div>
  </div>
  );
}
