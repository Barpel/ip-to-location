import React, { useState } from 'react';
import Lottie from 'lottie-react';
import './index.scss';
import AddButton from '../../components/AddButton';
import { LocationData } from '../../hooks/useFetchLocation';
import CoverImage from '../../assets/globe_cover_image.jpg';
import AnimatedLocationIcon from '../../assets/lottie/wired-gradient-18-location-pin.json';
import IPRow from '../../components/IPRow';

interface IIPRow {
    id: number;
    locationData?: LocationData;
}

const Home: React.FC = () => {
    const [ipRows, setIpRows] = useState<IIPRow[]>([{ id: 1 }]);

    function handleAddButtonClick() {
        const lastId = ipRows[ipRows.length - 1]?.id || 0; //we can replace this with a more unique if needed
        setIpRows(rows => [...rows, { id: lastId + 1 }]);
    }

    function handleRemoveButtonClick(id: number) {
        setIpRows(rows => rows.filter(row => row.id !== id));
    }


    function handleBlur(inputId: number, error: string, locationData?: LocationData) {
        if (locationData) {
            const newRow: IIPRow = { id: inputId, locationData };
            setIpRows(currentRows =>
                currentRows.map(row => row.id === inputId ? newRow : row)
            );
        }
    }

    return (
        <div className='homePage d-flex flex-column align-items-center'>
            <img className='coverImage' src={CoverImage} alt='coverImage' />
            <div className='pageCover d-flex justify-content-center align-items-center'>
                <Lottie className='standard-svg' loop={false} animationData={AnimatedLocationIcon} />
                <span>
                    IP Lookup
                </span>
            </div>
            <section className='dataContainer justify-content-center align-items-center'>
                <h3 className='pageTitle'>Enter IP addresses to get their location</h3>
                <div className="ipRowsContainer">
                    {ipRows.map(({ id, locationData }, index) => (
                        <IPRow
                            key={`${id}`}
                            id={id}
                            index={index}
                            handleRemoveButtonClick={handleRemoveButtonClick}
                            handleBlur={handleBlur}
                            locationData={locationData} />
                    ))}
                </div>
                <AddButton onClick={handleAddButtonClick} disabled={!ipRows[ipRows.length - 1].locationData} >+ Add</AddButton>
            </section>
        </div>
    );
};

export default Home;
