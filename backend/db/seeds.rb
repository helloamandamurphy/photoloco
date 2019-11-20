DATA = {
  :location_keys => ["name", "lat", "long"],
  :locations => [
    ["Silver Falls", "44.878969", "-122.659256"],
    ["Bobbie the Wonder Dog Mural", "45.004675", "-122.782736"],
    ["Mac's Place", "45.005772", "-122.783675"],
    ["Gallon House Bridge", "45.032058", "-122.798323"],
    ["Don Petit Mural", "45.006074", "-122.783994"]
  ],

  # :location_tag_keys => ["location", "tag"],
  # :location_tags => [
  #   [1,1],
  #   [2,2],
  #   [3,3],
  #   [4,4],
  #   [5,5]
  # ],
  #
  # :tag_keys => ["name"],
  # :tags => [
  #   ["waterfall"],
  #   ["mural"],
  #   ["iconic"],
  #   ["bridge"],
  #   ["mural"]
  # ],

  :photo_keys => ["location_id", "url"],
  :photos => [
    [1, "https://www.oregon.com/sites/default/files/SilverFallsSouthFls.jpg"],
    [2, "https://flic.kr/p/6qccTK"],
    [3, "https://s3-media0.fl.yelpcdn.com/bphoto/oW-TQyD2gcyk3XxomekIlg/o.jpg"],
    [4, "http://www.silvertonmuseum.org/wp-content/uploads/2016/05/GH_HDR01.jpg"],
    [5, "http://96bda424cfcc34d9dd1a-0a7f10f87519dba22d2dbc6233a731e5.r41.cf2.rackcdn.com/silvertonchamber/a-silverton-mural-tour/624.jpg"]
  ]
}

def main
  make_locations
  #make_tags
  #make_location_tags
  make_photos
end

def make_locations
  DATA[:locations].each do |location|
    new_location = Location.new
    location.each_with_index do |attribute, i|
      new_location.send(DATA[:location_keys][i]+"=", attribute)
    end
    new_location.save
  end
end

# def make_location_tags
#   DATA[:location_tags].each do |location_tag|
#     new_location_tag = LocationTag.new
#     location_tag.each_with_index do |attribute, i|
#       new_location_tag.send(DATA[:location_tag_keys][i]+"=", attribute)
#     end
#     new_location_tag.save
#   end
# end

# def make_tags
#   DATA[:tags].each do |tag|
#     new_tag = Tag.new
#     tag.each_with_index do |attribute, i|
#       new_tag.send(DATA[:tag_keys][i] + "=", attribute)
#     end
#     new_tag.save
#   end
# end

def make_photos
  DATA[:photos].each do |photo|
    new_photo = Photo.new
    photo.each_with_index do |attribute, i|
      new_photo.send(DATA[:photo_keys][i] + "=", attribute)
    end
    new_photo.save
  end
end

main

# Location.create([
#   { name: 'Test #1', lat: '111.111111', long: '-111.111111'},
#   { name: 'Test #2', lat: '222.222222', long: '-222.222222'},
#   { name: 'Test #3', lat: '333.333333', long: '-333.333333'},
#   { name: 'Test #4', lat: '444.444444', long: '-444.444444'},
#   { name: 'Test #5', lat: '555.555555', long: '-555.555555'}
#   ])
