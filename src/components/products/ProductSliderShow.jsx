import { useRef, useState } from 'react';

import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css'

import styles from './ProductSlideshow.module.css'

const ProductSliderShow = ({ slideImages, product }) => {

    const slideRef = useRef();
    const [previousIndex, setPreviousIndex] = useState(null);
    const [nextIndex, setNextIndex] = useState(null);

    const handleChangeImage = (index) => {
        slideRef.current.goTo(parseInt(index, 10));
    }

    const properties = {
        autoplay: false,
        indicators: true,
        onChange: (previous, next) => {
            setPreviousIndex(previous);
            setNextIndex(next);
        }
    };

    return (
        <>
            <Slide {...properties} ref={slideRef}>
                {slideImages.map((slideImage, index) => (
                    <div className={styles["each-slide"]} key={index}>
                        <div style={{
                            'backgroundImage': `url(${slideImage.path})`,
                            'backgroundSize': 'cover'
                        }}></div>
                    </div>
                ))}
            </Slide>
            <div className="flex mt-2">
                {
                    product?.multimedia.map((multimedia, index) => (
                        <div key={index}
                            className="overflow-hidden border-2 border-gray-300 w-24 h-24 mr-2 cursor-pointer"
                        >
                            <img
                                src={multimedia?.path}
                                alt={product.name}
                                onClick={e => handleChangeImage(index)}
                                className="w-full h-full object-fill"
                                width={200}
                                height={200}
                            />
                        </div>
                    ))
                }
            </div>
        </>
    )
}

export default ProductSliderShow