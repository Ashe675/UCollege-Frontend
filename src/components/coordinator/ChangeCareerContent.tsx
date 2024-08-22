import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Spinner from "../spinner/Spinner";
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";
import { useRef, useState } from "react";
import { toast } from "react-toastify";
import ErrorMessage from "../ErrorMessage";
import {
  acceptRequestChangeCareer,
  dennyRequestChangeCareer,
  getRequestChangeCareer,
} from "@/api/coordinator/CoordinatorApi";
import { RequestChangeCareer } from "@/types/coordinator";
import RequestCareerCard from "./RequestCareerCard";
import RequestDetailCareer from "./RequestDetailCareer";

export default function ChangeCareerContent() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["requests", "change", "career"],
    queryFn: getRequestChangeCareer,
    retry: 2,
  });

  const toastId = useRef<null | number | string>(null);

  const { mutate: acceptRequest, isPending: pendingAccept } = useMutation({
    mutationFn: acceptRequestChangeCareer,
    onSuccess: (data) => {
      toast.update(toastId.current!, {
        render: data,
        type: "success",
        isLoading: false,
        autoClose: 3000,
        theme: "colored",
      });
      setRequestSelected(undefined);
      queryClient.invalidateQueries({queryKey : ["requests", "change", "career"]})
    },
    onError: (error) => {
      toast.update(toastId.current!, {
        render: error.message,
        type: "error",
        isLoading: false,
        autoClose: 6000,
        theme: "colored",
      });
    },
  });

  const queryClient =useQueryClient()

  const { mutate: declineRequest, isPending: pendingDenny } = useMutation({
    mutationFn: dennyRequestChangeCareer,
    onSuccess: (data) => {
      toast.update(toastId.current!, {
        render: data,
        type: "success",
        isLoading: false,
        autoClose: 3000,
        theme: "colored",
      });
      queryClient.invalidateQueries({queryKey : ["requests", "change", "career"]})
      setRequestSelected(undefined);
    },
    onError: (error) => {
      toast.update(toastId.current!, {
        render: error.message,
        type: "error",
        isLoading: false,
        autoClose: 3000,
        theme: "colored",
      });
    },
  });

  const [requestSelected, setRequestSelected] = useState<RequestChangeCareer>();

  if (error) return <ErrorMessage>{error.message}</ErrorMessage>;

  if (isLoading)
    return (
      <div className=" h-full mt-14">
        <Spinner />
      </div>
    );

  const pendings = data?.data.filter((data) => data.estado === "PENDIENTE");

  const handleAccept = () => {
    if (requestSelected) {
      toastId.current = toast.loading("Aceptando Solicitud...");
      acceptRequest(requestSelected.id);
    }
  };

  const handleDenny = () => {
    if (requestSelected) {
      toastId.current = toast.loading("Rechazando Solicitud...");
      declineRequest(requestSelected.id);
    }
  };

  if (data)
    return (
      <>
        {requestSelected && (
          <>
            <div className=" bg-slate-200 border flex flex-col min-h-64  border-dashed space-y-3 border-slate-400 rounded-sm p-3 relative order-1 lg:order-2">
              <RequestDetailCareer
                pendingAccept={pendingAccept}
                request={requestSelected}
                handleAccept={handleAccept}
                handleDenny={handleDenny}
                pendingDenny={pendingDenny}
              />
            </div>
          </>
        )}
        <TabGroup className=" flex w-full h-full flex-col mt-3">
          <TabList className="flex  rounded-md w-full   gap-x-2">
            <Tab className=" text-gray-500 bg-gray-200 shadow-md p-2 px-4 text-sm rounded-full  data-[selected]:bg-yellow-500 data-[selected]:outline-none data-[selected]:text-white uppercase font-semibold">
              Pendientes
            </Tab>
            <Tab
              onClick={() => setRequestSelected(undefined)}
              className=" text-slate-500 bg-gray-200 shadow-md p-2 px-4 text-sm  rounded-full  data-[selected]:bg-teal-500 data-[selected]:outline-none data-[selected]:text-white uppercase font-semibold"
            >
              Todas
            </Tab>
          </TabList>
          <TabPanels
            className={`w-full  h-full py-3 grid grid-cols-1 lg:grid-cols-2 gap-3`}
          >
            <TabPanel className={``}>
              {pendings?.length ? (
                data.data.map((request) => (
                  <RequestCareerCard
                    setSetRequestSelected={setRequestSelected}
                    key={request.id}
                    request={request}
                  />
                ))
              ) : (
                <div className=" text-slate-600">
                  No hay solicitudes pendientes.
                </div>
              )}
            </TabPanel>
            <TabPanel>
              {data.data.length > 0 ? (
                data.data.map((request) => (
                  <RequestCareerCard
                    setSetRequestSelected={setRequestSelected}
                    key={request.id}
                    request={request}
                  />
                ))
              ) : (
                <div className=" text-slate-600">No hay solicitudes.</div>
              )}
            </TabPanel>
          </TabPanels>
        </TabGroup>
      </>
    );
}
