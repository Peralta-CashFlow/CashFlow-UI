import { Modal } from "@mui/material";

interface EditCategoryModalProps {
    open: boolean,
    handleClose: () => void
}

const EditCategoryModal: React.FC<EditCategoryModalProps> = ({
    open, handleClose
}) => {
    return (
        <Modal
            open={open}
            onClose={handleClose}
        >
            <h1>OI</h1>
        </Modal>
    )
}

export default EditCategoryModal;