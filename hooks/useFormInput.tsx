import { useState } from 'react';

export function useFormInput() {
    const [formData, setFormData] = useState<Record<string, any>>({});

    const handleInputChange = (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = event.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const resetForm = () => setFormData({}); // Optional: Reset the form data

    return { formData, handleInputChange, resetForm };
}
