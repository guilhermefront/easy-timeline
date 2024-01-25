'use client';

import { toast, Toaster } from 'react-hot-toast';
import { BiTrashAlt } from 'react-icons/bi';
import { apiClient } from 'utils/fetch-client';
import { useMutation } from 'utils/mutate';

export const DeleteTimeline = ({
  timelineId,
  title,
}: {
  timelineId: string;
  title: string;
}) => {
  // const { trigger: deleteTimeline } = useMutation(
  //   'delete-timeline',
  //   async () => await apiClient.delete(`/timelines/${timelineId}`)
  // );
  return (
    <button
      onClick={async (e) => {
        e.preventDefault();
        const toastId = toast.loading('Deleting timeline...');
        try {
          // deleteTimeline();
          toast.success(`Successfully deleted ${title}`);
        } catch {
          toast.error(`An error ocurred when deleting ${title}`);
        } finally {
          toast.dismiss(toastId);
        }
      }}
      className="absolute z-10 top-[19px] right-4"
      type="button"
    >
      <BiTrashAlt className="text-gray-400 hover:text-gray-800" width={16} />
      <Toaster
        toastOptions={{ id: 'delete' }}
        position="bottom-right"
        containerStyle={{ paddingRight: 500 }}
      />
    </button>
  );
};
