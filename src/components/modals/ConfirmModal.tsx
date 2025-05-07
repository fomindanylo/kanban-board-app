interface ConfirmModalProps {
    title: string
    message: string
    onConfirm: () => void
    onCancel: () => void
}

const ConfirmModal = ({ title, message, onConfirm, onCancel }: ConfirmModalProps) => (
    <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center">
        <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-md">
            <h2 className="text-lg font-semibold mb-4">{title}</h2>
            <p className="text-gray-700 mb-6">{message}</p>
            <div className="flex justify-end gap-3">
                <button
                    onClick={onCancel}
                    className="px-4 py-2 text-sm border border-gray-300 rounded hover:bg-gray-100"
                >
                    Cancel
                </button>
                <button
                    onClick={onConfirm}
                    className="px-4 py-2 text-sm bg-red-600 text-white rounded hover:bg-red-700"
                >
                    Ok
                </button>
            </div>
        </div>
    </div>
)

export default ConfirmModal