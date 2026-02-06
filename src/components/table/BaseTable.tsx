import { Table, TableCell, TableContainer, TableRow, TableHead, TableBody, Paper, CircularProgress, Box, TablePagination, TableFooter } from "@mui/material"
import TableHeader from '../../dto/table/TableHeader';
import { useTranslation } from "react-i18next";

interface BaseTableProps<T> {
    headers: TableHeader[]
    rows: T[]
    rowKey: keyof T
    width: string
    height: string
    overflow: string
    noDataFoundText: string
    loading?: boolean
    color?: string
    headerBackGroundColor?: string
    headerFontColor?: string
    headerFontSize?: string
    rowBackGroundColor?: string
    rowFontColor?: string
    borderColor?: string
    changePage?: () => void
    pageCount?: number,
    rowsPerPage?: number,
    page?: number
}

const BaseTable = <T extends Record<string, any>>({
    headers, rows, rowKey, width, height,
    overflow, noDataFoundText, loading,
    color, headerBackGroundColor, headerFontColor,
    headerFontSize, rowBackGroundColor, rowFontColor,
    borderColor, changePage = () => null, pageCount = 0,
    rowsPerPage = 10, page = 0
}: BaseTableProps<T>) => {

    const { t } = useTranslation();

    const tableEmpty = () => {
        return (
            <TableRow>
                <TableCell colSpan={headers.length}
                    sx={{
                        backgroundColor: rowBackGroundColor,
                        color: rowFontColor,
                        fontSize: '15px',
                        borderTop: `1px solid ${borderColor}`,
                    }}
                >
                    <Box display="flex"
                        justifyContent="center"
                        alignItems="center"
                        height="100px"
                    >
                        <h1>{noDataFoundText}</h1>
                    </Box>
                </TableCell>
            </TableRow>
        );
    }

    return (
        <Paper sx={{
            width: width, maxHeight: height, overflow: overflow
        }}>
            <TableContainer>
                <Table stickyHeader sx={{
                    border: `1px solid ${borderColor}`,
                    height: height
                }}>
                    <TableHead>
                        <TableRow>
                            {headers.map((header => (
                                <TableCell
                                    key={header.key}
                                    sx={{
                                        backgroundColor: headerBackGroundColor,
                                        color: headerFontColor,
                                        fontWeight: 'bolder',
                                        fontSize: headerFontSize,
                                        textAlign: 'center'
                                    }}
                                >
                                    {header.label}
                                </TableCell>
                            )))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {loading ? (
                            <TableRow>
                                <TableCell colSpan={headers.length}>
                                    <Box display="flex"
                                        justifyContent="center"
                                        alignItems="center"
                                        height="100px"
                                        sx={{ color: color }}
                                    >
                                        <CircularProgress sx={{ color: color }} />
                                    </Box>
                                </TableCell>
                            </TableRow>
                        ) :
                            rows.length > 0 ? (
                                rows.map((row) => (
                                    <TableRow key={row[rowKey] as React.Key}>
                                        {headers.map((header) => (
                                            <TableCell
                                                key={header.key}
                                                sx={{
                                                    backgroundColor: rowBackGroundColor,
                                                    color: rowFontColor
                                                }}>
                                                {row[header.key]}
                                            </TableCell>
                                        ))}
                                    </TableRow>
                                ))
                            ) : (
                                tableEmpty()
                            )
                        }
                    </TableBody>
                    <TableFooter>
                        <TablePagination
                            rowsPerPageOptions={[]}
                            count={pageCount}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            onPageChange={changePage}
                            labelDisplayedRows={({ from, to, count }) =>
                                `${from}-${to} ${t('of')} ${count}`
                            }
                            sx={{
                                overflow: 'hidden',
                                backgroundColor: headerBackGroundColor,
                                color: headerFontColor,
                                '& .MuiTablePagination-toolbar': {
                                    minHeight: 18,
                                    height: 18
                                }
                            }}
                        />
                    </TableFooter>
                </Table>
            </TableContainer>
        </Paper>
    )
}

export default BaseTable