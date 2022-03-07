import React from 'react';
import ReactLoading from "react-loading";
const Loading = () => {
    return (
        <div className={'d-flex justify-content-center align-items-center mt-5'}>
            <article>
                <ReactLoading type={'spin'} color="black" />
                <p className={'mt-2 fw-bold'}>Loading ...</p>
            </article>

        </div>
    );
};

export default Loading;