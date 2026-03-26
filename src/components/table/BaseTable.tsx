import { Table, TableCell, TableContainer, TableRow, TableHead, TableBody, Paper, CircularProgress, Box, TablePagination, TableFooter, IconButton } from "@mui/material"
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import TableHeader from '../../dto/table/TableHeader';
import { useTranslation } from "react-i18next";
import TableEditionField from "../../dto/table/TableEditionField";
import BaseTextField from "../textfield/BaseTextField";

interface BaseTableProps<T> {
    headers: TableHeader[]
    rows: T[]
    rowKey: keyof T
    width: string
    height: string
    overflow: string
    noDataFoundText: string
    loading?: boolean
    headerBackGroundColor?: string
    headerFontColor?: string
    headerFontSize?: string
    rowBackGroundColor?: string
    rowFontColor?: string
    rowFontSize?: string
    borderColor?: string
    changePage?: (event: React.MouseEvent<HTMLButtonElement> | null, page: number) => void
    pageCount?: number,
    rowsPerPage?: number,
    page?: number,
    hasEdition?: boolean,
    editAction?: (row: T) => void,
    pagination?: boolean,
    paperBackground?: string,
    editableFields?: TableEditionField[],
    emptyFontSize?: string,
    canAddRow?: boolean,
    addRowAction?: () => void,
    canDeleteRow?: boolean,
    deleteRowAction?: (index: number) => void
}

const BaseTable = <T extends Record<string, any>>({
    headers, rows, rowKey, width, height,
    overflow, noDataFoundText, loading,
    headerBackGroundColor, headerFontColor,
    headerFontSize, rowBackGroundColor, rowFontColor,
    borderColor, changePage = () => null, pageCount = 0,
    rowsPerPage = 10, page = 0, rowFontSize, hasEdition = false,
    editAction = () => null as any, pagination = true, paperBackground,
    editableFields = [], emptyFontSize = '15px', canAddRow = false,
    addRowAction, canDeleteRow = false, deleteRowAction
}: BaseTableProps<T>) => {

    const { t } = useTranslation();

    const renderCellContent = (header: TableHeader, row: T, rowIndex: number) => {
        if (header.key === 'color') {
            return (
                <div style={{ width: '100%', height: '100%', display: 'flex', justifyContent: 'center' }}>
                    <div style={{ backgroundColor: row[header.key], width: 25, height: 25, borderRadius: 15 }} />
                </div>
            );
        }

        const field = editableFields.find(field => field.fieldName === header.key);

        if (field) {
            let helperText = field.helperText?.(rowIndex);
            return (
                <BaseTextField
                    label=''
                    fieldName={`tags[${rowIndex}].${header.key}`}
                    type="text"
                    value={row[header.key]}
                    onChange={(e) => {
                        if (e.target.value.length <= field.fieldMaxLength) {
                            field.onChange(e, rowIndex)
                        }
                    }}
                    error={helperText !== ''}
                    helperText={helperText}
                    fontSize={rowFontSize}
                    required={true}
                    variant='standard'
                />
            )
        }

        return row[header.key];
    };

    const tableEmpty = () => {
        return (
            <TableRow>
                <TableCell colSpan={headers.length}
                    sx={{
                        backgroundColor: rowBackGroundColor,
                        color: rowFontColor,
                        fontSize: emptyFontSize,
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
            width: width, maxHeight: height,
            overflow: overflow, backgroundColor: paperBackground,
            boxShadow: 'none',
            position: 'relative'
        }}>
            <TableContainer
                sx={{
                    maxHeight: height,
                    overflow: overflow
                }}>
                <Table stickyHeader sx={{
                    border: `1px solid ${borderColor}`
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
                                        textAlign: 'center',
                                        borderRight: '0px solid white',
                                        borderLeft: '0px solid white'
                                    }}
                                >
                                    {header.label}
                                </TableCell>
                            )))}

                            {hasEdition &&
                                !loading &&
                                rows.length > 0 &&
                                <TableCell
                                    sx={{
                                        backgroundColor: headerBackGroundColor,
                                        width: 0
                                    }}
                                />
                            }
                            {canDeleteRow &&
                                !loading &&
                                rows.length > 0 &&
                                <TableCell
                                    sx={{
                                        backgroundColor: headerBackGroundColor,
                                        width: 0
                                    }}
                                />
                            }
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {loading ? (
                            <TableRow>
                                <TableCell
                                    colSpan={headers.length}
                                    sx={{ backgroundColor: rowBackGroundColor }}
                                >
                                    <Box display="flex"
                                        justifyContent="center"
                                        alignItems="center"
                                    >
                                        <CircularProgress sx={{ color: rowFontColor }} />
                                    </Box>
                                </TableCell>
                            </TableRow>
                        ) :
                            rows.length > 0 ? (
                                rows.map((row, rowIndex) => (
                                    <TableRow key={row[rowKey] as React.Key}>
                                        {headers.map((header) => (
                                            <TableCell
                                                key={header.key}
                                                sx={{
                                                    backgroundColor: rowBackGroundColor,
                                                    color: rowFontColor,
                                                    textAlign: 'center',
                                                    fontSize: rowFontSize
                                                }}>
                                                {renderCellContent(header, row, rowIndex)}
                                            </TableCell>
                                        ))}
                                        {hasEdition && (
                                            <TableCell
                                                sx={{
                                                    backgroundColor: rowBackGroundColor
                                                }}
                                            >
                                                <IconButton onClick={() => editAction(row)}>
                                                    <EditIcon fontSize="medium" sx={{ color: rowFontColor }} />
                                                </IconButton>
                                            </TableCell>
                                        )}
                                        {canDeleteRow && (
                                            <TableCell
                                                sx={{
                                                    backgroundColor: rowBackGroundColor
                                                }}
                                            >
                                                <IconButton onClick={() => deleteRowAction?.(rowIndex)}>
                                                    <DeleteOutlineIcon fontSize="medium" sx={{ color: rowFontColor }} />
                                                </IconButton>
                                            </TableCell>
                                        )}
                                    </TableRow>
                                ))
                            ) : (
                                tableEmpty()
                            )
                        }
                    </TableBody>
                    {pagination &&
                        <TableFooter>
                            <TableRow>
                                <TablePagination
                                    rowsPerPageOptions={[]}
                                    count={pageCount}
                                    rowsPerPage={rowsPerPage}
                                    page={page}
                                    onPageChange={(e, newPage) => changePage(e, newPage)}
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
                            </TableRow>
                        </TableFooter>
                    }
                </Table>
            </TableContainer>

            {canAddRow &&
                <div onClick={addRowAction}>
                    <AddIcon
                        fontSize='medium'
                        sx={{
                            position: 'absolute',
                            zIndex: 3,
                            right: 25,
                            top: 15,
                            color: headerFontColor,
                            cursor: 'pointer'
                        }}
                    />
                </div>
            }

        </Paper>
    )
}

export default BaseTable