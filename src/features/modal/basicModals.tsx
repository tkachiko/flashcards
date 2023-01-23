import * as React from 'react'
import { FC, PropsWithChildren } from 'react'

import Box from '@mui/material/Box'
import Modal from '@mui/material/Modal'

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
}

type PropsType = {
  isOpen: boolean
  handleClose: () => void
}
export const BasicModals: FC<PropsType & PropsWithChildren> = ({
  isOpen,
  children,
  handleClose,
}) => {
  return (
    <div>
      <Modal
        open={isOpen}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>{children}</Box>
      </Modal>
    </div>
  )
}
