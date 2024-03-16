import React from 'react';
import { Card, Fab } from '@mui/material';
import './index.scss';
import LocaleTime from '../LocaleTime';
import { LocationData } from '../../hooks/useFetchLocation';
import IPGeoLocationInput from '../IPGeoLocationInput';


export interface IPRowProps {
    id: number;
    index: number;
    handleRemoveButtonClick: (id: number) => void;
    handleBlur: (inputId: number, error: string, locationData?: LocationData) => void;
    locationData?: LocationData;
}


const IPRow: React.FC<IPRowProps> = ({ id, handleRemoveButtonClick, handleBlur, locationData, index }) => {

    return (
        <Card className='ipRow justify-content-start align-items-center' key={`${id}`}>
            <p className="index d-flex justify-content-start align-items-start">{index + 1}</p>
            <Fab size="small" className="removeButton" onClick={() => handleRemoveButtonClick(id)}>－</Fab>
            <IPGeoLocationInput inputId={id} onBlur={handleBlur} />
            {locationData && <div className='locationData align-items-center justify-content-center'>
                <div className='countryContainer d-flex align-items-center'>
                    <span className={`d-flex justify-content-center align-items-center fi fi-${locationData.countryCode.toLocaleLowerCase()}`}></span>
                    <span className='country'>{locationData.country}</span>
                </div>
                <div className='timeContainer'>
                    <span className='localTimeLabel'>Time:</span>
                    <LocaleTime timezone={locationData.timezone} />
                </div>
            </div>}
        </Card>
    );
};

export default IPRow;
