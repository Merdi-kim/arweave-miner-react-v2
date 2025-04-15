import useStoredMinerInfo from "@/hooks/useStoredMinerInfo";
import { MinerInfo } from "@/types";
import { Dispatch, FormEvent, SetStateAction, useState } from "react";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";

interface AddMinerModalProps {
  storedMinerInfo?: MinerInfo;
  handleCloseModal?: Dispatch<SetStateAction<boolean>>;
}

const AddMinerModal = ({
  handleCloseModal,
}: AddMinerModalProps) => {
  const {storedMinerInfo, storeMinerInfo} = useStoredMinerInfo()
  const [minerInfo, setMinerInfo] = useState<MinerInfo>({
    hostname: storedMinerInfo?.hostname || "",
    port: storedMinerInfo?.port || "1984",
    protocol: storedMinerInfo?.protocol || "http"
  } as MinerInfo)

  const queryMiner = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    storeMinerInfo(minerInfo)
    if(handleCloseModal) {
      handleCloseModal(false)
    }
  };

  return (
    <div className="h-full w-full bg-white/60 md:bg-white/30 flex items-center justify-center">
    <div className="relative rounded-3xl bg-white px-10 py-6 md:py-15 md:px-25 shadow-2xl md:shadow-xl max-w-[700px]">
      <form
        onSubmit={queryMiner}
        className="flex w-full flex-col items-center justify-center z-[2]"
      >
        <div className=" mb-8 sm:mb-12">
          <h2 className="font-semibold text-center text-lg sm:text-2xl mb-3">Add Miner</h2>
          <p className="text-xs sm:text-base">Enter the details below to connect to the miner</p>
        </div>
        <div className="w-full">
          <Input
            placeholder="Enter Miner Hostname or IP address"
            value={minerInfo?.hostname}
            autoFocus
            required={!!minerInfo?.port?.trim().length}
            onChange={(e) =>
              setMinerInfo({ ...minerInfo, hostname: e.target.value })
            }
          />
        </div>
        <div className="w-full">
          <Input
            placeholder="Enter Miner Port Number"
            value={minerInfo?.port}
            onChange={(e) =>
              setMinerInfo({ ...minerInfo, port: e.target.value })
            }
          />
        </div>
        <div className="w-full">
          <Input
            placeholder="Enter Miner Protocol"
            value={minerInfo?.protocol}
            onChange={(e) =>
              setMinerInfo({ ...minerInfo, protocol: e.target.value })
            }
          />
        </div>
        <div className="flex w-full gap-4 mt-8 sm:mt-12">
          {handleCloseModal && (
            <Button onClick={() => handleCloseModal(false)} className="h-8 flex-1 sm:h-10 sm:w-28 hover:font-bold hover:bg-gray-100">
              Close
            </Button>
          )}
          <Button
            type="submit"
            className="h-8 flex-1 sm:h-10 sm:w-28 hover:text-black font-bold text-white bg-black hover:bg-white "
          >
            Add Miner
          </Button>
        </div>
      </form>
    </div>
    </div>
  );
};

export default AddMinerModal