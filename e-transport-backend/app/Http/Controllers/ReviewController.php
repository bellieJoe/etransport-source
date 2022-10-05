<?php

namespace App\Http\Controllers;

use App\Models\Review;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

class ReviewController extends Controller
{
    //
    public function store(Request $request){
        $request->validate([
            'rate' => ['required', 'integer', Rule::in([1,2,3,4,5])],
            'content' => ['nullable', 'max:1000'],
        ]);

        if(!$request->user_customer_id || !$request->service_id){
            return response([
                'message' => 'Invalid Data'
            ], 400);
        }

        $review = Review::where([
            'user_customer_id' => $request->user_customer_id,
            'service_id' => $request->service_id
        ]);

        if($review->first()){
            $review->update([
                'rate' => $request->rate,
                'content' => $request->content
            ]);
            return;
        }
        
        Review::create([
            'service_id' => $request->service_id,
            'user_customer_id' => $request->user_customer_id,
            'rate' => $request->rate,
            'content' => $request->content
        ]);
    }
}
