import { useState, useCallback } from 'react';

interface UseFormOptions<T> {
  initialValues: T;
  onSubmit: (values: T) => Promise<{ success: boolean; message?: string }>;
  onSuccess?: (values: T) => void;
  onError?: (error: unknown) => void;
}

export function useForm<T extends Record<string, unknown>>({
  initialValues,
  onSubmit,
  onSuccess,
  onError
}: UseFormOptions<T>) {
  const [formData, setFormData] = useState<T>(initialValues);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Partial<Record<keyof T, string>>>({});

  const handleChange = useCallback((
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));

    // Clear error for this field when user starts typing
    if (errors[name as keyof T]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name as keyof T];
        return newErrors;
      });
    }
  }, [errors]);

  const handleCheckboxChange = useCallback((name: keyof T, value: string) => {
    setFormData(prev => {
      const currentArray = (prev[name] as string[]) || [];
      return {
        ...prev,
        [name]: currentArray.includes(value)
          ? currentArray.filter(item => item !== value)
          : [...currentArray, value]
      };
    });
  }, []);

  const setValue = useCallback((name: keyof T, value: unknown) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  }, []);

  const resetForm = useCallback(() => {
    setFormData(initialValues);
    setErrors({});
  }, [initialValues]);

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrors({});

    try {
      const result = await onSubmit(formData);
      
      if (result.success) {
        resetForm();
        onSuccess?.(formData);
      } else {
        onError?.(new Error(result.message || 'Submission failed'));
      }
      
      return result;
    } catch (error) {
      onError?.(error);
      return { success: false, message: 'An unexpected error occurred' };
    } finally {
      setIsSubmitting(false);
    }
  }, [formData, onSubmit, onSuccess, onError, resetForm]);

  return {
    formData,
    isSubmitting,
    errors,
    handleChange,
    handleCheckboxChange,
    handleSubmit,
    setValue,
    resetForm,
    setErrors
  };
}

