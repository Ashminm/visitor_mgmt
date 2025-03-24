import React, { useState, useEffect } from 'react';
import jsPDF from 'jspdf';

const generatePDF = (visitor,setIsOpen) => {
    if (!visitor) {
        console.error("Visitor data is missing!");
        return;
    }

    const doc = new jsPDF();
    const today = new Date().toLocaleDateString();

    doc.setFontSize(11);
    doc.text(`Advaithashramam`, 160, 25);

    // Title
    doc.setFontSize(18);
    doc.text("Visitor Details", 80, 15);
    doc.line(10, 20, 200, 20);

    // Date, Address, and ID
    doc.setFontSize(11);
    doc.text(`Date: ${today || "____/____/____"}`, 160, 15);

    // Photo Section
    doc.rect(10, 40, 40, 40);

    // Name and UserId
    doc.setFontSize(13);
    doc.text(`Name: ${visitor.name || "____________________"}`, 60, 45)
    doc.setFontSize(7);
    doc.text(`Date of visit: ${visitor.currentdate || "____/____/____"}`, 60, 53);
    doc.text(`ID: ${visitor.userId || "ID is missing"}`, 60, 60);
   

    // Contact Details
    doc.setFillColor(240, 240, 240);
    doc.rect(10, 85, 60, 10, 'F');
    doc.setFontSize(14); // Set title font size
    doc.text("Contact Details", 15, 92);
    doc.setFontSize(13);
    doc.text(`Aadhaar number: ${visitor.aadhaar || "____________________"}`, 10, 105);
    doc.text(`Phone number: ${visitor.phone || "____________________"}`, 10, 115);
    doc.text(`Other number: ${visitor.othernumber || "____________________"}`, 10, 125);
    doc.text(`Address: ${visitor.address || "____________________"}`, 10, 135);

    // Visit Details
    doc.setFillColor(240, 240, 240);
    doc.rect(10, 145, 60, 10, 'F');
    doc.setFontSize(14);
    doc.text("Visit Details", 15, 152);
    doc.setFontSize(13);
    doc.text(`Gender: ${visitor.gender || "____________________"}`, 10, 165);
    doc.text(`Age: ${visitor.age || "____________________"}`, 10, 175);
    doc.text(`Category: ${visitor.category || "____________________"}`, 10, 185);
    doc.text(`Number of Stay: ${visitor.numberofstay || "____________________"}`, 10, 195);
    doc.text(`Purpose of visit: ${visitor.purposeVisit || "____________________"}`, 10, 205);
    doc.text(`Arrived time: ${visitor.arrivedtime || "____________________"}`, 10, 215);
    doc.text(`Dispatch time: ${visitor.dispatchtime || "____________________"}`, 10, 225);

    // Other Details
    doc.setFillColor(240, 240, 240);
    doc.rect(10, 235, 60, 10, 'F');
    doc.setFontSize(14);
    doc.text("Other Details", 15, 242);
    doc.setFontSize(13);
    doc.text(`Attended by: ${visitor.attender || "____________________"}`, 10, 255);
    doc.text(`Support given: ${visitor.support || "____________________"}`, 10, 265);
    doc.text(`Remarks: ${visitor.remarks || "____________________"}`, 10, 275);

    // Signature
    doc.text("Signature of attender ", 120, 285);

    // Save PDF
    doc.save(`${visitor.name}_details.pdf`);
    setTimeout(() => {
        setIsOpen(false);
      }, 500);
};

function PdfConvert({ visitorsProp }) {
    const [isOpen, setIsOpen] = useState(false);
    const [visitorPdf, setVisitorPdf] = useState(null);
    
    useEffect(() => {
        if (visitorsProp) {
            setVisitorPdf(visitorsProp);
        }
    }, [visitorsProp]);

    return (
        <>
            <div>
                <button
                    className="bg-gray-900 text-white px-4 py-2 rounded"
                    onClick={() => setIsOpen(true)}>
                    Print
                </button>
                {isOpen && (
                    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                        <div className="bg-white p-6 rounded shadow-lg w-full max-w-xl">
                            <h2 className="text-lg font-bold bg-gray-100 p-2 rounded">
                                Download Visitor all Details
                            </h2>
                            <div className="grid grid-cols-1 sm:grid-cols-1 gap-4 my-8">
                            <div className="flex justify-center">
                            <img
                            src=""
                            alt="Profile"
                            className="w-40 h-40 object-cover rounded-full border-2 border-gray-300"
                            />
                            </div>
                                <p className='text-xl'><strong>Name: </strong>{visitorPdf.name}</p>
                                <p className='text-xl'><strong>aadhaar: </strong>{visitorPdf.aadhaar || " aadhaar not provided"}</p>
                                <p className='text-xl mb-6'><strong>Number: </strong>{visitorPdf.phone || " phone not provided"}</p>
                                <button
                                    className="py-2 font-bold tex-black px-4 bg-green-400 hover:bg-green-500 rounded"
                                    onClick={() => generatePDF(visitorPdf,setIsOpen)}
                                    disabled={!visitorPdf}
                                >
                                    Download PDF
                                </button>
                                <button
                                className="mt- bg-red-500 text-black px-4 py-2 rounded"
                                onClick={() => setIsOpen(false)}
                            >
                                Cancel
                            </button>
                            </div>
                           
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}

export default PdfConvert;
