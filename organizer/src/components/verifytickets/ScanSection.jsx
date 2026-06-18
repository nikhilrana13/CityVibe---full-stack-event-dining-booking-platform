import React, { useEffect, useRef, useState } from 'react'
import { Html5Qrcode } from 'html5-qrcode'
import { useVerifyTicketDetailsMutation } from '@/redux/api/EventApi'
import { toast } from 'react-toastify'
import ButtonLoader from '../common/ButtonLoader'
import SucessDialog from './SuccessDialog'

const ScanSection = () => {
    const [ VerifyTicketDetails,{isLoading}] = useVerifyTicketDetailsMutation()
    const [ticketCode, setTicketCode] = useState("")
    const [successData, setSuccessData] = useState(null)
    const [isScanning, setIsScanning] = useState(false)
    const scannerRef = useRef(null)


    const handleVerifyTicket = async (codeFromScan) => {
        const code = codeFromScan || ticketCode
        if (!code) {
            toast.error('Please fill ticket code')
            return
        }
        try {
            const response = await VerifyTicketDetails({ticketCode:code}).unwrap()
            const data = response.data
            if (data?.status === "success") {
            toast.success(data.message)
            setSuccessData(data.data)
            } else {
            toast.error(data?.message || "Invalid Ticket Code")
            }
        } catch (error) {
            console.error("failed to verify tickets", error)
            toast.error(error?.data?.message || "Internal server error")
        } 
    }
    const startScanner = async () => {
        try {
            setIsScanning(true)
            const devices = await Html5Qrcode.getCameras()
            if (devices && devices.length) {
                const backCamera = devices.find(d =>
                    d.label.toLowerCase().includes("back")
                ) || devices[0]
                const scanner = new Html5Qrcode("reader")
                scannerRef.current = scanner

                await scanner.start(
                    backCamera.id,
                    {
                        fps: 10,
                        qrbox: { width: 250, height: 250 }
                    },
                    async (decodedText) => {
                    alert("QR Detected: " + decodedText)
                    console.log("QR Detected:", decodedText)
                        // prevent multiple scans
                        if (!scannerRef.current) return
                        await scanner.stop()
                        await scanner.clear()
                        scannerRef.current = null
                        setIsScanning(false)
                        setTicketCode(decodedText)
                       await handleVerifyTicket(decodedText)
                    }
                )
            }
        } catch (err) {
            console.error(err)
            toast.error("Camera not accessible")
            setIsScanning(false)
        }
    }
    const stopScanner = async () => {
         if (!scannerRef.current) return
          if (scannerRef.current) {
                await scannerRef.current.stop()
                await scannerRef.current.clear()
                scannerRef.current = null
                setIsScanning(false)
            }
       
    }
    useEffect(() => {
        return () => {
            if (scannerRef.current) {
                scannerRef.current.stop().catch(() => { })
                 scannerRef.current.clear().catch(() => {})
            }
        }
    }, [])
    return (
        <>
        <div className="grid lg:grid-cols-2 gap-8 mt-6">
            {/* Scan Card */}
            <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-6 flex flex-col gap-6">
                <div className="flex items-center justify-between">
                    <h2 className="text-lg font-semibold text-gray-900">
                        Scan QR Code
                    </h2>
                    {isScanning && (
                        <span className="text-xs px-3 py-1 rounded-full bg-green-100 text-green-600">
                            Scanning...
                        </span>
                    )}
                </div>
                {/* Camera Preview Box */}
                <div id="reader" className="w-full h-72 rounded-2xl overflow-hidden border-2 border-dashed border-gray-300" />
                {!isScanning ? (
                    <button
                       disabled={isLoading}
                        onClick={startScanner}
                        className="bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-xl font-medium shadow-lg"
                    >
                        Start Scanning
                    </button>
                ) : (
                    <button
                        onClick={stopScanner}
                        className="bg-red-600 hover:bg-red-700 text-white py-3 rounded-xl font-medium shadow-lg"
                    >
                        Stop Scanning
                    </button>
                )}
            </div>
            {/* Manual Entry Card */}
            <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-6 flex flex-col gap-6">
                <h2 className="text-lg font-semibold text-gray-900">
                    Manual Code Entry
                </h2>

                <input
                    type="text"
                    placeholder="Enter Ticket Code"
                    value={ticketCode}
                    onChange={(e) => setTicketCode(e.target.value)}
                    className="border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
                />
                <button disabled={isLoading} onClick={() => handleVerifyTicket()} className="bg-gray-900 hover:bg-black transition text-white py-3 rounded-xl font-medium shadow-md flex items-center justify-center">
                    {isLoading ? <ButtonLoader />  : "Verify Ticket"}
                </button>
                <p className="text-xs text-gray-400">
                    Use manual entry if QR scan fails.
                </p>
            </div>
        </div>
         {successData && (
            <SucessDialog
                data={successData}
                onClose={() => {setSuccessData(null); setTicketCode("")}}
            />
        )}
        </>
    )
}

export default ScanSection