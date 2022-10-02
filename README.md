

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

<!-- db refactors 9/28/2022 -->
update luggage_configs table with:
transport_booking_id: foreign
small: integer
medium: integer
large: integer
extra_large: integer

<!-- db refactors 10/2/2022  -->
create booking_updates table
booking_update_id pk
transport_booking_id fk
booking_status varchar
message varchar
timestamps
<!-- do not implement yet -->
create booking_messages table
booking_message_id
transport_booking_id
sender_role_id: enum(2:Administrator, 1:Customer)
message: varchar
timestamps

