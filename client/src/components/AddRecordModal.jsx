import React, { useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { X, Sparkles, Plus, Trash } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

const AddRecordModal = ({ isOpen, onClose, worker, onRecordAdded }) => {
    // Form state for all the new fields
    const [vitals, setVitals] = useState({ bloodPressure: '', heartRate: '', temperature: '' });
    const [symptoms, setSymptoms] = useState('');
    const [clinicalNotes, setClinicalNotes] = useState('');
    const [diagnosis, setDiagnosis] = useState('');
    const [prescription, setPrescription] = useState([{ medicine: '', dosage: '', duration: '' }]);
    const [labTests, setLabTests] = useState('');

    // State for AI functionality
    const [isAiLoading, setIsAiLoading] = useState(false);
    const [aiReport, setAiReport] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    if (!isOpen) return null;

    const handleVitalChange = (e) => setVitals({ ...vitals, [e.target.name]: e.target.value });
    const handlePrescriptionChange = (index, e) => {
        const newPrescription = [...prescription];
        newPrescription[index][e.target.name] = e.target.value;
        setPrescription(newPrescription);
    };
    const addPrescriptionRow = () => setPrescription([...prescription, { medicine: '', dosage: '', duration: '' }]);
    const removePrescriptionRow = (index) => {
        const newPrescription = prescription.filter((_, i) => i !== index);
        setPrescription(newPrescription);
    };

    // --- Gemini AI Report Generation ---
    const handleGenerateReport = async () => {
        setIsAiLoading(true);
        setAiReport('');
        try {
            const res = await axios.post('http://localhost:5001/api/ai/generate-report', {
                workerId: worker._id,
                symptoms,
                vitals,
                clinicalNotes,
            });
            setAiReport(res.data.report);
        } catch (error) {
            toast.error('Failed to generate AI report.');
        } finally {
            setIsAiLoading(false);
        }
    };

    // --- Form Submission ---
    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        const doctorName = localStorage.getItem('doctorName') || 'Unknown Doctor';
        const recordData = {
            workerId: worker.workerId,
            doctorName,
            vitals,
            symptoms,
            clinicalNotes,
            labTestsRecommended: labTests.split(',').map(test => test.trim()),
            diagnosis,
            prescription,
        };

        try {
            await axios.post('http://localhost:5001/api/records/add', recordData);
            toast.success('Medical record added successfully!');
            onRecordAdded(); // This function will be passed from the parent to refresh the data
            onClose(); // Close the modal
        } catch (error) {
            toast.error('Failed to save the record.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black/60 z-50 flex justify-center items-center p-4">
            <div className="bg-white rounded-lg shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col">
                <div className="flex justify-between items-center p-4 border-b">
                    <h2 className="text-xl font-bold text-gray-800">Add New Medical Record for {worker.name}</h2>
                    <button onClick={onClose} className="p-1 rounded-full hover:bg-gray-200"><X size={20} /></button>
                </div>

                <div className="flex-grow overflow-y-auto">
                    <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-2 gap-6 p-6">
                        {/* Left Column: Clinical Data */}
                        <div className="space-y-4">
                            <div>
                                <h3 className="font-semibold text-gray-700 mb-2">Vitals</h3>
                                <div className="grid grid-cols-3 gap-2">
                                    <input name="bloodPressure" onChange={handleVitalChange} placeholder="BP (e.g., 120/80)" className="form-input" />
                                    <input name="heartRate" type="number" onChange={handleVitalChange} placeholder="Heart Rate (bpm)" className="form-input" />
                                    <input name="temperature" type="number" onChange={handleVitalChange} placeholder="Temp (°F)" className="form-input" />
                                </div>
                            </div>
                            <div>
                                <label className="form-label">Symptoms</label>
                                <textarea value={symptoms} onChange={(e) => setSymptoms(e.target.value)} rows="3" placeholder="Describe patient's symptoms..." className="form-input"></textarea>
                            </div>
                            <div>
                                <label className="form-label">Clinical Notes</label>
                                <textarea value={clinicalNotes} onChange={(e) => setClinicalNotes(e.target.value)} rows="3" placeholder="Doctor's observations..." className="form-input"></textarea>
                            </div>
                             <div>
                                <label className="form-label">Diagnosis</label>
                                <input value={diagnosis} onChange={(e) => setDiagnosis(e.target.value)} required placeholder="Final diagnosis" className="form-input" />
                            </div>
                            <div>
                                <label className="form-label">Lab Tests Recommended</label>
                                <input value={labTests} onChange={(e) => setLabTests(e.target.value)} placeholder="e.g., CBC, Malaria Test" className="form-input" />
                            </div>
                            <div>
                                <h3 className="font-semibold text-gray-700 mb-2">Prescription</h3>
                                {prescription.map((p, index) => (
                                    <div key={index} className="flex gap-2 mb-2">
                                        <input name="medicine" value={p.medicine} onChange={(e) => handlePrescriptionChange(index, e)} placeholder="Medicine" className="form-input" />
                                        <input name="dosage" value={p.dosage} onChange={(e) => handlePrescriptionChange(index, e)} placeholder="Dosage" className="form-input w-1/3" />
                                        <input name="duration" value={p.duration} onChange={(e) => handlePrescriptionChange(index, e)} placeholder="Duration" className="form-input w-1/3" />
                                        <button type="button" onClick={() => removePrescriptionRow(index)} className="p-2 text-red-500 hover:bg-red-100 rounded-md"><Trash size={16} /></button>
                                    </div>
                                ))}
                                <button type="button" onClick={addPrescriptionRow} className="text-sm text-indigo-600 hover:underline flex items-center gap-1"><Plus size={14} /> Add Medicine</button>
                            </div>
                        </div>

                        {/* Right Column: AI Assistant */}
                        <div className="bg-gray-50 p-4 rounded-lg flex flex-col">
                            <h3 className="font-semibold text-gray-700 mb-2">AI Diagnostic Assistant</h3>
                            <button type="button" onClick={handleGenerateReport} disabled={isAiLoading} className="w-full flex justify-center items-center gap-2 px-4 py-2 bg-indigo-600 text-white font-semibold rounded-md hover:bg-indigo-700 disabled:bg-indigo-400">
                                <Sparkles size={16} />
                                {isAiLoading ? 'Generating Report...' : 'Generate AI Report'}
                            </button>
                            <p className="text-xs text-gray-500 mt-2 text-center">Uses symptoms, vitals, and patient profile to suggest possibilities.</p>
                            <div className="mt-4 border-t pt-4 flex-grow overflow-y-auto">
                                {aiReport ? (
                                    <article className="prose prose-sm max-w-none">
                                        <ReactMarkdown>{aiReport}</ReactMarkdown>
                                    </article>
                                ) : (
                                    <div className="text-center text-gray-500 pt-8">
                                        AI-generated report will appear here...
                                    </div>
                                )}
                            </div>
                        </div>
                    </form>
                </div>
                 <div className="p-4 border-t flex justify-end">
                    <button type="button" onClick={onClose} className="px-4 py-2 mr-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300">Cancel</button>
                    <button type="submit" onClick={handleSubmit} disabled={isSubmitting} className="px-4 py-2 bg-green-600 text-white font-semibold rounded-md hover:bg-green-700 disabled:bg-green-400">
                        {isSubmitting ? 'Saving...' : 'Save Record'}
                    </button>
                </div>
            </div>
        </div>
    );
};

// Simple CSS for form inputs to avoid repetition. You can add this to your index.css
// .form-input { @apply block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm; }
// .form-label { @apply block text-sm font-medium text-gray-700 mb-1; }

export default AddRecordModal;
