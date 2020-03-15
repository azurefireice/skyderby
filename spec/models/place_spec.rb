# == Schema Information
#
# Table name: places
#
#  id         :integer          not null, primary key
#  name       :string(510)
#  latitude   :decimal(15, 10)
#  longitude  :decimal(15, 10)
#  country_id :integer
#  msl        :decimal(5, 1)
#  kind       :integer          default("skydive"), not null
#

describe Place, type: :model do
  let(:country) { countries(:norway) }
  let(:place) { Place.create!(name: 'Gridset', country: country, latitude: 1, longitude: 2) }

  let(:valid_attributes) do
    {
      name: 'Some place, ie Gridset',
      country: country,
      latitude: 10,
      longitude: -10,
      msl: 12
    }
  end

  context 'required fields' do
    it 'requires country' do
      expect(Place.create(valid_attributes.merge(country: nil))).not_to be_valid
    end

    it 'requires name' do
      expect(Place.create(valid_attributes.merge(name: nil))).not_to be_valid
    end

    it 'requires latitude' do
      expect(Place.create(valid_attributes.merge(latitude: nil))).not_to be_valid
    end

    it 'requires longitude' do
      expect(Place.create(valid_attributes.merge(longitude: nil))).not_to be_valid
    end
  end

  context 'performs search by name and country name' do
    it 'performs search by country name' do
      expect(Place.search('no')).to include(place)
    end

    it 'performs search by name' do
      expect(Place.search('ri')).to include(place)
    end
  end

  it 'performs search nearby place to point' do
    track = tracks(:hellesylt)
    place = Place.create! \
      name: 'Lookup',
      country: countries(:norway),
      latitude: 20.001,
      longitude: 30.001

    point = Point.create!(track: track, latitude: 20.0015, longitude: 30.0015)

    expect(Place.nearby(point, 1)).to include(place)
  end
end
