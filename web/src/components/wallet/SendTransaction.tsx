import type { FormEvent } from "react";
import { useWaitForTransactionReceipt, useSendTransaction, BaseError } from "wagmi";
import { type Hex, parseEther } from "viem";

export function SendTransaction() {
    const { data: hash, error, isPending, sendTransaction } = useSendTransaction()

    async function submit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault()
        const formData = new FormData(e.target as HTMLFormElement)
        const to = formData.get('address') as Hex
        const value = formData.get('value') as string
        sendTransaction({ to, value: parseEther(value) })
    }

    const { isLoading: isConfirming, isSuccess: isConfirmed } =
        useWaitForTransactionReceipt({
            hash,
        })

    return (
        <div className="w-full bg-base-100 shadow-xl border border-gray-200 p-6">
            <h2 className="card-title text-2xl font-bold mb-6">Send Transaction</h2>
            <form onSubmit={submit} className="flex flex-col gap-4">
                <input
                    name="address"
                    placeholder="0xA0Cf…251e"
                    required
                    className="input input-bordered w-full focus:border-none focus:outline-none"

                />
                <input
                    name="value"
                    placeholder="0.05 ETH"
                    type="number"
                    step="0.000000001"
                    required
                    className="input input-bordered w-full focus:border-none focus:outline-none"
                />
                <button
                    disabled={isPending}
                    type="submit"
                    className="btn btn-primary w-full mt-2"
                >
                    {isPending ? <span className="loading loading-spinner"></span> : 'Send'}
                </button>
            </form>

            <div className="mt-6 text-sm break-all space-y-2">
                {hash && (
                    <div className="alert alert-info py-2">
                        <span>Has: {hash}</span>
                    </div>
                )}
                {isConfirming && <div className="text-warning">Waiting for confirmation...</div>}
                {isConfirmed && <div className="text-success font-semibold">Transaction confirmed.</div>}
                {error && (
                    <div className="alert alert-error text-sm py-2">
                        <span>Error: {(error as BaseError).shortMessage || error.message}</span>
                    </div>
                )}
            </div>
        </div>
    )
}