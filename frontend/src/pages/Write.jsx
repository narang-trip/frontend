import {Fragment} from 'react';
import WriteForm from "../components/WriteFrom";

export default function WritePage() {
    return ( 
        <Fragment>
            <h1>동행 모집글 작성하기</h1>
            <WriteForm/>
        </Fragment>
    );
}