'use client'

import { useEffect, useState, useMemo } from 'react'

import Link from 'next/link'
import { useParams } from 'next/navigation'

import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import Divider from '@mui/material/Divider'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import Chip from '@mui/material/Chip'
import Checkbox from '@mui/material/Checkbox'
import IconButton from '@mui/material/IconButton'
import { styled } from '@mui/material/styles'
import TablePagination from '@mui/material/TablePagination'
import type { TextFieldProps } from '@mui/material/TextField'
import classnames from 'classnames'
import { rankItem } from '@tanstack/match-sorter-utils'

import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getFilteredRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFacetedMinMaxValues,
  getPaginationRowModel,
  getSortedRowModel
} from '@tanstack/react-table'

import OptionMenu from '@core/components/option-menu'

import tableStyles from '@core/styles/table.module.css'

import { getLocalizedUrl } from '@/utils/i18n'

import type { Locale } from '@configs/i18n'

// Define type for role icons and colors
type UserRoleType = {
  [key: string]: { icon: string; color: string }
}

// Define new type for skipper notifications
interface SkipperNotification {
  id: number
  authorised_rep_name: string
  permit_number: string
  date_sent: string
  status: string
  role: string
  action?: string
}

// Define DebouncedInput props type
interface DebouncedInputProps extends Omit<TextFieldProps, 'onChange'> {
  value: string | number
  onChange: (value: string | number) => void
  debounce?: number
}

const Icon = styled('i')({})

// Role configuration object
const userRoleObj: UserRoleType = {
  admin: { icon: 'ri-vip-crown-line', color: 'error' },
  skipper: { icon: 'ri-computer-line', color: 'warning' },
  monitor: { icon: 'ri-edit-box-line', color: 'info' },
  driver: { icon: 'ri-pie-chart-2-line', color: 'success' },
  factorycontroller: { icon: 'ri-user-3-line', color: 'primary' },
  outlet: { icon: 'ri-user-3-line', color: 'secondary' }
}

const fuzzyFilter = (row: any, columnId: string, value: string, addMeta: any) => {
  const itemRank = rankItem(row.getValue(columnId), value)

  addMeta({ itemRank })

  return itemRank.passed
}

const DebouncedInput = ({ value: initialValue, onChange, debounce = 500, ...props }: DebouncedInputProps) => {
  const [value, setValue] = useState(initialValue)

  useEffect(() => {
    setValue(initialValue)
  }, [initialValue])

  useEffect(() => {
    const timeout = setTimeout(() => {
      onChange(value)
    }, debounce)

    return () => clearTimeout(timeout)
  }, [value, onChange, debounce])

  return <TextField {...props} value={value} onChange={e => setValue(e.target.value)} size='small' />
}

const columnHelper = createColumnHelper<SkipperNotification>()

