import { useReactTable, getCoreRowModel, createColumnHelper, flexRender } from '@tanstack/react-table';

import { useMemo } from 'react';
import { useDynamicRowCount } from '@/hooks/useDynamicRowCount';
import { useKeyboardNavigation } from '@/hooks/useKeyboardNavigation';
import { extractCurrency } from '@/utils/extractCurrency';
import { statusConfig, priorityConfig, cellSizeConfig, actionGroupStyles } from '@/config/styleConfig';
import { headerIcons } from '@/config/iconConfig';
import AddIcon from '@/icons/AddIcon';
import { Footer } from './Footer';
import link from '@/assets/link-icon.svg';
import refresh from '@/assets/refresh-icon.svg';
import { ArrowSplit } from '@/icons/ArrowSplit';
import dots from '@/assets/dots-icon.svg';
import dropdown from '@/assets/dropdown-icon.svg';
import { type BaseHeaderProps, type ActionGroupHeaderProps, type Task } from '@/types/declarations';
import { Resizer } from './Resizer';
import { useFilteredData } from '@/hooks/useFilteredData'; 

const BaseHeader = ({
  header,
  icon,
  label,
  hasDropdown = true,
  bgColor = 'bg-Gray-200',
  textColor = 'text-Gray-500',
}: BaseHeaderProps) => (
  <div
    className={`${bgColor} ${textColor} hover:bg-Gray-50 group relative flex h-[32px] w-full items-center justify-between px-[8px] text-[12px] leading-[16px] font-semibold transition-colors`}
  >
    <div className="flex items-center gap-[4px]">
      {icon && <img src={icon} alt={`${label} icon`} />}
      <span>{label}</span>
    </div>
    {hasDropdown && <img src={dropdown} alt="dropdown icon" />}
    <Resizer header={header} />
  </div>
);

