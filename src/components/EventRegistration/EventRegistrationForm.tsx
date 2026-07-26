import React, { useState } from 'react';
import { registerForEvent } from '../../api/events';

interface EventRegistrationFormProps {
  eventId: string;
  eventName: string;
  onSuccess?: () => void;
}

export const EventRegistrationForm: React.FC<EventRegistrationFormProps> = ({ 
  eventId, 
  eventName,
  onSuccess 
}) => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    institution: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus('idle');
    setErrorMessage('');

    try {
      await registerForEvent(eventId, formData);
      setStatus('success');
      setFormData({
        fullName: '',
        email: '',
        phone: '',
        institution: ''
      });
      if (onSuccess) onSuccess();
    } catch (error: any) {
      setStatus('error');
      setErrorMessage(error?.message || 'Failed to register for event');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="p-6 rounded-lg interactive-card">
      <h2 className="text-xl font-semibold mb-4">
        Register for {eventName}
      </h2>
      
      {status === 'success' && (
        <div className="bg-green-100 dark:bg-green-900 border border-green-200 dark:border-green-800 text-green-800 dark:text-green-100 p-4 mb-6 rounded-lg">
          <h3 className="text-lg font-bold">Registration Successful!</h3>
          <p>Thank you for registering for this event. We look forward to seeing you!</p>
        </div>
      )}
      
      {status === 'error' && (
        <div className="bg-red-100 dark:bg-red-900 border border-red-200 dark:border-red-800 text-red-800 dark:text-red-100 p-4 mb-6 rounded-lg">
          <h3 className="text-lg font-bold">Registration Failed</h3>
          <p>{errorMessage}</p>
        </div>
      )}
      
      <form onSubmit={handleSubmit}>
        <div className="space-y-4">
          <div>
            <label className="block mb-2">Full Name</label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleInputChange}
              required
              className="w-full p-2 border rounded-md bg-transparent"
            />
          </div>
          
          <div>
            <label className="block mb-2">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
              className="w-full p-2 border rounded-md bg-transparent"
            />
          </div>
          
          <div>
            <label className="block mb-2">Phone Number</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              className="w-full p-2 border rounded-md bg-transparent"
            />
          </div>
          
          <div>
            <label className="block mb-2">Institution/School</label>
            <input
              type="text"
              name="institution"
              value={formData.institution}
              onChange={handleInputChange}
              className="w-full p-2 border rounded-md bg-transparent"
            />
          </div>
          
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-2 px-4 bg-accent text-black font-bold rounded-md hover:bg-opacity-80 transition-colors"
          >
            {isSubmitting ? 'Registering...' : 'Register Now'}
          </button>
        </div>
      </form>
    </div>
  );
};