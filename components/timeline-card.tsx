'use client';

import CreateIcon from '@assets/create.svg';
import { Events } from '@prisma/client';
import { useMemo, useRef } from 'react';
import { toast, Toaster } from 'react-hot-toast';
import { apiClient } from 'utils/fetch-client';
import { useMutation } from 'utils/mutate';
import { useDebounce } from 'utils/use-debounce';
import { BiTrashAlt } from 'react-icons/bi';
import { cx } from 'utils/cx';
import Link from 'next/link';
import { routes } from 'utils/constants';
import { useCookies } from 'react-cookie';

export const CreateTimelineCard = ({ timelineId }: { timelineId: string }) => {
  const { trigger } = useMutation(
    'create-empty',
    async () =>
      await apiClient.post('/events/create-empty', {
        timelineId,
      })
  );
  return (
    <article className="lg:min-h-[620px] shrink-0 flex items-center text-center justify-center min-w-[270px] py-11 border-x border-[#D4D4D4]">
      <button
        onClick={async () => {
          trigger();
        }}
        className="font-bold  px-6 w-full h-full flex items-center justify-center gap-2 flex-col"
        type="button"
      >
        <CreateIcon width={24} className="mx-auto" />
        <div>Create event</div>
      </button>
    </article>
  );
};

export const TimelineCard = ({
  timeline_id: timelineId,
  year,
  title,
  content,
  image,
  event_id: eventId,
  link,
  order,
}: Events & { order: number }) => {
  const { trigger } = useMutation(
    'timeline-update',
    async (_, { arg }) => await apiClient.patch('/events', arg)
  );
  const { trigger: triggerDelete } = useMutation(
    'timeline-delete',
    async (_, { arg }) => await apiClient.delete(`/events/${arg}`)
  );

  const defaultInfo = useRef({ year, title, content, image, link });

  const handleChange = useDebounce(
    async (value, field: 'content' | 'year' | 'link' | 'image' | 'title') => {
      const data: Partial<Events> = {
        timeline_id: timelineId,
        event_id: eventId,
      };

      data[field] = value;
      trigger(data);
      toast.success(
        `Updated ${field} ${
          field === 'image' ? '' : `to ${value.split('<br>').join('\n')}`
        }`
      );
    }
  );

  const commonContentEditableProps = useMemo(() => {
    return {
      contentEditable: true,
      supressContentEditableWarning: true,
      onClick: (e) => {
        e.preventDefault();
      },
    };
  }, []);
  const [cookies, setCookie] = useCookies(['activeEventId']);
  const activeEventId = cookies?.activeEventId;
  const isActive = activeEventId === eventId;

  return (
    <article
      id={`event-${eventId}`}
      className={cx(
        'px-6 group cursor-auto focus:bg-[#97503E] focus:text-white py-11 min-w-[270px] relative max-w-[270px] shrink-0 border-l',
        {
          'bg-[#97503E] border-[#97503E] text-white': isActive,
          'text-[#371D16] border-[#D4D4D4]': !isActive,
        }
      )}
      onClick={() => {
        setCookie('activeEventId', eventId);
      }}
    >
      <button
        onClick={async (e) => {
          e.preventDefault();
          triggerDelete();
        }}
        className="absolute z-10 top-[17px] right-[22px]"
        type="button"
      >
        <BiTrashAlt
          className={cx('group-focus:text-gray-200 hover:text-gray-800', {
            'text-gray-200': isActive,
            'text-gray-400': !isActive,
          })}
          width={16}
        />
      </button>
      <div className="flex justify-between items-center">
        <p
          title="year"
          {...commonContentEditableProps}
          onInput={(e) => {
            const currentYear = Number(e.currentTarget.textContent);
            const maxYear = 99999999;
            if (currentYear > 0 && currentYear <= maxYear) {
              handleChange(e.currentTarget.textContent, 'year');
            } else {
              toast.error(
                `${currentYear} is an invalid year. Should be at min 0 and at most ${maxYear}.`,
                { id: 'error-year' }
              );
            }
          }}
          className="max-w-[200px] font-medium w-max text-2xl z-10 relative break-words"
        >
          {defaultInfo.current.year}
        </p>
        <p className="text-[#D0D0D0] text-xl font-medium z-10 relative">
          {order}
        </p>
      </div>
      <h3
        {...commonContentEditableProps}
        onInput={(e) => {
          const qtyChars = e.currentTarget.innerHTML?.length || 0;
          const maxChars = 30;
          if (qtyChars > 0 && qtyChars <= maxChars) {
            handleChange(e.currentTarget.innerHTML, 'title');
          } else {
            toast.error(
              qtyChars === 0
                ? 'Title should have at least 1 character'
                : `Title should have at most ${maxChars} characters. Currently it has ${qtyChars}, which is ${
                    qtyChars - maxChars
                  } more than the max allowed.`,
              { id: 'error-title' }
            );
          }
        }}
        title="title"
        dangerouslySetInnerHTML={{ __html: defaultInfo.current.title }}
        className={cx(
          'text-2xl max-w-[220px] break-words font-medium uppercase mt-9 mb-6 group-focus:text-white z-10 relative',
          {
            'text-white': isActive,
            'text-[#944D3B]': !isActive,
          }
        )}
      />
      <p
        {...commonContentEditableProps}
        onInput={(e) => {
          const qtyChars = e.currentTarget.innerHTML?.length || 0;
          const maxChars = 200;
          if (qtyChars > 0 && qtyChars <= maxChars) {
            handleChange(e.currentTarget.innerHTML, 'content');
          } else {
            toast.error(
              qtyChars === 0
                ? 'Content should have at least 1 character'
                : `Content should have at most ${maxChars} characters. Currently it has ${qtyChars}, which is ${
                    qtyChars - maxChars
                  } more than the max allowed.`,
              { id: 'error-content' }
            );
          }
        }}
        title="content"
        className="text-xs mb-20 z-10 relative break-words"
        dangerouslySetInnerHTML={{ __html: defaultInfo.current.content }}
      />

      <label className="cursor-pointer z-10 relative">
        <input
          accept="image/*"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file?.size && file.size < 0.5 * 1024 * 1024) {
              const reader = new FileReader();
              reader.onloadend = () => {
                handleChange(reader.result, 'image');
              };
              reader.readAsDataURL(file);
            } else {
              toast.error(
                'Image needs to be less than 500kb. Please, compress or send a smaller version.'
              );
            }
          }}
          className="hidden"
          title="image"
          type="file"
        />
        <div
          className={cx(
            'flex justify-center items-center rounded relative w-full',
            {
              'bg-[#D9D9D9]': image,
            }
          )}
        >
          {image && title && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              key={image}
              alt={title}
              src={image}
              className="max-h-[204px] w-full object-cover object-center"
            />
          )}
        </div>
      </label>
      <Toaster
        toastOptions={{ id: 'timeline-card' }}
        position="bottom-right"
        containerStyle={{ paddingRight: 500 }}
      />
      <Link
        id={`event-${eventId}`}
        href={routes.goToEvent(timelineId!, eventId)}
      />
    </article>
  );
};
