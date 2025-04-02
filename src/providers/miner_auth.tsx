import useStoredMinerInfo from '@/hooks/useStoredMinerInfo'
import AddMinerModal from '@/components/modals/AddMiner'
import { ReactNode } from 'react'

const MinerAuth = ({children}:{children:ReactNode}) => {
    const {storedMinerInfo} = useStoredMinerInfo()

    if(!storedMinerInfo) {
        return <div className="fixed inset-0 w-full flex flex-col items-center justify-center overflow-y-auto bg-[url(/add_miner_background.svg)] bg-white/40 bg-cover">
        <AddMinerModal/>
      </div>
    }
  return (
    <div>
      {children}
    </div>
  )
}

export default MinerAuth
