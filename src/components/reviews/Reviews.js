import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";

function Reviews(){
    const groupsState = useSelector(state => {
        return state.NewsReducer;
    })

    return(
        <>
        <div className="">
        <div id='testimonials'>
            <div className='container'>
                <div className='section-title text-center'>
                    <h2 className="pb-5">Расписание занятий</h2>
                </div>
                <div className='row pt-3'>
                    {groupsState.groups.map(item => {
                     return <div key={item.id} className='col-md-4'>
                        <div className='testimonial'>
                            <div className='testimonial-image'>
                                <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor"
                                     className="bi bi-arrow-return-right" viewBox="0 0 16 16">
                                    <path fill-rule="evenodd"
                                          d="M1.5 1.5A.5.5 0 0 0 1 2v4.8a2.5 2.5 0 0 0 2.5 2.5h9.793l-3.347 3.346a.5.5 0 0 0 .708.708l4.2-4.2a.5.5 0 0 0 0-.708l-4-4a.5.5 0 0 0-.708.708L13.293 8.3H3.5A1.5 1.5 0 0 1 2 6.8V2a.5.5 0 0 0-.5-.5z"/>
                                </svg>
                            </div>
                            <div className='testimonial-meta'>{item.name} </div>
                            <hr className="hr"/>
                            <div className='testimonial-content'>
                                <p>{item.information}</p>
                            </div>
                        </div>
                    </div>
                    })}

                </div>
            </div>
        </div>
        </div>

            </>
    )
}

export default Reviews;