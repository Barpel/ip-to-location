import React, { useState } from 'react';
import './index.scss';
import AddButton from '../../components/AddButton';
import InputWithError from '../../components/InputWithError';
import { Fab } from '@mui/material';
import { LocationData } from '../../hooks/useFetchLocation';

const Home: React.FC = () => {
    // At the first render we want to show 1 input at least
    const [inputs, setInputs] = useState<number[]>([1]);

    function handleAddButtonClick() {
        // Add a new input identifier to the array
        const lastInput = inputs[inputs.length - 1] || 0;
        setInputs(inputs => [...inputs, lastInput + 1]);
    }

    function handleRemoveButtonClick(inputId: number) {
        if (!inputId || !inputs.length) return;
        setInputs(inputs => inputs.filter(id => id !== inputId));
    }

    function handleBlur(inputId: string, error: string, loading: Boolean, locationData?: LocationData) {
        console.log('handling blur', inputId, locationData, error, loading);
    }

    return (
        <div className="homePage d-flex flex-column align-items-center">
            <h3>Enter IP addresses to get their location</h3>
            <AddButton onClick={handleAddButtonClick}>+ Add</AddButton>
            <hr />
            {inputs.map((inputId) => (
                <div className="inputRow d-flex justify-content-start align-items-center" key={`row-${inputId}`}>
                    <p className="index d-flex justify-content-center align-items-center">{inputId}</p>
                    <InputWithError inputId={`inputId`} onBlur={handleBlur} key={inputId} />
                    <Fab size="small" className="removeButton" color="error" onClick={() => handleRemoveButtonClick(inputId)}>－</Fab>
                </div>
            ))}
        </div>
    );
};

export default Home;
