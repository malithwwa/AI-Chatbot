/* eslint-disable react-hooks/set-state-in-effect */
import axios from 'axios';
import { useEffect, useState } from 'react';
const BASE_URL = import.meta.env.VITE_API_BASE_URL;

type Props = {
   productId: number;
};

type Review = {
   id: number;
   author: string;
   content: string;
   rating: number;
   createdAt: string;
};

type GetReviewsResponse = {
   reviews: Review[];
   summary: string | null;
};

const ReviewList = ({ productId }: Props) => {
   const [reviewData, setReviewData] = useState<GetReviewsResponse>({
      reviews: [],
      summary: null,
   });

   const fetchReviews = async () => {
      try {
         const {data} = await axios.get<GetReviewsResponse>(
            `${BASE_URL}/api/products/${productId}/reviews`
         );
        setReviewData(data);
      } catch (error) {
         console.error('Error fetching reviews:', error);
      }
   };

   useEffect(() => {
      fetchReviews();
   }, [productId]);

   return (
      <div className='flex flex-col gap-5'>
         {reviewData?.reviews.map((review) => (
            <div key={review.id}>
               <div className="font-semibold">{review.author}</div>
               <div>Rating: {review.rating}/5</div>
               <p className='py-2'>{review.content}</p>
            </div>
         ))}
      </div>
   );
};

export default ReviewList;
