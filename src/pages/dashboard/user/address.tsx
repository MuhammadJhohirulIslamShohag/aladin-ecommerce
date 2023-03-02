import { useStoreContext } from '@/lib/contexts/StoreContextProvider';
import React from 'react';

const Address = () => {
    const { state } = useStoreContext();
    const { user } = state;
    console.log(user);
    return (
        <div>
            
        </div>
    );
};

export default Address;