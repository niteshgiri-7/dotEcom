import { Dispatch, SetStateAction } from "react";
import DialougeBox from "../DialougeBox";

const DeleteOrderDialouge = ({ showModal, deleteOrder }: { showModal: Dispatch<SetStateAction<boolean>>, deleteOrder: () => void }) => {



  return (
    <>
      <DialougeBox showModal={showModal}>
        <p className="font-semibold text-center">
          Your order is being processed.
          <br />
          Instead of canceling, consider waiting a little longer.
          Do you still want to cancel it?
          <br />
          This action
          <span className="font-bold">
            **cannot be undone**.
          </span>
        </p>
        <div className="w-full flex justify-center gap-10 mt-4">
          <button className="px-4 py-2 bg-red-600 rounded-lg text-white font-bold" onClick={() => deleteOrder()}>Yes</button>
          <button className="px-4 py-2 bg-indigo-600 rounded-lg text-white font-bold" onClick={() => showModal(false)}>No</button>
        </div>
      </DialougeBox>
    </>
  )
}

export default DeleteOrderDialouge;
