import React, { useState,useEffect } from 'react';
import { DownOutlined } from '@ant-design/icons';
import { Dropdown, Space, Menu, DatePicker } from 'antd';
import { Background, VictoryChart, VictoryLabel, VictoryLine, VictoryTheme, VictoryZoomContainer } from 'victory';
import { EinHeitSealedClass } from '../../../BusinessLogic/EinHeitSealedClass';
import { VonBisKompRequest, VonBisRequest } from '../../../BusinessLogic/MakeApi';
import { formatToISO8601 } from '../../../BusinessLogic/ChangeDateFormat';
import TextField from '@mui/material/TextField';
import randomColor from 'randomcolor';

export default function KomponiertGraph() {
    const EinheitClassInst = new EinHeitSealedClass();
    const [controllerState, setcontrollerState] = useState("");
    const [channelState, setchannelState] = useState("");
    const [einheitState, seteinheitState] = useState("");
    const [von_, setvon_] = useState("");
    const [bis_, setbis_] = useState("");
    const [RowNUM, setRowNUM] = useState("100");
    const [Daten, setDaten] = useState([

    ]);
    const [GraphColors, setGraphColors] = useState([

    ]);
    // a hex code for an attractive color

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
            // Fetch new data
            const data = await VonBisKompRequest(controllerState, channelState, einheitState, formatToISO8601(von_), formatToISO8601(bis_), RowNUM);
            var Randcolor = randomColor(); 
            // Append new data correctly using the function form of setState
            setDaten(prevDaten => [...prevDaten, data]);
            setGraphColors(prevDaten => [...prevDaten, [Randcolor,channelState] ]);
            
            console.log("Updated Daten:", Daten); // This will still show the old state immediately after setDaten call, but check it in the next render
    
        } catch (error) {
            console.error("Failed to fetch data:", error);
        }
    };
    useEffect(() => {
        console.log("Updated Daten:", Daten);
    }, [Daten]);
    return (
        <div className='bg-[#4FD1C5] w-full lg:h-[40rem] h-fit p-[1rem] m-3 rounded-[1rem] grid grid-rows-[2fr_1fr] md:grid md:grid-cols-[2fr_1fr] border-white-300 shadow-md'>
            <div className='w-full h-full bg-[#4FD1C5] p-5 hidden md:block'>
                <VictoryChart
                    theme={VictoryTheme.material}
                    containerComponent={<VictoryZoomContainer zoomDimension="x" />}
                    width={1000}
                    height={500}
                    style={{
                        parent: {
                            background: "#FFFFFF", // Set your desired background color here
                        },
                    }}
                >

                       
                       
                   {
        // Ensure that Daten is being rendered correctly, each line gets its own unique key and color
        Daten.map((e, index) => (
        


           
            <VictoryLine
                key={index} // Unique key for each line
                style={{
                    data: { stroke: randomColor() }, // Random color for each line
                }}
                data={e} // Ensure e is an array of data points for each line
            />
          
        ))
    }          
                    
                </VictoryChart>


            </div>
            <div className='w-full h-full bg-[#4FD1C5] p-5  block md:hidden border-white-100 rounded-[15px]'>
                <VictoryChart
                    theme={VictoryTheme.material}
                    containerComponent={<VictoryZoomContainer zoomDimension="x" />}
                    width={1000}
                    height={1000}
                    style={{
                        parent: {
                            background: "#FFFFFF", // Set your desired background color here
                            border: "1px solid #000000",
                        },
                    }}
                >

                    {

                        Daten.forEach((d) => (
                            <VictoryLine
                                style={{
                                    data: { stroke: "#4FD1C5" },
                                }}
                                data={d}
                             
                            />

                        ))

                    }

                </VictoryChart>

            </div>
            <div className='p-[1rem] p-1 w-full h-full bg-[#4FD1C5] flex flex-col gap-2 items-center justify-center rounded-[3rem] border-green-700 '>
                <div className='w-full h-[3rem] bg-transparent text-white flex items-center justify-center '><p className='animate-pulse text-[2rem]'>KomponiertGraph</p></div>
                <Dropdown overlay={controllerMenu} getPopupContainer={() => document.body} className='border h-[3rem] w-full justify-center flex border-black rounded-lg p-2 cursor-pointer bg-[#FFFFFF] text-black border-[#4FD1C5]'>
                    <a >
                        <Space>
                            controller: {controllerState}
                            <DownOutlined />
                        </Space>
                    </a>
                </Dropdown>
                <Dropdown overlay={channelMenu} getPopupContainer={() => document.body} className='border border-black rounded-lg p-2 h-[3rem] w-full cursor-pointer bg-[#FFFFFF] text-black border-[#4FD1C5] justify-center flex'>
                    <a >
                        <Space>
                            channel: {channelState}
                            <DownOutlined />
                        </Space>
                    </a>
                </Dropdown>
                <Dropdown overlay={EinHeit} getPopupContainer={() => document.body} className='border border-black rounded-lg p-2 h-[3rem] w-full cursor-pointer bg-[#FFFFFF] text-black border-[#4FD1C5] justify-center flex'>
                    <a >
                        <Space>
                            einheit: {einheitState}
                            <DownOutlined />
                        </Space>
                    </a>
                </Dropdown>
                <TextField className=' border border-white rounded-lg p-2 h-[3rem] w-full cursor-pointer bg-white text-white border-white justify-center flex' onChange={(e) => setRowNUM(e.target.value)} id="filled-basic" label="Filled" variant="filled" />

                <DatePicker onChange={(e) => setvon_(e)} placeholder="startDatum"  className='border border-black rounded-lg p-2 h-[3rem] w-full cursor-pointer bg-white text-black border-[#4FD1C5] justify-center flex'></DatePicker>
                <DatePicker onChange={(e) => setbis_(e)} placeholder="EndDatum" className='border border-black rounded-lg p-2 h-[3rem] w-full cursor-pointer bg-white text-black border-[#4FD1C5] justify-center flex'></DatePicker>

                <div onClick={() => handleFetchData()} id='RequestBtm' className='justify-center flex h-[3rem] w-full hover:bg-white hover:text-[#4FD1C5] border border-black rounded-lg p-2 cursor-pointer bg-[#FFFFFF] text-black border-[#4FD1C5] items-center justify-center text-black flex flex-row'>
                    <p>Suchen</p>
                </div>
                <div onClick={() => setDaten([])} id='RequestBtm' className='justify-center flex h-[3rem] w-full hover:bg-white hover:text-red-700 border border-black rounded-lg p-2 cursor-pointer bg-[#FFFFFF] text-black border-[#4FD1C5] items-center justify-center text-black flex flex-row'>
                    <p>löchen</p>
                </div>
            </div>
        </div>
    );
}
