

luggage size sm, md, lg, xl
passenger drop off and pick up
isang service lang kada administrator

<!-- services additions -->
terms_and_conditions
marinduque_departure_datetime
manila_departure_datetime

<!-- transport_bookings additions -->
pickup_datetime
pickup_location
dropoff_location
service_type enum('luggage','passenger')
luggage_size nullable enum ['small', 'medium', 'large', 'extra_large']

<!-- new luggage_pricings table -->
luggage_pricing_id
service_id
small
medium
large
extra_large

<!-- db refactors 9/25/2022 -->
add 
passenger_count,
pickup_time,
route('Manila to Marinduque', 'Marinduque to Manila')
selected_starting_location,
to transport_bookings;

create luggage_configs table with:
transport_booking_id: foreign
luggage_size: enum(small, medium, large, extra large)
luggage_count: integer