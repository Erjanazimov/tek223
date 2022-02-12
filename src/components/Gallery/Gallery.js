import React, {useEffect} from "react";
import ImageGallery from 'react-image-gallery';
import {useDispatch, useSelector} from "react-redux";
import {imagesGet} from "../../redux/actions";

function Gallery(){
    const ImagesState = useSelector( state => {
        return state.studentReducer
    })
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(imagesGet())
    }, [])

    return(
        <div id="photo" className="fonst_gal">
            <div className="containerM">
                <h2 className="text-center pt-5 trg">Фото наших учеников
                </h2>
                <h2 className="text-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="56" height="56" fill="currentColor"
                         className="bi bi-dash-lg" viewBox="0 0 16 16">
                        <path fill-rule="evenodd" d="M2 8a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11A.5.5 0 0 1 2 8Z"/>
                    </svg></h2>
                <div className="d-flex justify-content-center pb-5">

                    <ImageGallery items={ImagesState.images} />;
                </div>


            </div>
        </div>
    )
}

export default Gallery;