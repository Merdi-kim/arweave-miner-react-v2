import { useState } from "react";
import { Link } from "react-router";
import arweave_logo from "@/assets/arweave.svg"
import miner_logo from "@/assets/miner.svg"
import Button from "@/components/ui/Button";
import AddMinerModal from "@/components/modals/AddMiner";
import useStoredMinerInfo from "@/hooks/useStoredMinerInfo";

const Navbar = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const {storedMinerInfo} = useStoredMinerInfo()

  return (
    <header>
      <nav className=" z-3 h-14 w-full md:h-20 px-2 md:px-6">
        <div className="flex h-full items-center justify-between whitespace-nowrap border-b border-gray-300">
          <Link to="/" className="flex items-center">
            <img
              src={arweave_logo}
              alt="arweave-logo"
              className="mr-2 h-8 w-8 sm:h-10 sm:w-10"
            />
          </Link>

          {!storedMinerInfo ? (
            <Button className='h-8 w-24 sm:h-10 sm:w-28' onClick={() => setIsModalOpen((prevState) => !prevState)}>Add Miner</Button>
          ) : (
            <>
            <Button className='hidden sm:flex h-8 sm:h-10 max-w-[250px] px-2' onClick={() => setIsModalOpen(true)}> <img src={miner_logo} alt="miner" className="h-4 mr-2" /> {`${storedMinerInfo.hostname}:${storedMinerInfo.port}`}</Button>
            <Button className='sm:hidden h-8 sm:h-10 max-w-[250px] px-2' onClick={() => setIsModalOpen(true)}> <img src={miner_logo} alt="miner" className="h-4 mr-2" /> {`${storedMinerInfo.hostname}`}</Button>
            </>
          )}
          {isModalOpen && (
            <div className="fixed inset-0 w-full flex flex-col items-center justify-center overflow-y-auto bg-[url(/add_miner_background.svg)] bg-cover bg-white/40">
              <AddMinerModal
                handleCloseModal={setIsModalOpen}
              />
            </div>
          )}
        </div>
      </nav>
    </header>
  );
}

export default Navbar
