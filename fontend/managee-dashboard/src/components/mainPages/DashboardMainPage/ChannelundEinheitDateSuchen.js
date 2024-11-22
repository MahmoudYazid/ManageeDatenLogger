import React, { useState } from 'react';
import { DownOutlined } from '@ant-design/icons';
import { Dropdown, Space, Menu, DatePicker } from 'antd';
import { Background, VictoryChart, VictoryLine, VictoryTheme, VictoryZoomContainer } from 'victory';
import { EinHeitSealedClass } from '../../../BusinessLogic/EinHeitSealedClass';
import { VonBisRequest } from '../../../BusinessLogic/MakeApi';
import { formatToISO8601 } from '../../../BusinessLogic/ChangeDateFormat';
import TextField from '@mui/material/TextField';
export default function ChannelundEinheitDateSuchen() {
  const EinheitClassInst = new EinHeitSealedClass();
  const [controllerState, setcontrollerState] = useState("");
  const [channelState, setchannelState] = useState("");
  const [einheitState, seteinheitState] = useState("");
  const [von_, setvon_] = useState("");
  const [bis_, setbis_] = useState("");
  const [RowNUM, setRowNUM] = useState("100");
  const [Daten, setDaten] = useState([
    { x: 1, y: "t" },
    { x: 2, y: "3" },
    { x: 3, y: "5" },
    { x: 4, y: "4" },
    { x: 5, y: "7" }
  ]);
  const controllerMenu = (
    <Menu onClick={e => setcontrollerState(e.key)} items={[
      { label: "1st ", key: '1' },
      { type: 'divider' },
      { label: "2nd ", key: '2' },
    ]} />
  );

  const EinHeit = (
    <Menu onClick={e => seteinheitState(e.key)} items={[
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
    ]} />
  );

  const channelMenuItems = [];
  for (let count = 1; count <= 18; count++) {
    channelMenuItems.push({
      label: `${count}`,
      key: `${count}`,
    });
  }

  const channelMenu = <Menu onClick={e => setchannelState(e.key)} items={channelMenuItems} style={{ maxHeight: '5rem', overflowY: 'auto' }} />;





  const handleFetchData = async () => {
    try {
      const data = await VonBisRequest(controllerState, channelState, einheitState, formatToISO8601(von_), formatToISO8601(bis_),RowNUM);
      console.log(data);
  
  
  
      setDaten(data);
    } catch (error) {
      console.error("Failed to fetch data:", error);
    }
  };
  
  return (
    <div className='bg-white w-full lg:h-[40rem] h-fit p-[1rem] m-3 rounded-[1rem] grid grid-rows-[2fr_1fr] md:grid md:grid-cols-[2fr_1fr] border-white-300 shadow-md'>
      <div className='w-full h-full bg-white p-5 hidden md:block'>
        <VictoryChart
          theme={VictoryTheme.material}
          containerComponent={<VictoryZoomContainer zoomDimension="x" />}
          width={1000}
          height={500}
          style={{
            parent: {
              background: "#F4F7FE", // Set your desired background color here
              border: "1px solid #ccc",
            },
          }}
        >
          <VictoryLine
            style={{
              data: { stroke: "#4FD1C5" },
            }}
            data = {Daten}
          />
        </VictoryChart>

      </div>
      <div className='w-full h-full bg-[#F4F7FE] p-5  block md:hidden'>
        <VictoryChart
          theme={VictoryTheme.material}
          containerComponent={<VictoryZoomContainer zoomDimension="x" />}
          width={1000}
          height={1000}
          style={{
            parent: {
              background: "#F4F7FE", // Set your desired background color here
              border: "1px solid #ccc",
            },
          }}
        >
          <VictoryLine
            style={{
              data: { stroke: "#4FD1C5" },
            }}
            data={Daten}
          />
        </VictoryChart>

      </div>
      <div className='p-[1rem] p-1 w-full h-full bg-transparent flex flex-col gap-1 items-center justify-center'>
        <Dropdown overlay={controllerMenu} getPopupContainer={() => document.body} className='border h-[3rem] w-full justify-center flex border-black rounded-lg p-2 cursor-pointer bg-[#4FD1C5] text-white border-[#4FD1C5]'>
          <a >
            <Space>
              controller: {controllerState}
              <DownOutlined />
            </Space>
          </a>
        </Dropdown>
        <Dropdown overlay={channelMenu} getPopupContainer={() => document.body} className='border border-black rounded-lg p-2 h-[3rem] w-full cursor-pointer bg-[#4FD1C5] text-white border-[#4FD1C5] justify-center flex'>
          <a >
            <Space>
              channel: {channelState}
              <DownOutlined />
            </Space>
          </a>
        </Dropdown>
        <Dropdown overlay={EinHeit} getPopupContainer={() => document.body}className='border border-black rounded-lg p-2 h-[3rem] w-full cursor-pointer bg-[#4FD1C5] text-white border-[#4FD1C5] justify-center flex'>
          <a >
            <Space>
              einheit: {einheitState}
              <DownOutlined />
            </Space>
          </a>
        </Dropdown>
        <TextField  className='border border-black rounded-lg p-2 h-[3rem] w-full cursor-pointer bg-[#4FD1C5] text-white border-[#4FD1C5] justify-center flex' onChange={(e) => setRowNUM(e.target.value)} id="filled-basic" label="Filled" variant="filled" />

        <DatePicker onChange={(e)=> setvon_(e)} placeholder="startDatum" className='border border-black rounded-lg p-2 h-[3rem] w-full cursor-pointer bg-[#4FD1C5] text-white border-[#4FD1C5] justify-center flex'></DatePicker>
        <DatePicker onChange={(e)=> setbis_(e)} placeholder="EndDatum" className='border border-black rounded-lg p-2 h-[3rem] w-full cursor-pointer bg-[#4FD1C5] text-white border-[#4FD1C5] justify-center flex'></DatePicker>

        <div onClick={()=> handleFetchData()} id='RequestBtm' className='justify-center flex h-[3rem] w-full hover:bg-white hover:text-[#4FD1C5] border border-black rounded-lg p-2 cursor-pointer bg-[#4FD1C5] text-white border-[#4FD1C5] items-center justify-center text-white flex flex-row'>
          <p>Suchen</p>
        </div>
      </div>
    </div>
  );
}
