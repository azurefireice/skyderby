# == Schema Information
#
# Table name: event_organizers
#
#  id         :integer          not null, primary key
#  event_id   :integer
#  profile_id :integer
#  created_at :datetime
#  updated_at :datetime
#

require 'support/event_ongoing_validation'

describe Organizer, type: :model do
  it_should_behave_like 'event_ongoing_validation' do
    let(:target) { FactoryBot.create(:event_organizer) }
  end

  it 'requires event' do
    user = create :user
    expect(Organizer.create(user: user)).not_to be_valid
  end

  it 'requires user' do
    event = create :event
    expect(Organizer.create(organizable: event)).not_to be_valid
  end
end
