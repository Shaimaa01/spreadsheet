import {
  useReactTable,
  getCoreRowModel,
  createColumnHelper,
  flexRender,
} from '@tanstack/react-table';
import { mockData } from '@/data/mockData.ts';
import { useMemo, useState } from 'react';
import { useDynamicRowCount } from '@/hooks/useDynamicRowCount';
import { extractCurrency } from '@/utils/extractCurrency';
import {
  statusConfig,
  priorityConfig,
  cellSizeConfig,
  actionGroupStyles,
} from '@/config/styleConfig';
import { headerIcons } from '@/config/iconConfig';
import AddIcon from '@/icons/AddIcon';
import { Footer } from './Footer';
import link from '@/assets/link-icon.svg';
import refresh from '@/assets/refresh-icon.svg';
import { ArrowSplit } from '@/icons/ArrowSplit';
import dots from '@/assets/dots-icon.svg';
import dropdown from '@/assets/dropdown-icon.svg';
import {
  type BaseHeaderProps,
  type ActionGroupHeaderProps,
  type Task,
} from '@/types/declarations';

const BaseHeader = ({
  icon,
  label,
  hasDropdown = true,
  bgColor = 'bg-Gray-200',
  textColor = 'text-Gray-500',
  width = 'w-[124px]',
}: BaseHeaderProps) => (
  <div
    className={`${bgColor} ${textColor} hover:bg-Gray-50 flex h-[32px] ${width} items-center justify-between px-[8px] text-[12px] leading-[16px] font-semibold transition-colors`}
  >
    <div className="flex items-center gap-[4px]">
      {icon && <img src={icon} alt={`${label} icon`} />}
      <span>{label}</span>
    </div>
    {hasDropdown && <img src={dropdown} alt="dropdown icon" />}
  </div>
);

const ActionGroupHeader = ({
  action,
  label,
  icon = <ArrowSplit />,
}: ActionGroupHeaderProps) => {
  const config = actionGroupStyles[action];
  return (
    <button
      className={`${config.bg} flex h-[32px] w-full items-center justify-center gap-[8px] px-[16px]`}
    >
      <div className={`${config.iconColor}`}>{icon}</div>
      <span
        className={`${config.textColor} text-[14px] leading-[20px] font-medium`}
      >
        {label}
      </span>
      <img src={dots} alt="dots icon" />
    </button>
  );
};

const columnHelper = createColumnHelper<Task>();

