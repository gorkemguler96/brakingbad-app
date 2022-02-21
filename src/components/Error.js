import React from 'react';
import {message} from "antd";

function Error({message}) {
    return (
        <div>
            Error: {message}
        </div>
    );
}

export default Error;
