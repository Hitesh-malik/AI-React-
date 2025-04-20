// src/components/auth/FormInput.tsx
import { ReactNode } from 'react';
import { motion } from 'framer-motion';

interface FormInputProps {
  id: string;
  label: string;
  type: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  placeholder?: string;
  icon?: ReactNode;
  variants?: any;
}

const FormInput: React.FC<FormInputProps> = ({
  id,
  label,
  type,
  value,
  onChange,
  error,
  placeholder,
  icon,
  variants
}) => {
  return (
    <motion.div variants={variants}>
      <label htmlFor={id} className="block text-white text-opacity-90 text-sm font-medium mb-2">
        {label}
      </label>
      <div className="relative">
        {icon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            {icon}
          </div>
        )}
        <input
          id={id}
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={`w-full ${icon ? 'pl-10' : 'pl-3'} pr-4 py-3 bg-black bg-opacity-30 border ${error ? 'border-red-400' : 'border-gray-300 border-opacity-20'} rounded-xl text-white placeholder-gray-300 placeholder-opacity-60 focus:outline-none focus:ring-2 focus:ring-purple-400 transition-all duration-200`}
          placeholder={placeholder}
        />
      </div>
      {error && (
        <p className="mt-1 text-sm text-red-300">{error}</p>
      )}
    </motion.div>
  );
};

export default FormInput;