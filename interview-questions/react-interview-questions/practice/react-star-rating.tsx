// Star Rating Component
// Questions
// - TS OK, newer OK
// - React
// - Browser support, just Chrome
// Requirements
// Core Functionality
// - Get the rating from server
// - Give a rating, update server
// Stretch
// - Allow to remove it
// - Allow to modify it
// - Half a star
// States
// - Loading
// - Empty
// - Regular (one rating)
// - Error state, no connection, error when fetching/updating

// Server API
// REST:
// resource is 'rating' - URL: https://www.ourDomain.com/api/v1/ratings
// verbs GET for fetching; POST for sending a new rating; DELETE to remove a rating
// API Endpoints
// GET /api/v1/products/{id}/ratings
// request: body: {}
// success: 200, body: {value: 4}
// response: 404, product not found
// POST /api/v1/products/{id}/ratings
// request: body: {value: 3}
// success: 201, {value: 3}
// response: 400 (bad request), 401 (unauthorized) , 403 (rights), 404 (product not found)
// DELETE /api/v1/products/{id}/ratings/{id}
// request: body: {}
// success: 204 (no content)
// failure: 400 (bad request), 401 (unauthorized) , 403 (rights), 404 (product not found)
// PUT /api/v1/products/{id}/ratings/{id}
// request: body: {value: 3}
// success: 204 (no content)
// response: 400 (bad request), 401 (unauthorized) , 403 (rights), 404 (product not found)

// We have many options
// - Nesting all resources: /users/{userId}/products/{productId}/rating
// 	- Pros: explicit and logical
// 	- Cons: long URLs and overkill
// - Nesting some resources: /products/{productId}/ratings?userId={userId}
// 	- Pros: clear hierarchy, filtering by userId, concise URLs, RESTful

// Components
// StarRating
// - List Stars
//  - RatingHalfStars
// - Controls
//  - Remove button

// State variables
// - Star rating --- rating
//  - isStarActive
// - Rating set
// - Loading -- isLoading

// Approach
// Custom Hook managing all about the rating
// const {isLoading, rating, error, addRating, removeRating, updateRating} = useRatings(productId: string, userId: string);

// Testing
// Unit for everything
// MSW for custom hook
// ONe e2e test testing all of it too
// Visual regression testing for the star list, promote to design system

// Improvements
// Create API. object with calls, get types from server
// Cancellable requests
// More complete error handling

import { useState, useEffect } from "react";
import "./starRating.styles.scss";

const RATING_RESOURCE_URL = "/api/v1/products/ratings";
const getRatingResourceURL = (productId: string) => {
    return `/api/v1/products/${productId}/ratings`;
};
const COMMON_PARAMS = {
    headers: {
        "Content-Type": "application/json",
    },
};

const useRatings = (userId: string, productId: string) => {
    const [isLoading, setIsLoading] = useState(true);
    const [rating, setRating] = useState<number | null>(null);
    const [error, setError] = useState<Error | null>(null);

    // Add updateRating, removeRating calls

    useEffect(() => {
        const fetchRating = async () => {
            console.log("call API to get rating", userId, productId);
            const url = `${getRatingResourceURL(
                productId
            )}?${new URLSearchParams({
                userId,
            }).toString()}`;

            const response = await fetch(url, {
                ...COMMON_PARAMS,
                method: "GET",
            });
            if (response.ok) {
                setIsLoading(false);
                const json = await response.json();
                setRating(json.value);
            } else {
                throw new Error("Response not OK");
            }
        };

        fetchRating().catch((error) => {
            console.error(error);
            setError(error);
        });
    }, [userId, productId]);

    const addRating = (newRating: number) => {
        setRating(newRating);
    };
    const updateRating = (newRating: number) => {
        setRating(newRating);
    };
    const removeRating = () => {
        setRating(null);
    };

    return { isLoading, rating, addRating, removeRating, updateRating, error };
};

type StarRatingProps = {
    userId: string;
    productId: string;
};

const DEFAULT_STAR_STATE = [
    { id: "1", active: false },
    { id: "2", active: false },
    { id: "3", active: false },
    { id: "4", active: false },
    { id: "5", active: false },
];

type StartListProps = {
    rating: number | null;
    onRatingChange: (id: number) => void;
};
const StarList = ({ rating, onRatingChange }: StartListProps) => {
    const [stars, setStars] = useState(DEFAULT_STAR_STATE);

    useEffect(() => {
        setStars(
            DEFAULT_STAR_STATE.map((star, index) => {
                if (index + 1 <= (rating ?? 0)) {
                    return { ...star, active: true };
                }
                return star;
            })
        );
    }, [rating]);

    const handleStarClick = (id: string) => {
        onRatingChange(parseInt(id, 10));
    };

    return (
        <ul className="star-list">
            {stars.map(({ id, active }) => {
                return (
                    <li key={id}>
                        <button
                            className="star"
                            type="button"
                            onClick={() => handleStarClick(id)}
                        >
                            {active ? "★" : "☆"}
                        </button>
                    </li>
                );
            })}
        </ul>
    );
};

export const StarRating = ({ userId, productId }: StarRatingProps) => {
    const { isLoading, rating, addRating, removeRating, error } = useRatings(
        userId,
        productId
    );

    const handleRatingChange = (newRating: number) => {
        console.log("clicked", newRating);
        addRating(newRating);
    };
    const handleRemoveRating = () => {
        removeRating();
    };

    if (error) {
        return (
            <div className="star-rating-container">
                There was an error: {error?.message}
            </div>
        );
    }

    if (isLoading) {
        return <div className="star-rating-container">Loading rating....</div>;
    }

    return (
        <div className="star-rating-container">
            <StarList rating={rating} onRatingChange={handleRatingChange} />
            {rating && (
                <button
                    type="button"
                    className="remove-rating-btn"
                    onClick={handleRemoveRating}
                >
                    Remove Rating
                </button>
            )}
        </div>
    );
};
