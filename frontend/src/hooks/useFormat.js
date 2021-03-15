import React from 'react';

function useFormat(price) {
        return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export default useFormat;