const SkipperNotificationsTable = () => {
  const [rowSelection, setRowSelection] = useState({})
  const [data, setData] = useState<SkipperNotification[]>([])
  const [filteredData, setFilteredData] = useState<SkipperNotification[]>([])
  const [globalFilter, setGlobalFilter] = useState('')

  const { lang: locale } = useParams()

  // Fetch data from API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/pages/notifyRH_history')
        const result = await response.json()

        // Add role field to each record if not present
        const processedData = result.map((item: SkipperNotification) => ({
          ...item,
          role: item.role || 'skipper' // Default role if not provided by API
        }))

        setData(processedData)
        setFilteredData(processedData)
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }

    fetchData()
  }, [])

  const columns = useMemo(
    () => [
      {
        id: 'select',
        header: ({ table }: any) => (
          <Checkbox
            checked={table.getIsAllRowsSelected()}
            indeterminate={table.getIsSomeRowsSelected()}
            onChange={table.getToggleAllRowsSelectedHandler()}
          />
        ),
        cell: ({ row }: any) => (
          <Checkbox
            checked={row.getIsSelected()}
            disabled={!row.getCanSelect()}
            indeterminate={row.getIsSomeSelected()}
            onChange={row.getToggleSelectedHandler()}
          />
        )
      },
      columnHelper.accessor('id', {
        header: 'ID',
        cell: ({ row }) => <Typography>{row.original.id}</Typography>
      }),
      columnHelper.accessor('authorised_rep_name', {
        header: 'User Name',
        cell: ({ row }) => (
          <Typography className='capitalize' color='text.primary'>
            {row.original.authorised_rep_name}
          </Typography>
        )
      }),
      columnHelper.accessor('permit_number', {
        header: 'Permit Number',
        cell: ({ row }) => <Typography>{row.original.permit_number}</Typography>
      }),
      columnHelper.accessor('date_sent', {
        header: 'Date Sent',
        cell: ({ row }) => <Typography>{new Date(row.original.date_sent).toLocaleDateString()}</Typography>
      }),
      columnHelper.accessor('role', {
        header: 'Role',
        cell: ({ row }) => (
          <div className='flex items-center gap-2'>
            <Icon
              className={classnames('text-[22px]', userRoleObj[row.original.role]?.icon || userRoleObj['skipper'].icon)}
              sx={{
                color: `var(--mui-palette-${userRoleObj[row.original.role]?.color || userRoleObj['skipper'].color}-main)`
              }}
            />
            <Typography className='capitalize' color='text.primary'>
              {row.original.role}
            </Typography>
          </div>
        )
      }),
      columnHelper.accessor('status', {
        header: 'Status',
        cell: ({ row }) => (
          <Chip
            variant='tonal'
            label={row.original.status}
            size='small'
            color={row.original.status.toLowerCase() === 'sent' ? 'success' : 'warning'}
            className='capitalize'
          />
        )
      }),
      columnHelper.accessor('action', {
        header: 'Action',
        cell: ({ row }) => (
          <div className='flex items-center gap-0.5'>
            <IconButton size='small' onClick={() => setData(data?.filter(item => item.id !== row.original.id))}>
              <i className='ri-delete-bin-7-line text-textSecondary' />
            </IconButton>
            <IconButton size='small'>
              <Link href={getLocalizedUrl('/apps/user/view', locale as Locale)} className='flex'>
                <i className='ri-eye-line text-textSecondary' />
              </Link>
            </IconButton>
            <OptionMenu
              iconClassName='text-textSecondary'
              options={[
                {
                  text: 'Download',
                  icon: 'ri-download-line'
                },
                {
                  text: 'Edit',
                  icon: 'ri-edit-box-line'
                }
              ]}
            />
          </div>
        )
      })
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [data]
  )

  const table = useReactTable({
    data: filteredData,
    columns,
    filterFns: {
      fuzzy: fuzzyFilter
    },
    state: {
      rowSelection,
      globalFilter
    },
    initialState: {
      pagination: {
        pageSize: 10
      }
    },
    enableRowSelection: true,
    globalFilterFn: fuzzyFilter,
    onRowSelectionChange: setRowSelection,
    getCoreRowModel: getCoreRowModel(),
    onGlobalFilterChange: setGlobalFilter,
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    getFacetedMinMaxValues: getFacetedMinMaxValues()
  })

  return (
    <Card>
      <CardHeader title='Skipper Notifications' className='pbe-4' />
      <Divider />
      <div className='flex justify-between gap-4 p-5 flex-col items-start sm:flex-row sm:items-center'>
        <Button
          color='secondary'
          variant='outlined'
          startIcon={<i className='ri-upload-2-line' />}
          className='max-sm:is-full'
        >
          Export
        </Button>
        <div className='flex items-center gap-x-4 max-sm:gap-y-4 flex-col max-sm:is-full sm:flex-row'>
          <DebouncedInput
            value={globalFilter ?? ''}
            onChange={value => setGlobalFilter(String(value))}
            placeholder='Search Notifications'
            className='max-sm:is-full'
          />
        </div>
      </div>
      <div className='overflow-x-auto'>
        <table className={tableStyles.table}>
          <thead>
            {table.getHeaderGroups().map(headerGroup => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map(header => (
                  <th key={header.id}>
                    {header.isPlaceholder ? null : (
                      <div
                        className={classnames({
                          'flex items-center': header.column.getIsSorted(),
                          'cursor-pointer select-none': header.column.getCanSort()
                        })}
                        onClick={header.column.getToggleSortingHandler()}
                      >
                        {flexRender(header.column.columnDef.header, header.getContext())}
                        {{
                          asc: <i className='ri-arrow-up-s-line text-xl' />,
                          desc: <i className='ri-arrow-down-s-line text-xl' />
                        }[header.column.getIsSorted() as string] ?? null}
                      </div>
                    )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.length === 0 ? (
              <tr>
                <td colSpan={columns.length} className='text-center'>
                  No data available
                </td>
              </tr>
            ) : (
              table.getRowModel().rows.map(row => (
                <tr key={row.id} className={classnames({ selected: row.getIsSelected() })}>
                  {row.getVisibleCells().map(cell => (
                    <td key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      <TablePagination
        rowsPerPageOptions={[10, 25, 50]}
        component='div'
        className='border-bs'
        count={table.getFilteredRowModel().rows.length}
        rowsPerPage={table.getState().pagination.pageSize}
        page={table.getState().pagination.pageIndex}
        SelectProps={{
          inputProps: { 'aria-label': 'rows per page' }
        }}
        onPageChange={(_, page) => {
          table.setPageIndex(page)
        }}
        onRowsPerPageChange={e => table.setPageSize(Number(e.target.value))}
      />
    </Card>
  )
}

export default SkipperNotificationsTable

// <Link href={`/apps/user/view/${row.original.id}`} className='flex'>
