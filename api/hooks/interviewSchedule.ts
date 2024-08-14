import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  addInterviewData,
  fetchInterviewData,
  updateInterviewData,
  updateInterviewEventData,
  deleteInterviewEvent
} from "../functions/interviewScheduleFunc";
import { toast } from "sonner";

const useInterviewData = () => {
  const queryClient = useQueryClient();

  const {
    data: rowData,
    isLoading,
    error,
    refetch
  } = useQuery({ queryKey: ["interviewData"], queryFn: fetchInterviewData });
 

  const updateMutation = useMutation({
    mutationFn: updateInterviewData,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["interviewData"] });
      toast.success('Update Successfull')
    },
  });

  const addMutation = useMutation({
    mutationFn: addInterviewData,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["interviewData"] });
      toast.success('New Slot Added Successfully')
    },
  });

  const EditEventMutation = useMutation({
    mutationFn: updateInterviewEventData,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['interviewData'] });
      toast.success('Event Edited Successfully')
    },
  });

 



  return { rowData, isLoading,refetch, error, updateMutation, addMutation,EditEventMutation };
};

export default useInterviewData;


export const useDeleteMutationHook=()=>{
  const queryClient = useQueryClient();
  const DeleteEventMutation = useMutation({
    mutationFn: deleteInterviewEvent,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['interviewData'] });
      toast.success('Event Deleted Successfully')
    },
  });
return DeleteEventMutation

}


export const useEditMutation=()=>{
  const queryClient = useQueryClient();
  const EditEventMutation = useMutation({
    mutationFn: updateInterviewEventData,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['interviewData'] });
      toast.success('Event Edited Successfully')
    },
  });
  return EditEventMutation
}