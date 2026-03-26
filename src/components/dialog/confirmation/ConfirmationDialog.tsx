import colors from '../../../assets/colors/colors';

import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from "@mui/material";
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import BaseButton from '../../button/BaseButton';

interface ConfirmationModalDialogProps {
    confirmAction: () => void,
    open: boolean,
    setOpen: (open: boolean) => void,
    dialogTitle: string,
    dialogText: string,
    confirmationButtonText: string,
    cancelButtonText: string
}

const ConfirmationDialog: React.FC<ConfirmationModalDialogProps> = ({
    confirmAction, open, setOpen, dialogTitle, dialogText,
    confirmationButtonText, cancelButtonText
}) => {

    return (
        <Dialog
            open={open}
            onClose={() => setOpen(false)}
        >
            <DialogTitle sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 2,
                backgroundColor: 'rgba(224, 147, 31, 0.5)',
                marginBottom: '5%',
                fontWeight: 'bolder'
            }}>
                <WarningAmberIcon color="warning" />
                {dialogTitle}
            </DialogTitle>

            <DialogContent>
                <DialogContentText sx={{
                    color: 'black'
                }}>
                    {dialogText}
                </DialogContentText>
            </DialogContent>

            <DialogActions>
                <BaseButton
                    text={confirmationButtonText}
                    backGroundColor={colors.lightBlueGreen}
                    fontSize='100%'
                    type='button'
                    fontWeight='bolder'
                    onClick={() => {
                        setOpen(false);
                        confirmAction();
                    }}
                />

                <BaseButton
                    text={cancelButtonText}
                    backGroundColor={colors.gray}
                    fontSize='100%'
                    type='button'
                    fontWeight='bolder'
                    onClick={() => setOpen(false)}
                />
            </DialogActions>
        </Dialog>
    )
}

export default ConfirmationDialog;