import React from 'react';
import { supabase } from '../lib/supabase';
import IconSelector from './IconSelector';
import Modal from './Modal';
import { useForm } from '../hooks/useForm';
import type { Floor } from '../types/floors';

interface CreateFloorModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CreateFloorModal: React.FC<CreateFloorModalProps> = ({ isOpen, onClose }) => {
  const { values, handleChange, handleSubmit, isSubmitting } = useForm({
    initialValues: {
      floor_number: '',
      name: '',
      icon: 'Building2',
      color: 'bg-blue-100 hover:bg-blue-200',
      description: '',
      website_url: '',
      youtube_url: ''
    },
    onSubmit: async (values) => {
      const { error } = await supabase
        .from('floors')
        .insert([{
          ...values,
          floor_number: parseInt(values.floor_number as string)
        }]);

      if (!error) {
        onClose();
      }
    }
  });

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Create New Floor">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Floor Number</label>
          <input
            type="number"
            name="floor_number"
            value={values.floor_number}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Name</label>
          <input
            type="text"
            name="name"
            value={values.name}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Icon</label>
          <IconSelector
            selectedIcon={values.icon}
            onSelect={(icon) => handleChange({ target: { name: 'icon', value: icon } } as any)}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Color</label>
          <select
            name="color"
            value={values.color}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            required
          >
            <option value="bg-blue-100 hover:bg-blue-200">Blue</option>
            <option value="bg-green-100 hover:bg-green-200">Green</option>
            <option value="bg-purple-100 hover:bg-purple-200">Purple</option>
            <option value="bg-yellow-100 hover:bg-yellow-200">Yellow</option>
            <option value="bg-red-100 hover:bg-red-200">Red</option>
            <option value="bg-orange-100 hover:bg-orange-200">Orange</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Description</label>
          <textarea
            name="description"
            value={values.description}
            onChange={handleChange}
            rows={3}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Website URL</label>
          <input
            type="url"
            name="website_url"
            value={values.website_url}
            onChange={handleChange}
            placeholder="https://example.com"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">YouTube Video URL</label>
          <input
            type="url"
            name="youtube_url"
            value={values.youtube_url}
            onChange={handleChange}
            placeholder="https://youtube.com/watch?v=..."
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <div className="flex justify-end gap-3 mt-6">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-md border border-gray-300 hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50"
          >
            {isSubmitting ? 'Creating...' : 'Create Floor'}
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default CreateFloorModal;