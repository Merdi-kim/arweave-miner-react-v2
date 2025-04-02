import useMinerMetrics from "@/hooks/useMinerMetrics"
import miner_logo from "@/assets/miner.svg"
import arrow_in_logo from "@/assets/arrow_in.svg"
import arrow_out_logo from "@/assets/arrow_out.svg"

const Peers = () => {

  const {metrics} = useMinerMetrics()

  const data = Object.keys(metrics?.coordinatedMiningData || {}).map((peer) => {
    const transformedData = {
      peer,
      h1_in: Number(metrics?.coordinatedMiningData[peer].h1.from).toFixed(2),
      h1_out: Number(metrics?.coordinatedMiningData[peer].h1.to).toFixed(2),
      h2_in: Number(metrics?.coordinatedMiningData[peer].h2.from).toFixed(2),
      h2_out: Number(metrics?.coordinatedMiningData[peer].h2.to).toFixed(2)
    }
    return transformedData
  })

  const columns = [
    {
      key:"peer",
      label:"Peer",
      icon:""
    },
    {
      key:"h1_in",
      label:"Hash 1 In",
      icon:""
    },
    {
      key:"h1_out",
      label:"Hash 1 Out",
      icon:""
    },
    {
      key:"h2_in",
      label:"Hash 2 In",
      icon:""
    },
    {
      key:"h2_out",
      label:"Hash 2 Out",
      icon:""
    }
  ]

  return (
    <div className="py-10">
      <div className="hidden md:block">
      <table className="w-full md:text-xs lg:text-sm xl:text-base">
        <thead>
          <tr>
            {columns.map((col) => (
              <th key={col.key} className="px-4 py-2 h-24 text-left text-gray-500 font-normal">
                <div className="flex items-center">
                <>{(col.key == "h1_in" || col.key == "h2_in") && <img src={arrow_in_logo} alt="arrow_in" className="h-4 mr-2" />}</>
                <>{(col.key == "h1_out" || col.key == "h2_out") && <img src={arrow_out_logo} alt="arrow_out" className="h-4 mr-2" />}</>
                <>{col.label}</> 
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
        {data.map((row, rowIndex) => (
            <tr key={rowIndex} className="bg-white border border-gray-200 h-18">
              {columns.map((col) => (
                <td key={col.key} className="px-4">
                  <div className="flex items-center"> 
                    <>{col.key =="peer" && <img src={miner_logo} alt="miner" className="h-4 mr-2" />}</> 
                    <>{(col.key == "h1_in" || col.key == "h2_in") && <img src={arrow_in_logo} alt="arrow_in" className="h-4 mr-2" />}</>
                    <>{(col.key == "h1_out" || col.key == "h2_out") && <img src={arrow_out_logo} alt="arrow_out" className="h-4 mr-2" />}</>
                    <>{row[col.key]}</>
                    <>{(col.key =="h1_in" || col.key == "h1_out") && <span className="ml-1">h/s</span>}</>
                  </div>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      </div>
      <div className="md:hidden flex flex-col items-center">
        {data.map((peer, index) => <Peer key={index} data={peer} />)}
      </div>
    </div>
  )
}

const Peer = ({data}) => {
  return (
    <div className="min-w-[370px] sm:min-w-[500px] border border-gray-300 rounded-xl p-2 my-3">
      <div className="h-8 w-full flex items-center  border-b border-b-gray-300">
        <div className="bg-white border border-gray-200 flex items-center justify-center rounded-xl h-7 w-7 mr-2"><img src={miner_logo} alt="miner" className="h-5" /></div>
        <span className="font-medium">{data.peer}</span>
      </div>
      <div className="mt-2 text-xs">
        <div className="flex justify-between mb-1">
          <div className="text-gray-500">Hash 1 In</div>
          <div className="flex items-center"><img src={arrow_in_logo} alt="arrow_in" className="h-4 mr-2" /> {data.h1_in} h/s</div>
        </div>
        <div className="flex justify-between mb-1">
          <div className="text-gray-500">Hash 1 Out</div>
          <div className="flex items-center"><img src={arrow_out_logo} alt="arrow_out" className="h-4 mr-2" /> {data.h1_out} h/s</div>
        </div>
        <div className="flex justify-between mb-1">
          <div className="text-gray-500">Hash 2 In</div>
          <div className="flex items-center"><img src={arrow_in_logo} alt="arrow_in" className="h-4 mr-2" /> {data.h2_in}</div>
        </div>
        <div className="flex justify-between mb-1">
          <div className="text-gray-500">Hash 2 Out</div>
          <div className="flex items-center"><img src={arrow_out_logo} alt="arrow_out" className="h-4 mr-2" /> {data.h2_out}</div>
        </div>
      </div>
    </div>
  )
}

export default Peers
