import React, { useState } from 'react';
import { Modal } from 'react-native';

const LocationModal = () => {
    const [isVisible, setIsVisible] = useState(false);

    return (
        <Modal
            visible={isVisible}
            onRequestClose={() => setIsVisible(false)}
            animationType='slide'
        >
            {/* // TODO - add code for the location input logic */}
        </Modal>
    );
}

export default LocationModal;