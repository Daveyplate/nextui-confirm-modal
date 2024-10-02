# NextUI Confirm Modal

Example usage:
```
import { useState } from "react"
import { ConfirmModal } from "@daveyplate/nextui-confirm-modal"

export default function MyComponent() {
    const [confirm, setConfirm] = useState(null)

    const showModal = () => {
        setConfirm({
            title: "Confirm",
            content: "Are you sure?",
            action: async () => {
                console.log("Confirmed")
            }
        })
    }
    
    return (
        <>
            <button onClick={showModal}>
                Show Modal
            </button>
            <ConfirmModal confirm={confirm} setConfirm={setConfirm} />
        </>
    )
}

```