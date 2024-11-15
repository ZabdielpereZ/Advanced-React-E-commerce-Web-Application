import axios from "axios";
import { useEffect, useState } from "react";

export const useProductData = () => {
    // state that will hold our Product data from our API call 
    const [productData, setProductData] = useState([]); 
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // make our API call and store data in response variable
                const { data } = await axios.get(`https://fakestoreapi.com/products/${id}`);
                // modify our product data state so it is equal to our response from the Fake store API 
                setProductData(data);
                setIsLoading(false);
            } catch (error) {
                console.error(error.message);
            }
        };
        
        fetchData();
    }, []);

    // when we call useProductData() this is the data that we'll be accessing 
    return { productData, error, isLoading };
}