const ActionGroupHeader = ({ header, action, label, icon = <ArrowSplit /> }: ActionGroupHeaderProps) => {
  const config = actionGroupStyles[action];
  return (
    <button
      className={`${config.bg} group relative flex h-[32px] w-full items-center justify-center gap-[8px] px-[16px]`}
    >
      <div className={`${config.iconColor}`}>{icon}</div>
      <span className={`${config.textColor} text-[14px] leading-[20px] font-medium`}>{label}</span>
      <img src={dots} alt="dots icon" />
      <Resizer header={header} />
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
        size: 32,
        header: () => (
          <div className="text-Gray-400 bg-Gray-200 border-Gray-100 flex h-[32px] items-center justify-center">#</div>
        ),
        cell: (info) => (
          <div className="text-Gray-500 text-center text-[14px] leading-[20px]">{info.row.index + 1}</div>
        ),
      }),
    ],
  }),

  columnHelper.group({
    id: 'view-info',
    header: (props) => (
      <div className="bg-Gray-100 group relative flex h-[32px] items-center gap-[8px] px-[8px]">
        <div className="bg-Gray-200 text-Gray-600 flex items-center gap-[4px] rounded-[4px] p-[4px] text-[12px] leading-[16px]">
          <img src={link} alt="link icon" />
          <span>Q3 Financial Overview</span>
        </div>

        <button className="cursor-pointer" onClick={() => console.log('Refresh clicked')}>
          <img src={refresh} alt="Refresh" />
        </button>

        <Resizer header={props.header} />
      </div>
    ),

    columns: [
      columnHelper.accessor('jobRequest', {
        size: 256,
        header: (props) => <BaseHeader header={props.header} icon={headerIcons.jobRequest} label="Job Request" />,
      }),
      columnHelper.accessor('submitted', {
        size: 124,
        header: (props) => <BaseHeader header={props.header} icon={headerIcons.submitted} label="Submitted" />,
      }),
      columnHelper.accessor('status', {
        size: 124,
        header: (props) => <BaseHeader header={props.header} icon={headerIcons.status} label="Status" />,
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
        size: 124,
        header: (props) => <BaseHeader header={props.header} icon={headerIcons.submitter} label="Submitter" />,
      }),
    ],
  }),

  columnHelper.group({
    id: 'url',
    header: () => <div className="bg-White h-[32px] w-[124px]"></div>,
    columns: [
      columnHelper.accessor('url', {
        size: 124,
        header: (props) => <BaseHeader header={props.header} icon={headerIcons.url} label="URL" />,
      }),
    ],
  }),

  columnHelper.group({
    id: 'abc-action',
    header: (props) => <ActionGroupHeader header={props.header} action="abc" label="ABC" />,
    columns: [
      columnHelper.accessor('assigned', {
        size: 124,
        header: (props) => (
          <BaseHeader
            header={props.header}
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
    header: (props) => <ActionGroupHeader header={props.header} action="answer" label="Answer a question" />,
    columns: [
      columnHelper.accessor('priority', {
        size: 124,
        header: (props) => (
          <BaseHeader
            header={props.header}
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
        size: 124,
        header: (props) => (
          <BaseHeader
            header={props.header}
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
    header: (props) => <ActionGroupHeader header={props.header} action="extract" label="Extract" />,
    columns: [
      columnHelper.accessor('estValue', {
        size: 124,
        header: (props) => (
          <BaseHeader
            header={props.header}
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
              {currency && <span className="text-Gray-400 font-medium">{currency}</span>}
            </div>
          );
        },
      }),
    ],
  }),

  columnHelper.group({
    id: 'plus-group',
    header: () => (
      <button className="bg-Gray-200 flex h-[32px] w-full items-center justify-center">
        <AddIcon />
      </button>
    ),
    columns: [
      columnHelper.display({
        id: 'row-plus',
        size: 124,
        header: () => <div className=""></div>,
      }),
    ],
  }),
];

export const SpreadsheetGrid = () => {
    const { filteredData, activeTab, onTabClick } = useFilteredData();
  const ROW_HEIGHT = 41;
  const { containerRef, rowCount } = useDynamicRowCount(ROW_HEIGHT);

  const displayData = useMemo(() => {
    if (rowCount === 0) return filteredData;

    const emptyRowCount = Math.max(0, rowCount - filteredData.length);
    const emptyRows = Array.from({ length: emptyRowCount }, () => ({}) as Task);
    return [...filteredData, ...emptyRows];
  }, [rowCount ,filteredData]);

  const table = useReactTable({
    data: displayData,
    columns,
    columnResizeMode: 'onChange',
    getCoreRowModel: getCoreRowModel(),
  });

  const columnSizing = table.getState().columnSizing;
  const columnSizingInfo = table.getState().columnSizingInfo;

  const columnSizeVars = useMemo(() => {
    const headers = table.getFlatHeaders();
    const colSizes: { [key: string]: number } = {};
    for (let i = 0; i < headers.length; i++) {
      const header = headers[i]!;
      colSizes[`--header-${header.id}-size`] = header.getSize();
      colSizes[`--col-${header.column.id}-size`] = header.column.getSize();
    }
    return colSizes;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [columnSizing, columnSizingInfo]);

  const { activeCell, setActiveCell, handleKeyDown } = useKeyboardNavigation(table);
  const getActiveCellStyles = (rowIndex: number, colIndex: number) => {
    if (!activeCell) return '';
    return activeCell.row === rowIndex && activeCell.col === colIndex
      ? 'outline outline-[#6C8B70] shadow-[0px_0px_12px_0px_#0A6E3D38,0px_0px_4px_-2px_#0A6E3D99]'
      : '';
  };
  return (
    <div
      ref={containerRef}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      className="bg-Gray-50 relative flex-grow outline-none"
    >
      <table
        style={{
          ...columnSizeVars,
          width: table.getTotalSize(),
        }}
        className="bg-White w-fit border-collapse"
      >
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id} className="border-Gray-300 border-b">
              {headerGroup.headers.map((header) => {
                return (
                  <th
                    style={{ width: `calc(var(--header-${header.id}-size) * 1px)` }}
                    key={header.id}
                    colSpan={header.colSpan}
                    className="border-Gray-300 border-r last:border-dashed nth-last-2:border-dashed"
                  >
                    {flexRender(header.column.columnDef.header, header.getContext())}
                  </th>
                );
              })}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row, rowIndex) => (
            <tr key={row.id} className="border-Gray-300 border-b">
              {row.getVisibleCells().map((cell, colIndex) => (
                <td
                  style={{ width: `calc(var(--header-${cell.column.id}-size) * 1px)` }}
                  key={cell.id}
                  onClick={() => setActiveCell({ row: rowIndex, col: colIndex })}
                  className={`border-Gray-300 text-Gray-950 truncate border-r p-[8px] text-[12px] leading-[16px] last:border-dashed nth-last-2:border-dashed ${
                    cellSizeConfig[cell.column.id as keyof typeof cellSizeConfig] || cellSizeConfig.default
                  } ${getActiveCellStyles(rowIndex, colIndex)}`}
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <Footer activeTab={activeTab} onTabClick={onTabClick}  />
    </div>
  );
};
