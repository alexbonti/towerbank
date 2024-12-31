import React from 'react';
import { useForm } from '../../hooks/useForm';
import IconSelector from '../IconSelector';
import type { Floor } from '../../types/floors';

interface FloorFormProps {
  onSubmit: (data: Partial<Floor>) => Promise<void>;
  initialData?: Partial<Floor>;
}

export default function FloorForm({ onSubmit, initialData = {} }: FloorFormProps) {
  const { values, handleChange, handleSubmit, isSubmitting } = useForm({
    initialValues: {
      floor_number: initialData.floor_number?.toString() || '',
      name: initialData.name || '',
      icon: initialData.icon || 'Building2',
      color: initialData.color || 'bg-blue-100 hover:bg-blue-200',
      description: initialData.description || '',
      website_url: initialData.website_url || '',
      youtube_url: initialData.youtube_url || ''
    },
    onSubmit: async (values) => {
      await onSubmit({
        ...values,
        floor_number: parseInt(values.floor_number as string)
      });
    }
  });

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
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

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
      >
        {isSubmitting ? 'Saving...' : (initialData.id ? 'Update Floor' : 'Create Floor')}
      </button>
    </form>
  );
}