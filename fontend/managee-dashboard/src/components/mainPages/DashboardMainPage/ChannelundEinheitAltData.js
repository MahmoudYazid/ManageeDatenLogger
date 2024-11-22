import React, { useState } from 'react';
import { AgCharts } from "ag-charts-react";
import { DownOutlined } from '@ant-design/icons';
import { Dropdown, Space, Menu } from 'antd';
import { EinHeitSealedClass } from '../../../BusinessLogic/EinHeitSealedClass';
import { MakeRequestForManangee } from '../../../BusinessLogic/MakeApi';

export default function ChannelundEinheitAltData() {
  const EinheitClassInst = new EinHeitSealedClass();
  const [controllerState, setcontrollerState] = useState("");
  const [channelState, setchannelState] = useState("");
  const [einheitState, seteinheitState] = useState("");
  const [Daten, setDaten] = useState([{ y: "y", x: "x" }]);
  const [VoBis, setVoBis] = useState({ von: "", bis: "" });

  const [options, setOptions] = useState({
    title: {
      text: ``,
    },
    data: Daten,
    series: [
      {
        type: "line",



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

  const updateChartOptions = (data) => {
    if (data.length > 0) {
      const yKey = Object.keys(data[0]).find(key => key.includes('ch')); // Dynamically find yKey

      if (!yKey) {
        console.error('No valid yKey found in data');
        return;
      }

 
      setOptions({
        ...options,
        title: {
          text: ``,
        },
        data: data,
        series: [
          {
            type: "line",
            xKey: `servertime`, // Using x values from 1 to 100
            yKey: yKey, // Dynamic y key
            fill: '#4FD1C5',
            stroke: '#4FD1C5',
          },
        ],
        axes: [
          {
            type: 'category', // X-axis type (categorical for 1 to 100)
            position: 'bottom',
            title: {
              text: ``,
              style: {
                fontSize: '1.5rem', // Default font size
                '@media (max-width: 768px)': {
                  fontSize: '1rem', // Font size for mobile or smaller screens
                },
              }
            },
            label: {
              enabled: false, // Disable x-axis labels (this hides them)
            },
          },
          {
            type: 'number', // Y-axis type (numeric)
            position: 'left',
            title: {
              text: '',
            },
          },
        ],
      });
    }
  };




  const handleFetchData = async () => {
    try {
      const data = await MakeRequestForManangee(controllerState, channelState, einheitState ,"n");

      setDaten(data);

      setVoBis({
        von: `${data[0]['servertime']}`,  // First item
        bis: `${data[data.length - 1]['servertime']}`,  // Last item
      });

      updateChartOptions(data); // Update chart options with the new data
    } catch (error) {
      console.error("Failed to fetch data:", error);
    }
  };

  const ResetVonBis = () => {
    setVoBis({
      von: "",
      bis: ""
    })
  }
  return (
    <div className='bg-white lg:w-[48%] lg:h-[30rem] h-[40rem] w-full m-3 rounded-[1rem] grid grid-rows-[1fr_4fr_1fr] border-white-300 shadow-md '>
      <div className=' p-[1rem] p-1 w-full h-full bg-[#4FD1C5] flex flex-row   items-center justify-center text-center border-white-300 shadow-md '>

        <p className='text-white'>
          {VoBis.bis != "" ? `Controller no. ${controllerState} , Kanal: ${channelState} , Von ${VoBis.von} Bis ${VoBis.bis}` : 'Suchen Sie !'}
        </p>


      </div>
      <div className='w-full h-full bg-black'>
        <AgCharts className='w-full h-full' options={options} />
      </div>

      <div className='p-[1rem] p-1 w-full h-full bg-transparent flex flex-row flex-wrap gap-1  items-center justify-center '>
        <Dropdown getPopupContainer={() => document.body} overlay={controllerMenu} className='border h-[2.5rem] border-black rounded-lg p-2 cursor-pointer bg-[#4FD1C5] text-white border-[#4FD1C5]'>
          <a onClick={() => ResetVonBis()}>
            <Space>
              controller: {controllerState}
              <DownOutlined />
            </Space>
          </a>
        </Dropdown>
        <Dropdown getPopupContainer={() => document.body} className='border border-black rounded-lg p-2 h-[2.5rem] cursor-pointer bg-[#4FD1C5] text-white border-[#4FD1C5]' overlay={channelMenu}>
          <a onClick={() => ResetVonBis()}>
            <Space>
              channel: {channelState}
              <DownOutlined />
            </Space>
          </a>
        </Dropdown>
        <Dropdown getPopupContainer={() => document.body} className='mr-[1rem] border border-black rounded-lg p-2 h-[2.5rem] cursor-pointer bg-[#4FD1C5] text-white border-[#4FD1C5]' overlay={EinHeit}>
          <a onClick={() => ResetVonBis()}>
            <Space>
              einheit: {einheitState}
              <DownOutlined />
            </Space>
          </a>
        </Dropdown>

        <div onClick={handleFetchData}

          id='RequestBtm' className='mr-[1rem] hover:bg-white h-[2.5rem] hover:text-[#4FD1C5] border border-black rounded-lg p-2 cursor-pointer bg-[#4FD1C5] text-white border-[#4FD1C5] items-center justify-center text-white flex flex-row'>
          <p>Suchen</p>
        </div>

      </div>


    </div>
  );
}
