import React from 'react';

function Panination(props) {

    const { currentPage,pageSizes } = props;
    
    return (
        <div className = 'flex'>
            <div className = 'border cursor-pointer h-8 leading-8 mx-1 rounded text-center text-sm text-yellow-700 w-20'>Previous</div>
            <div className = 'flex'>
                {pageSizes.map((item,key) => 
                    {
                        if(currentPage === key + 1){
                        return <div key = {key} 
                            className = 'bg-yellow-600 border cursor-pointer h-8 leading-8 mx-1 rounded text-center text-white w-10'>{item}
                        </div>
                        }
                        return <div key = {key} 
                        className = 'border cursor-pointer h-8 leading-8 mx-1 text-center text-yellow-700 w-10'>{item}
                    </div>
                    }
                )}
            </div>
            <div className = 'border cursor-pointer h-8 leading-8 mx-1 rounded text-center text-sm text-yellow-700 w-20'>Next</div>
        </div>
    );
}

export default Panination;