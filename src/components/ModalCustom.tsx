import { Dialog, Transition } from "@headlessui/react";
import { Fragment, ReactNode } from "react";

type ModalCustomProps = {
    show : boolean;
    setShow : React.Dispatch<React.SetStateAction<boolean>>;
    title? : ReactNode
    className? : string
    children : ReactNode
}

export default function ModalCustom({show, setShow, title, className, children} : ModalCustomProps) {

  return (
    <>
      <Transition appear show={show} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-40"
          onClose={() => {
            setShow(false)
          }}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/60" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-2xl transform overflow-hidden rounded-md bg-white text-left align-middle shadow-xl transition-all p-7 sm:p-10  ">
                    <Dialog.Title
                      as="h3"
                      className={` ${className}`}
                    >
                     {title}
                    </Dialog.Title>
                    {children}
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
