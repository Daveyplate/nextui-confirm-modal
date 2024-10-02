import React, { useState } from "react"
import { Button, Spinner } from "@nextui-org/react"

import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
} from '@nextui-org/react'

/**
 * NextUI Confirm Modal.
 * @param {Object} props - React component props.
 * @param {Object} props.confirm - Confirm object.
 * @param {function} props.setConfirm - Set confirm function.
 * @returns {JSX.Element}
 */
export function ConfirmModal({ confirm, setConfirm }) {
    const [isConfirming, setIsConfirming] = useState(false)

    return (
        <Modal
            isOpen={!!confirm && !confirm.isClosed}
            classNames={{ closeButton: "text-xl" }}
            onOpenChange={(isOpen) => setConfirm({ ...confirm, isClosed: !isOpen })}
            placement="center"
        >
            <ModalContent>
                {(onClose) => (
                    <>
                        <ModalHeader className="flex flex-col gap-1">
                            {confirm?.title || "Confirm"}
                        </ModalHeader>

                        <ModalBody>
                            <p>
                                {confirm?.content || "Are you sure?"}
                            </p>
                        </ModalBody>

                        <ModalFooter>
                            <Button size="lg" variant="light" onPress={onClose}>
                                Cancel
                            </Button>

                            <Button
                                size="lg"
                                color={confirm?.color}
                                onPress={async () => {
                                    setIsConfirming(true)
                                    await confirm?.action()
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
