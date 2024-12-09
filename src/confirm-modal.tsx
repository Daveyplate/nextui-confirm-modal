import { ReactNode, useState } from "react"
import { Button, ModalProps, Spinner } from "@nextui-org/react"
import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
} from "@nextui-org/react"

interface ConfirmProps {
    title?: string
    content?: string
    color?: "default" | "primary" | "secondary" | "success" | "warning" | "danger" | undefined
    label?: string
    cancelLabel?: string
    icon?: ReactNode
    action?: () => Promise<void>
    isClosed?: boolean
}

interface ConfirmModalProps {
    confirm: ConfirmProps
    setConfirm: (confirm: ConfirmProps) => void
}

export function ConfirmModal({ confirm, setConfirm, ...props }: ConfirmModalProps & ModalProps) {
    const [isConfirming, setIsConfirming] = useState(false)

    return (
        <Modal
            isOpen={!!confirm && !confirm.isClosed}
            onOpenChange={(isOpen) => setConfirm({ ...confirm, isClosed: !isOpen })}
            placement="center"
            {...props}
        >
            <ModalContent>
                {(onClose) => (
                    <>
                        <ModalHeader>
                            {confirm?.title || "Confirm"}
                        </ModalHeader>

                        <ModalBody>
                            <p>
                                {confirm?.content || "Are you sure?"}
                            </p>
                        </ModalBody>

                        <ModalFooter>
                            <Button variant="light" onPress={onClose}>
                                {confirm?.cancelLabel || "Cancel"}
                            </Button>

                            <Button
                                color={confirm?.color}
                                onPress={async () => {
                                    setIsConfirming(true)
                                    if (confirm?.action) await confirm.action()
                                    onClose()
                                    setIsConfirming(false)
                                }}
                                startContent={!isConfirming && confirm?.icon}
                                isLoading={isConfirming}
                                isDisabled={isConfirming}
                                spinner={<Spinner color="current" size="sm" />}
                            >
                                {confirm?.label || "OK"}
                            </Button>
                        </ModalFooter>
                    </>
                )}
            </ModalContent>
        </Modal>
    )
}