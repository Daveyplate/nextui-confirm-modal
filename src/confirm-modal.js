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
 * @param {string} [props.confirm.title] - Modal title.
 * @param {string} [props.confirm.content] - Modal content.
 * @param {string} [props.confirm.color] - Confirm button color.
 * @param {string} [props.confirm.label] - Confirm button label.
 * @param {string} [props.confirm.cancelLabel] - Cancel button label.
 * @param {string} [props.confirm.icon] - Confirm button icon.
 * @param {function} props.confirm.action - Gets called on confirm..
 * @param {function} props.setConfirm - Required to close the modal.
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
                                {confirm?.cancelLabel || "Cancel"}
                            </Button>

                            <Button
                                size="lg"
                                color={confirm?.color}
                                onPress={async () => {
                                    setIsConfirming(true)
                                    if (confirm?.action) await confirm?.action()
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
