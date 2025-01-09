'use client';

import { useState } from 'react';
import { gql, useMutation } from '@apollo/client';
import { useRouter } from 'next/navigation';
import { CREATE_CONTACTUS } from '@/graphql/mutation';

function Index() {
  const [fullName, setFullName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [subject, setSubject] = useState('');
  const [body, setBody] = useState('');
    const router = useRouter();

  const [createContactus, { data, loading, error }] = useMutation(CREATE_CONTACTUS);

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();

    try {
      const { data } = await createContactus({
        variables: {
          input: {
            full_name: fullName,
            phone_number: phoneNumber,
            subject: subject,
            body: body,
          },
        },
      });

      if (data.createContactus.error) {
        // Handle errors (e.g. display messages)
        console.error(data.createContactus.error);
      } else {
        // Handle success (e.g. display success message)
        console.log('Contact created:', data.createContactus.item);
      }
    } catch (err) {
      console.error('Error submitting form:', err);
    }
  };

  return (
    <div className="max-w-7xl mx-auto py-4 px-2">
      <div className="mb-4">
        <button
          className="bg-primary text-primary-foreground shadow hover:bg-primary/90 p-3 rounded-full"
          onClick={() => router.back()}
        >
          Go Back
        </button>
      </div>
    
    <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-lg">
      <h1 className="text-3xl font-semibold text-center text-gray-800 mb-6">Contact Us</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="fullName" className="block text-lg font-medium text-gray-700">Full Name</label>
          <input
            type="text"
            id="fullName"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="w-full p-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Enter your full name"
            required
          />
        </div>
        
        <div>
          <label htmlFor="phoneNumber" className="block text-lg font-medium text-gray-700">Phone Number</label>
          <input
            type="tel"
            id="phoneNumber"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            className="w-full p-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Enter your phone number"
            required
          />
        </div>
        
        <div>
          <label htmlFor="subject" className="block text-lg font-medium text-gray-700">Subject</label>
          <input
            type="text"
            id="subject"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            className="w-full p-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Enter subject"
            required
          />
        </div>

        <div>
          <label htmlFor="body" className="block text-lg font-medium text-gray-700">Message</label>
          <textarea
            id="body"
            value={body}
            onChange={(e) => setBody(e.target.value)}
            className="w-full p-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Your message..."
            // rows="6"
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-indigo-600 text-white p-3 rounded-md hover:bg-indigo-700 disabled:opacity-50"
        >
          {loading ? 'Submitting...' : 'Submit'}
        </button>
        
        {error && <p className="text-red-500 text-center mt-4">{error.message}</p>}
        {data && !data.createContactus.error && (
          <p className="text-green-500 text-center mt-4">Contact created successfully!</p>
        )}
      </form>
    </div>
    </div>
  );
}

export default Index;