const columns = [
  columnHelper.group({
    id: 'row-number-group',
    header: () => <div className="bg-White h-[32px] w-[32px]"></div>,
    columns: [
      columnHelper.display({
        id: 'row-number',
        header: () => (
          <div className="text-Gray-400 bg-Gray-200 border-Gray-100 flex h-[32px] w-[32px] items-center justify-center">
            #
          </div>
        ),
        cell: (info) => (
          <div className="text-Gray-500 text-center text-[14px] leading-[20px]">
            {info.row.index + 1}
          </div>
        ),
      }),
    ],
  }),

  columnHelper.group({
    id: 'view-info',
    header: () => (
      <div className="bg-Gray-100 flex h-[32px] items-center gap-[8px] px-[8px]">
        <div className="bg-Gray-200 text-Gray-600 flex items-center gap-[4px] rounded-[4px] p-[4px] text-[12px] leading-[16px]">
          <img src={link} alt="link icon" />
          <span>Q3 Financial Overview</span>
        </div>

        <button
          className="cursor-pointer"
          onClick={() => console.log('Refresh clicked')}
        >
          <img src={refresh} alt="Refresh" />
        </button>
      </div>
    ),

    columns: [
      columnHelper.accessor('jobRequest', {
        header: () => (
          <BaseHeader
            icon={headerIcons.jobRequest}
            label="Job Request"
            width="max-w-[256px]"
          />
        ),
      }),
      columnHelper.accessor('submitted', {
        header: () => (
          <BaseHeader icon={headerIcons.submitted} label="Submitted" />
        ),
      }),
      columnHelper.accessor('status', {
        header: () => <BaseHeader icon={headerIcons.status} label="Status" />,
        cell: (info) => {
          const status = info.getValue() as Task['status'];
          const config = statusConfig[status as keyof typeof statusConfig] || {
            bg: 'bg-White',
            text: 'text-White',
          };

          return (
            <div className="flex items-center justify-center">
              <p
                className={`${config.bg} ${config.text} font-figtree h-full w-fit rounded-full px-[8px] py-[4px] leading-[16px] font-medium`}
              >
                {status}
              </p>
            </div>
          );
        },
      }),
      columnHelper.accessor('submitter', {
        header: () => (
          <BaseHeader icon={headerIcons.submitter} label="Submitter" />
        ),
      }),
    ],
  }),

  columnHelper.group({
    id: 'url',
    header: () => <div className="bg-White h-[32px] w-[124px]"></div>,
    columns: [
      columnHelper.accessor('url', {
        header: () => <BaseHeader icon={headerIcons.url} label="URL" />,
      }),
    ],
  }),

  columnHelper.group({
    id: 'abc-action',
    header: () => <ActionGroupHeader action="abc" label="ABC" />,
    columns: [
      columnHelper.accessor('assigned', {
        header: () => (
          <BaseHeader
            icon={headerIcons.assigned}
            label="Assigned"
            bgColor="bg-Green-50"
            textColor="text-Green-700"
            hasDropdown={false}
          />
        ),
      }),
    ],
  }),

  columnHelper.group({
    id: 'answer-action',
    header: () => (
      <ActionGroupHeader action="answer" label="Answer a question" />
    ),
    columns: [
      columnHelper.accessor('priority', {
        header: () => (
          <BaseHeader
            label="Priority"
            bgColor="bg-Purple-100"
            textColor="text-Purple-600"
            hasDropdown={false}
          />
        ),
        cell: (info) => {
          const priority = info.getValue() as keyof typeof priorityConfig;
          const config = priorityConfig[priority] || {
            text: 'text-Gray-800',
          };
          return <span className={` ${config.text} `}>{priority}</span>;
        },
      }),

      columnHelper.accessor('dueDate', {
        header: () => (
          <BaseHeader
            label="Due Date"
            bgColor="bg-Purple-100"
            textColor="text-Purple-600"
            width="min-w-[124px]"
            hasDropdown={false}
          />
        ),
      }),
    ],
  }),

  columnHelper.group({
    id: 'extract-action',
    header: () => <ActionGroupHeader action="extract" label="Extract" />,
    columns: [
      columnHelper.accessor('estValue', {
        header: () => (
          <BaseHeader
            label="Est. Value"
            bgColor="bg-Peach-100"
            textColor="text-Brown-500"
            hasDropdown={false}
          />
        ),
        cell: (info) => {
          const value = info.getValue() as string;
          if (!value) {
            return <div></div>;
          }
          const currency = extractCurrency(value);

          return (
            <div>
              {value.replace(currency || '', '')}
              {currency && (
                <span className="text-Gray-400 font-medium">{currency}</span>
              )}
            </div>
          );
        },
      }),
    ],
  }),

  columnHelper.group({
    id: 'plus-group',
    header: () => (
      <button className="bg-Gray-200 flex h-[32px] w-[124px] items-center justify-center">
        <AddIcon />
      </button>
    ),
    columns: [
      columnHelper.display({
        id: 'row-plus',
        header: () => <div className=""></div>,
      }),
    ],
  }),
];

export const SpreadsheetGrid = () => {
  const [activeCell, setActiveCell] = useState<string | null>(null);
  const getActiveCellStyles = (cellId: string) => {
    return activeCell === cellId
      ? 'outline outline-[#6C8B70] shadow-[0px_0px_12px_0px_#0A6E3D38,0px_0px_4px_-2px_#0A6E3D99]'
      : '';
  };

  const ROW_HEIGHT = 41;
  const { containerRef, rowCount } = useDynamicRowCount(ROW_HEIGHT);

  const displayData = useMemo(() => {
    if (rowCount === 0) return mockData;

    const emptyRowCount = Math.max(0, rowCount - mockData.length);
    const emptyRows = Array.from({ length: emptyRowCount }, () => ({}) as Task);
    return [...mockData, ...emptyRows];
  }, [rowCount]);

  const table = useReactTable({
    data: displayData,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div ref={containerRef} className="bg-Gray-50 relative flex-grow">
      <table className="bg-White w-fit border-collapse">
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id} className="border-Gray-300 border-b">
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  colSpan={header.colSpan}
                  className="border-Gray-300 border-r last:border-dashed nth-last-2:border-dashed"
                >
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext(),
                  )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id} className="border-Gray-300 border-b">
              {row.getVisibleCells().map((cell) => (
                <td
                  key={cell.id}
                  onClick={() => setActiveCell(cell.id)}
                  // className="border-Gray-300 text-Gray-950 truncate overflow-hidden border-r p-[8px] text-[12px] leading-[16px] last:border-dashed nth-last-2:border-dashed"
                  className={`border-Gray-300 text-Gray-950 truncate border-r p-[8px] text-[12px] leading-[16px] last:border-dashed nth-last-2:border-dashed ${
                    cellSizeConfig[
                      cell.column.id as keyof typeof cellSizeConfig
                    ] || cellSizeConfig.default
                  } ${getActiveCellStyles(cell.id)}`}
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <Footer />
    </div>
  );
};
