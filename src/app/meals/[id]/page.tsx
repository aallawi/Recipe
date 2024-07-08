"use client";

import { useParams } from 'next/navigation';
import { FC } from 'react';

const SingleMeal: FC = () => {
    const params = useParams();
    const { id } = params;

    return (
        <div>one - {id} </div>
    );
}

export default SingleMeal;
