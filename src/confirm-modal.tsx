import { ReactNode, useState } from "react"
import { Button, ModalProps, Spinner } from "@nextui-org/react"
import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
} from "@nextui-org/react"

export interface Confirm {
    title?: string | null
    content?: string | null
    color?: "default" | "primary" | "secondary" | "success" | "warning" | "danger"
    label?: string | null
    cancelLabel?: string | null
    icon?: ReactNode | null
    action?: () => Promise<void> | null
    isClosed?: boolean | null
}

interface ConfirmModalProps extends Omit<ModalProps, "children"> {
    confirm?: Confirm | null
    setConfirm: (confirm: Confirm | null) => void
}

export function ConfirmModal(
    { confirm, setConfirm, ...props }: ConfirmModalProps) {
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