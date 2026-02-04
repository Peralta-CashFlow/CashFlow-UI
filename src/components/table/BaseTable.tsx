import styles from './BaseTable.module.css';
import { Table, TableCell, TableContainer, TableRow, TableHead, TableBody, Paper, CircularProgress, Box } from "@mui/material"
import TableHeader from '../../dto/table/TableHeader';

interface BaseTableProps<T> {
    headers: TableHeader[]
    rows: T[]
    rowKey: keyof T
    width: string
    height: string
    overflow: string
    loading?: boolean
    color?: string
}

const BaseTable = <T extends Record<string, any>>({
    headers, rows, rowKey, width, height,
    overflow, loading = false, color = 'white'
}: BaseTableProps<T>) => {

    return (
        <Paper sx={{
            width: width, maxHeight: height, overflow: overflow
        }}>
            <TableContainer className={styles.tableContainer}>
                <Table stickyHeader className={styles.sticky}>
                    <TableHead>
                        <TableRow>
                            {headers.map((header => (
                                <TableCell key={header.key} className={styles.headerCell}>
                                    {header.label}
                                </TableCell>
                            )))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {loading ? (
                            <TableRow>
                                <TableCell colSpan={headers.length} className={styles.bodyCell}>
                                    <Box display="flex"
                                        justifyContent="center"
                                        alignItems="center" 
                                        height="100px"
                                        sx={{ color: color }}
                                    >
                                        <CircularProgress sx={{ color: color }}/>
                                    </Box>
                                </TableCell>
                            </TableRow>
                        ) : (
                            rows.map((row) => (
                                <TableRow key={row[rowKey] as React.Key}>
                                    {headers.map((header) => (
                                        <TableCell key={header.key} className={styles.bodyCell}>
                                            {row[header.key]}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
        </Paper>
    )
}

export default BaseTable