json.name @globe_data.pilot_name
json.points @globe_data.points
json.track_direction @globe_data.avg_heading
json.start_time @globe_data.start_time
json.stop_time @globe_data.stop_time
json.nearby_places @globe_data.nearby_places, :name, :latitude, :longitude
